"use client";

import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function DocsPage() {
    return (
        <main className="min-h-screen bg-black pt-32 pb-20 px-4 md:px-8 relative overflow-hidden">
            <Navbar />
            
            <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-neon-blue/10 blur-[150px] rounded-full pointer-events-none" />
            
            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                    <h1 className="text-5xl font-bold font-outfit mb-6 neon-text">Documentation</h1>
                    <p className="text-xl text-zinc-400">System Architecture & API Integration Details</p>
                </motion.div>

                <div className="glass p-8 rounded-3xl border-white/10 text-zinc-300 space-y-6">
                    <h2 className="text-2xl font-bold text-white">1. System Overview</h2>
                    <p>PharmaGuard AI utilizes a decoupled microservices architecture. The Next.js frontend communicates with our core pharmacogenomics analysis engine via a secure REST API.</p>

                    <h2 className="text-2xl font-bold text-white mt-8">2. Core API Endpoint</h2>
                    <div className="bg-black/80 p-4 rounded-xl border border-white/10 font-mono text-sm flex items-center gap-4">
                        <span className="text-risk-green font-bold px-2 py-1 bg-risk-green/20 rounded">POST</span> 
                        <span className="text-white">/api/v1/analyze</span>
                    </div>
                    <p>Accepts a standard <code className="text-neon-cyan">.vcf</code> / <code className="text-neon-cyan">.gvcf</code> file and an array of target medications. Returns a strictly structured JSON risk assessment based on CPIC guidelines.</p>

                    <h2 className="text-2xl font-bold text-white mt-8">3. Hackathon Submission</h2>
                    <p>For complete setup instructions, JSON schemas, and technical implementation details, please review our official GitHub Repository README.md file as per the RIFT hackathon requirements.</p>
                </div>
            </div>
        </main>
    );
}