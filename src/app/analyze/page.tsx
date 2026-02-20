"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

// Cipher Text Effect for WOW Factor
const CipherText = ({ text }: { text: string }) => {
  const letters = "ACGTX10@#$%&^*";
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) return text[index];
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join(""),
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return <span className="font-mono">{displayText}</span>;
};

const JsonTerminal = ({ data }: { data: any }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    className="w-full max-w-4xl mx-auto mt-12 rounded-xl overflow-hidden border border-cyan-400/30 shadow-[0_0_30px_rgba(0,242,255,0.15)] backdrop-blur-md bg-black/80 text-left relative"
  >
    <div
      className={`absolute top-0 left-0 w-full h-1 ${data.risk_assessment === "Toxic" ? "bg-red-500 shadow-[0_0_20px_#ff4b2b]" : "bg-green-500 shadow-[0_0_20px_#2ecc71]"}`}
    ></div>
    <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-white/10">
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <p className="ml-4 text-xs font-mono text-zinc-400">
          root@pharmaguard:~/analysis_result
        </p>
      </div>
      <div
        className={`px-3 py-1 rounded-sm text-xs font-bold font-mono tracking-widest ${data.risk_assessment === "Toxic" ? "bg-red-500/20 text-red-500 border border-red-500" : "bg-green-500/20 text-green-500 border border-green-500"}`}
      >
        STATUS: <CipherText text={data.risk_assessment.toUpperCase()} />
      </div>
    </div>
    <div className="p-6 overflow-x-auto text-sm font-mono text-cyan-400 bg-black max-h-[400px] overflow-y-auto">
      <p className="text-zinc-500 mb-4">
        // DECRYPTING GENOMIC SEQUENCE FOR:{" "}
        <strong className="text-white">
          <CipherText text={data.drug_name} />
        </strong>
      </p>
      <pre className="whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>
    </div>
  </motion.div>
);

export default function AnalyzePage() {
  const [file, setFile] = useState<File | null>(null);
  const [drugName, setDrugName] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [resultData, setResultData] = useState<any>(null);

  const handleAnalysisClick = async () => {
    if (!file) {
      alert("Please upload a VCF file.");
      return;
    }

    setIsAnalyzing(true);
    setResultData(null);

    // FormData ka use zaroori hai multipart/form-data ke liye
    const formData = new FormData();
    formData.append("file", file); // Ye backend ke 'file' parameter se match karna chahiye

    if (drugName && drugName.trim() !== "") {
      formData.append("drug_name", drugName);
    }

    try {
      const response = await fetch("http://localhost:8000/api/analyze", {
        method: "POST",
        body: formData,
        // DHYAN DEIN: Content-Type header manually MAT DALNA, fetch khud handle karega
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server Error ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      setResultData(data);
      localStorage.setItem("lastReport", JSON.stringify(data));
    } catch (error) {
      console.error("Full Connection Error:", error);
      alert("Server error! Make sure backend is running on port 8000.");
    } finally {
      setIsAnalyzing(false);
    }
  };
  return (
    <main className="min-h-screen bg-black pt-32 pb-20 px-4 md:px-8 relative overflow-hidden text-center text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-5xl font-bold mb-16 neon-text"
        >
          Sequence Analysis
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="glass p-10 rounded-[40px] border-white/5">
            <h2 className="text-xl font-bold mb-4">Upload VCF</h2>
            <input
              type="file"
              accept=".vcf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="bg-black border border-cyan-400 p-2 rounded w-full"
            />
          </div>
          <div className="glass p-10 rounded-[40px] border-white/5">
            <h2 className="text-xl font-bold mb-4">Target Medication</h2>
            <input
              type="text"
              value={drugName}
              onChange={(e) => setDrugName(e.target.value)}
              placeholder="e.g. Plavix"
              className="bg-black border border-purple-500 p-2 rounded w-full text-white"
            />
          </div>
        </div>

        <button
          onClick={handleAnalysisClick}
          disabled={isAnalyzing}
          className={`rounded-full px-12 py-5 font-bold border ${isAnalyzing ? "bg-white/10 opacity-50" : "bg-cyan-400 text-white hover:shadow-[0_0_20px_rgba(0,242,255,0.5)]"}`}
        >
          {isAnalyzing ? "Processing..." : "Initiate AI Analysis"}
        </button>

        {resultData && <JsonTerminal data={resultData} />}
      </div>
    </main>
  );
}
