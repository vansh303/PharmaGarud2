"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const mockReport = {
    patient_id: "PG-8829-X",
    date: new Date().toLocaleDateString(),
    genotypes: [
        { gene: "CYP2C19", genotype: "*1/*17", phenotype: "Rapid Metabolizer", status: "actionable" },
        { gene: "CYP2D6", genotype: "*4/*4", phenotype: "Poor Metabolizer", status: "critical" },
        { gene: "DPYD", genotype: "*1/*1", phenotype: "Normal Metabolizer", status: "normal" },
        { gene: "SLCO1B1", genotype: "*5/*5", phenotype: "Low Function", status: "warning" },
    ],
    recommendations_list: [
        {
            drug: "Clopidogrel",
            gene: "CYP2C19",
            recommendation: "Standard dosing is recommended. Patient is a rapid metabolizer but still shows adequate active metabolite formation.",
            level: "A",
            source: "CPIC"
        },
        {
            drug: "Codeine",
            gene: "CYP2D6",
            recommendation: "AVOID USE. Genetic variation leads to lack of efficacy. Choose alternative analgesic such as morphine or non-opioid.",
            level: "A",
            source: "CPIC"
        }
    ]
};

export default function ReportsPage() {
    // --- 1. LOCALSTORAGE LOGIC ADDED HERE ---
    const [report, setReport] = useState<any>(mockReport);

    useEffect(() => {
        const data = localStorage.getItem("lastReport");
        if (data) {
            const parsedData = JSON.parse(data);
            // Mapping backend response to match this page's UI structure
            setReport({
                patient_id: parsedData.patient_id || "Unknown",
                date: new Date().toLocaleDateString(),
                genotypes: parsedData.genetic_markers?.map((m: any) => ({
                    gene: m.gene,
                    genotype: m.variant,
                    phenotype: "Analyzed Marker",
                    status: parsedData.risk_assessment === 'Safe' ? 'normal' : 'actionable'
                })) || mockReport.genotypes,
                recommendations_list: [
                    {
                        drug: parsedData.drug_name,
                        gene: parsedData.genetic_markers?.[0]?.gene || "N/A",
                        recommendation: parsedData.recommendations,
                        level: "AI",
                        source: "Gemini-Audited"
                    }
                ],
                report_checksum: parsedData.report_checksum
            });
        }
    }, []);

    // --- PDF DOWNLOAD FUNCTION ---
    const downloadPDF = async (analysisData: any) => {
        try {
            const response = await fetch("http://localhost:8000/api/generate-pdf", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    patient_id: analysisData.patient_id,
                    drug_name: analysisData.recommendations_list[0].drug,
                    risk_assessment: analysisData.genotypes?.[0]?.status || "Analyzed",
                    clinical_explanation: analysisData.recommendations_list[0].recommendation,
                    report_checksum: analysisData.report_checksum || "PENDING-VERIFICATION"
                }),
            });

            if (!response.ok) throw new Error("PDF Generation Failed");

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Clinical_Report_${analysisData.patient_id}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("PDF Error:", error);
            alert("PDF Engine is offline. Check backend.");
        }
    };

    return (
        <main className="min-h-screen bg-[#1a1a1a] pt-32 pb-20 px-4 md:px-8 relative overflow-hidden">
            <Navbar />

            {/* AURA EFFECTS */}
            <div className="absolute top-[10%] left-[-5%] w-[600px] h-[600px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10 text-white">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-5xl font-bold font-outfit mb-2">Clinical PGx Report</h1>
                        <p className="text-zinc-400">
                            Patient ID: <span className="text-cyan-400 font-mono">{report.patient_id}</span> | Generated: {report.date}
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <button 
                            onClick={() => downloadPDF(report)}
                            className="px-6 py-2 rounded-xl border border-white/10 glass hover:bg-white/10 transition-colors"
                        >
                            Download PDF
                        </button>
                        <button className="px-6 py-2 rounded-xl bg-cyan-400 text-black font-bold hover:shadow-[0_0_25px_rgba(0,242,255,0.5)] transition-all">
                            Share Results
                        </button>
                    </div>
                </header>

                {/* Genotype Summary */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold font-outfit mb-6 flex items-center gap-3">
                        <span className="w-1 h-8 bg-cyan-400 rounded-full shadow-[0_0_15px_#00f2ff]" />
                        Genotype Summary
                    </h2>
                    <div className="glass bg-white/5 backdrop-blur-xl rounded-[32px] overflow-hidden border border-white/10">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/5 border-b border-white/10">
                                    <th className="px-8 py-5 font-outfit font-bold text-zinc-400">Gene</th>
                                    <th className="px-8 py-5 font-outfit font-bold text-zinc-400">Genotype</th>
                                    <th className="px-8 py-5 font-outfit font-bold text-zinc-400 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {report.genotypes.map((item: any, i: number) => (
                                    <motion.tr key={i} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="px-8 py-6 font-bold text-lg">{item.gene}</td>
                                        <td className="px-8 py-6 font-mono text-cyan-400">{item.genotype}</td>
                                        <td className="px-8 py-6 text-right">
                                            <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                                                item.status === 'critical' ? 'bg-red-500/20 text-red-500 border-red-500/30' :
                                                item.status === 'normal' ? 'bg-green-500/20 text-green-500 border-green-500/30' :
                                                'bg-cyan-400/20 text-cyan-400 border-cyan-400/30'
                                            } border`}>
                                                {item.status}
                                            </span>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Recommendations */}
                <section>
                    <h2 className="text-2xl font-bold font-outfit mb-6 flex items-center gap-3">
                        <span className="w-1 h-8 bg-purple-500 rounded-full shadow-[0_0_15px_#9d00ff]" />
                        Clinical Recommendations
                    </h2>
                    <div className="grid gap-6">
                        {report.recommendations_list.map((rec: any, i: number) => (
                            <motion.div key={i} className="glass bg-white/5 backdrop-blur-xl p-8 rounded-[32px] border border-white/5">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-2xl">💊</div>
                                        <div>
                                            <h3 className="text-2xl font-bold font-outfit">{rec.drug}</h3>
                                            <p className="text-zinc-500 text-sm">Gene: <span className="text-cyan-400">{rec.gene}</span></p>
                                        </div>
                                    </div>
                                    <span className="px-4 py-1.5 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold border border-purple-500/30">
                                        Source: {rec.source}
                                    </span>
                                </div>
                                <p className="text-zinc-300 leading-relaxed text-lg">{rec.recommendation}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>
                
                {report.report_checksum && (
                    <p className="mt-12 text-center text-zinc-600 font-mono text-xs">
                        SECURITY CHECKSUM: {report.report_checksum}
                    </p>
                )}
            </div>
        </main>
    );
}