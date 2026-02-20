from pydantic import BaseModel, Field
from typing import List

class GeneticMarker(BaseModel):
    gene: str = Field(..., description="Name of the gene", example="CYP2C9")
    variant: str = Field(..., description="Specific genetic variant", example="*3/*3")

class PharmacogenomicResponse(BaseModel):
    patient_id: str = Field(...)
    drug_name: str = Field(...)
    genetic_markers: List[GeneticMarker] = Field(...)
    risk_assessment: str = Field(...)
    
    # --- BASIC AI INSIGHTS ---
    clinical_explanation: str = Field(...)
    recommendations: str = Field(...)
    clinical_citations: List[str] = Field(...)
    
    # --- 🚀 THE WOW FACTOR: ENTERPRISE SAFETY METRICS ---
    safety_audit_passed: bool = Field(..., description="Did the second AI agent verify this for medical accuracy?")
    safety_audit_notes: str = Field(..., description="Notes from the Chief Medical Auditing Agent")
    report_checksum: str = Field(..., description="SHA-256 cryptographic hash to prevent tampering")