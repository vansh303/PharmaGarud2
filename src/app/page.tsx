"use client";

import HeroDNA from "./components/HeroDNA";
import Navbar from "./components/Navbar";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black overflow-hidden font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center pt-20">
        
        {/* 3D Background with Dark Overlay Fix */}
        <div className="absolute inset-0 z-0">
          <HeroDNA />
          {/* YEH LINE ADD KI HAI - Dark Overlay */}
          <div className="absolute inset-0 bg-black/50 pointer-events-none z-10" />
        </div>

        <div className="relative z-20 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto drop-shadow-2xl"
          >
            {/* Text me drop-shadow-lg add kiya hai taaki white background pe bhi padha jaye */}
            <h1 className="text-6xl md:text-8xl font-bold font-outfit leading-tight mb-6 tracking-tight text-white drop-shadow-lg">
              Precision Medicine <br />
              <span className="neon-text drop-shadow-[0_0_15px_rgba(0,242,255,0.8)]">Redefined by AI</span>
            </h1>
            <p className="text-xl text-zinc-200 max-w-2xl mx-auto mb-12 drop-shadow-md font-medium">
              Deep genomic analysis meets clinical precision. Upload your sequencing data
              for instant, actionable pharmacogenomics insights.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Feature Section (Rest remains same) */}
      <section className="py-24 relative z-20 glass mx-4 my-20 rounded-[40px] border-white/10 bg-black/60">
        <div className="container mx-auto px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group backdrop-blur-md">
              <div className="w-12 h-12 rounded-xl bg-neon-blue/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-neon-blue">🧬</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 font-outfit text-white">VCF Analysis</h3>
              <p className="text-zinc-300 leading-relaxed">Advanced star-allele calling and genotype mapping from standard VCF sequences.</p>
            </div>

            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group backdrop-blur-md">
              <div className="w-12 h-12 rounded-xl bg-neon-purple/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-neon-purple">💊</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 font-outfit text-white">Drug Interaction</h3>
              <p className="text-zinc-300 leading-relaxed">Interactive drug-phenotype mapping powered by CPIC and PharmGKB guidelines.</p>
            </div>

            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group backdrop-blur-md">
              <div className="w-12 h-12 rounded-xl bg-risk-red/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-risk-red">🛡️</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 font-outfit text-white">Clinical Safety</h3>
              <p className="text-zinc-300 leading-relaxed">Automated risk detection and prescribing recommendations for safer healthcare.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}