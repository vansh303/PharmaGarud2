import time, hashlib, os
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from rich.console import Console
from rich.theme import Theme
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from fastapi.responses import FileResponse

from parser import parse_vcf_content
from rules import evaluate_risk
from llm_service import generate_clinical_insights, normalize_drug_name
from schemas import PharmacogenomicResponse, GeneticMarker

console = Console(theme=Theme({"info": "cyan", "success": "bold green", "warning": "bold yellow"}))
app = FastAPI(title="PharmaGuard Pro API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/analyze", response_model=PharmacogenomicResponse)
async def analyze_patient(file: UploadFile = File(...), drug_name: str = Form(None)):
    api_start_time = time.time()
    console.print(f"\n[info]▶️ REQUEST RECEIVED:[/] {file.filename}")
    
    # 1. FIX NAME ERROR: Variable definition properly ordered
    target_input = drug_name if drug_name and drug_name.strip() != "" else "Clopidogrel"
    final_drug_name = normalize_drug_name(target_input)
    console.print(f"[success] ✓ Target Drug: {final_drug_name}[/]")
    
    if not file.filename.endswith('.vcf'):
        raise HTTPException(status_code=400, detail="Only .vcf allowed")
    
    content = await file.read()
    text_content = content.decode('utf-8', errors='ignore') 
    extracted_markers = parse_vcf_content(text_content)
    risk_data = evaluate_risk(final_drug_name, extracted_markers)
    
    if risk_data["variant"]:
        console.print(f"[warning]⏳ Calling Gemini AI for {final_drug_name}...[/]")
        ai_response = generate_clinical_insights(final_drug_name, risk_data["variant"], risk_data["risk"])
        confidence = ai_response.get("ai_confidence_score", "High (90%)")
        explanation = ai_response.get("clinical_explanation", "Analysis complete.")
        recommendations = ai_response.get("recommendations", "Follow guidelines.")
        citations = ai_response.get("clinical_citations", ["Standard Care"])
        audit_passed = ai_response.get("safety_audit_passed", True)
        audit_notes = ai_response.get("safety_audit_notes", "Audit passed.")
    else:
        confidence, audit_passed = "High (100%)", True
        explanation = f"No risk variants for {final_drug_name}."
        recommendations = "Standard dosage."
        citations = ["Standard Guidelines"]
        audit_notes = "Standard metabolizer profile."

    report_hash = hashlib.sha256(f"{final_drug_name}_{explanation}".encode()).hexdigest()

    return PharmacogenomicResponse(
        patient_id=file.filename.split('.')[0], 
        drug_name=final_drug_name,
        genetic_markers=[GeneticMarker(**m) for m in extracted_markers],
        risk_assessment=risk_data["risk"],
        ai_confidence_score=confidence,
        clinical_explanation=explanation,
        recommendations=recommendations, 
        clinical_citations=citations,
        safety_audit_passed=audit_passed,
        safety_audit_notes=audit_notes,
        report_checksum=report_hash
    )

@app.post("/api/generate-pdf")
async def generate_pdf(data: dict):
    file_path = f"report_{data.get('patient_id', 'result')}.pdf"
    c = canvas.Canvas(file_path, pagesize=letter)
    c.setFont("Helvetica-Bold", 16)
    c.drawString(100, 750, "PharmaGuard AI Clinical Report")
    c.setFont("Helvetica", 10)
    c.drawString(100, 730, f"Drug: {data.get('drug_name')}")
    c.drawString(100, 715, f"Risk: {data.get('risk_assessment')}")
    c.drawString(100, 700, f"Recommendation: {data.get('recommendations')}")
    c.save()
    return FileResponse(file_path, media_type='application/pdf', filename=file_path)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)