"use client";

import { useState } from "react";

import { motion } from "framer-motion";

export default function DrugInput() {
    const [drugs, setDrugs] = useState<string>("");

    return (
        <motion.div
            className="glass bg-black/60 backdrop-blur-lg border border-white/20 shadow-2xl p-6 w-96 mx-auto mt-10 text-center text-white rounded-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h2 className="text-neon text-xl mb-4">Enter Drug(s)</h2>
            <input
                type="text"
                value={drugs}
                onChange={(e) => setDrugs(e.target.value)}
                placeholder="Type drug names..."
                className="w-full p-3 rounded bg-black border border-neon text-neon focus:outline-none focus:ring-2 focus:ring-neon"
            />
            {drugs && (
                <motion.div
                    className="mt-4 text-sm text-gray-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    You entered: <span className="text-neon">{drugs}</span>
                </motion.div>
            )}
        </motion.div>
    );
}