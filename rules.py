# rules.py - Enterprise Clinical Knowledge Base (Based on CPIC Guidelines)

KNOWLEDGE_BASE = {
    "Warfarin": { # Blood Thinner
        "CYP2C9": {
            "*1/*1": {"risk": "Safe", "phenotype": "Normal Metabolizer"},
            "*1/*2": {"risk": "Adjust Dosage", "phenotype": "Intermediate Metabolizer"},
            "*3/*3": {"risk": "Toxic", "phenotype": "Poor Metabolizer (High Bleeding Risk)"}
        }
    },
    "Clopidogrel": { # Heart Attack Prevention
        "CYP2C19": {
            "*1/*1": {"risk": "Safe", "phenotype": "Normal Metabolizer"},
            "*2/*2": {"risk": "Toxic", "phenotype": "Poor Metabolizer (Cardiovascular Risk)"},
            "*17/*17": {"risk": "Safe", "phenotype": "Ultra-Rapid Metabolizer"}
        }
    },
    "Simvastatin": { # Cholesterol
        "SLCO1B1": {
            "*1/*1": {"risk": "Safe", "phenotype": "Normal Function"},
            "*1/*5": {"risk": "Adjust Dosage", "phenotype": "Decreased Function"},
            "*5/*5": {"risk": "Toxic", "phenotype": "Poor Function (High Myopathy/Muscle Toxicity Risk)"}
        }
    },
    "Codeine": { # Painkiller
        "CYP2D6": {
            "*1/*1": {"risk": "Safe", "phenotype": "Normal Metabolizer"},
            "*4/*4": {"risk": "Toxic", "phenotype": "Poor Metabolizer (No Pain Relief)"},
            "*2xN": {"risk": "Toxic", "phenotype": "Ultra-Rapid Metabolizer (Overdose Risk)"} # Too much morphine
        }
    }
}

def evaluate_risk(drug_name: str, markers: list):
    final_risk = "Safe"
    phenotype = "Unknown Metabolizer"
    matched_gene = None
    matched_variant = None

    if drug_name in KNOWLEDGE_BASE:
        drug_rules = KNOWLEDGE_BASE[drug_name]
        
        for marker in markers:
            gene = marker.get("gene")
            variant = marker.get("variant")
            
            if gene in drug_rules and variant in drug_rules[gene]:
                final_risk = drug_rules[gene][variant]["risk"]
                phenotype = drug_rules[gene][variant]["phenotype"]
                matched_gene = gene
                matched_variant = variant
                break 

    return {
        "risk": final_risk,
        "phenotype": phenotype,
        "gene": matched_gene,
        "variant": matched_variant
    }