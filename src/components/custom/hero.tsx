"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Terminal, Github, ChevronRight } from "lucide-react";

export default function Hero() {
  const router = useRouter();

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 blur-[120px] rounded-full -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-400/10 blur-[100px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-4">
            <Terminal size={16} />
            <span>Open Source & Free Forever</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight text-white">
            Welcome to <br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-emerald-400 to-teal-200">
              JSONly
            </span> ❤
          </h1>

          <div className="space-y-4 max-w-xl">
            <p className="text-xl md:text-2xl text-zinc-400 font-medium">
              The ultimate developer playground for JSON APIs.
            </p>
            <p className="text-lg text-zinc-500 leading-relaxed">
              Experience lightning-fast, full CRUD APIs for countries, India cities, railway stations, and more. Ready-to-use, type-safe, and designed for modern workflows.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 pt-4">
            <button
              onClick={() => router.push(`/docs`)}
              className="group flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
            >
              Get Started Free
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => router.push(`https://github.com/ayushjslab`)}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-bold transition-all duration-300 backdrop-blur-sm"
            >
              <Github className="w-5 h-5" />
              View on GitHub
            </button>
          </div>

          <div className="flex items-center gap-8 pt-8 border-t border-white/5 w-full justify-center lg:justify-start">
            <div className="text-center lg:text-left">
              <div className="text-2xl font-bold text-white">200+</div>
              <div className="text-zinc-500 text-sm">Countries</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-2xl font-bold text-white">5000+</div>
              <div className="text-zinc-500 text-sm">Stations</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-2xl font-bold text-white">0.0ms</div>
              <div className="text-zinc-500 text-sm">Latency</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="absolute inset-0 bg-emerald-500/20 blur-[120px] rounded-full" />
          <Image
            src="/image.png"
            alt="JSON illustration"
            width={600}
            height={600}
            className="w-full max-w-[600px] h-auto drop-shadow-[0_35px_35px_rgba(16,185,129,0.3)] relative z-10"
            priority
          />
        </motion.div>
      </div>
    </div>
  );
}
