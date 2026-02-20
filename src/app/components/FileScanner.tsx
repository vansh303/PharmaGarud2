
"use client";

import { motion } from "framer-motion";

import { useState } from "react";

export default function FileScanner() {
    const [fileName, setFileName] = useState("");

    return (
        <motion.div
            className="glass bg-black/60 backdrop-blur-lg border border-white/20 shadow-2xl p-8 w-96 mx-auto mt-10 text-center text-white rounded-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h2 className="text-neon text-xl mb-4">Upload VCF File</h2>
            <input
                type="file"
                accept=".vcf"
                onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
                className="w-full p-2 bg-black border border-neon rounded cursor-pointer"
            />
            {fileName && (
                <motion.div
                    className="mt-4 text-riskGreen font-bold"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                >
                    ✅ {fileName} uploaded successfully
                </motion.div>
            )}
        </motion.div>
    );
}