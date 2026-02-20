Advanced AI-Driven Pharmacogenomic Risk Prediction System
PharmaGuard Pro ek cutting-edge clinical decision support tool hai jo patient ke genomic data (.VCF files) ko analyze karke ye predict karta hai ki koi specific dawai (drug) uske liye safe hai ya nahi. Ye system manual genetic analysis aur medical errors ko khatam karne ke liye banaya gaya hai.

🚀 Key Features
🔍 Automated VCF Parsing: GRCh38 genomic files se critical PGx markers (CYP2C19, CYP2D6, DPYD, etc.) ko instantly extract karta hai.

🤖 Triple-Agent AI Pipeline: * Normalizer: Drug typos aur brand names ko generic scientific names mein convert karta hai.

Clinical Doctor: Gemini 2.0 Flash ka use karke deep medical insights generate karta hai.

Safety Auditor: AI ke results ko double-check karta hai taaki accuracy 100% rahe.

🛡️ Blockchain-Ready Integrity: Har report ka ek unique SHA-256 checksum generate hota hai taaki data tampering na ho sake.

📄 Instant PDF Reports: Doctors ke liye ready-to-print professional medical reports.

⚡ Real-time Terminal UI: Matrix-style decoding animation ke saath asali hacker vibe.

🛠️ Tech Stack
Frontend:

Next.js 14 (App Router)

Tailwind CSS (Neon Aesthetics)

Framer Motion (Animations)

Lucide React (Icons)

Backend:

FastAPI (Python)

Google Gemini Pro API (LLM Agents)

ReportLab (PDF Engine)

Pydantic (Data Validation)

🏃‍♂️ Getting Started
1. Backend Setup
Bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
# Create a .env file and add: GEMINI_API_KEY=your_key_here
python main.py
2. Frontend Setup
Bash
cd frontend
npm install
npm run dev
📊 How It Works (The Pipeline)
Input: User ek .vcf file upload karta hai aur (optional) drug name dalta hai.

Extraction: Backend file scan karke variant alleles (jaise *2, *17) nikalta hai.

Cross-Reference: Rules engine humare curated database se risk levels match karta hai.

AI Insight: Gemini AI clinical explanation aur alternate recommendations deta hai.

Output: UI par interactive summary dikhti hai aur PDF download ka option milta hai.

🛡️ Safety & Security
PharmaGuard Pro medical guidelines (CPIC/DPWG) ko dhyan mein rakh kar banaya gaya hai. Humara Dual-Agent Audit system ensure karta hai ki koi bhi galat recommendation generate na ho.

👨‍💻 Contributors
Vansh - Lead Developer (CSE, BBDU)

Project created for [RIFT Hackathon]
