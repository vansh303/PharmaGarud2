"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            // Yahan bg-black/70 aur backdrop-blur-xl add kiya hai
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 glass bg-black/70 backdrop-blur-xl m-4 rounded-2xl border border-white/10 shadow-lg"
        >
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-neon-blue flex items-center justify-center">
                    <span className="text-black font-bold text-xs">PG</span>
                </div>
                <span className="text-xl font-bold font-outfit tracking-tight text-white drop-shadow-md">
                    <span className="text-neon-blue">PharmaGuard</span> AI
                </span>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                <Link href="/" className="hover:text-neon-blue transition-colors text-white drop-shadow-md">Home</Link>
                <Link href="/analyze" className="hover:text-neon-blue transition-colors text-white drop-shadow-md">Analyze</Link>
                <Link href="/reports" className="hover:text-neon-blue transition-colors text-white drop-shadow-md">Reports</Link>
                <Link href="/docs" className="hover:text-neon-blue transition-colors text-white drop-shadow-md">Documentation</Link>
            </div>

            <Link href="/analyze">
                <button className="px-5 py-2 rounded-full bg-white text-black text-sm font-bold hover:bg-neon-blue transition-all duration-300 cursor-pointer">
                    Get Started
                </button>
            </Link>
        </motion.nav>
    );
}