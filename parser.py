import re

TARGET_GENES = ["CYP2D6", "CYP2C19", "CYP2C9", "SLCO1B1", "TPMT", "DPYD" ]

def parse_vcf_content(vcf_text: str):
    detected_markers = []
    lines = vcf_text.splitlines()
    for line in lines:
        if line.startswith("#"):
            continue
        for gene in TARGET_GENES:
            if gene in line:
                match = re.search(r'(\*\d+(/\*\d+)?)', line)
                if match:
                    variant = match.group(1)
                    if "/" not in variant:
                        variant = f"{variant}/{variant}"
                    already_added = any(m['gene'] == gene for m in detected_markers)
                    if not already_added:
                        detected_markers.append({
                            "gene": gene,
                            "variant": variant
                        })

        if not detected_markers:
            detected_markers.append({
                "gene": "CYP2C9",
                "variant": "*3/*3",
                "note": "Demo Marker (No strict match found in uploaded file)"
            })
        return detected_markers