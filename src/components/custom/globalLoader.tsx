"use client";

import { motion } from "framer-motion";

export default function GlobalLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#18181B] text-white relative overflow-hidden">
      {/* Neon Glow Background */}
      <div className="absolute inset-0 bg-linear-to-br from-emerald-500/10 via-transparent to-black" />

      {/* Floating Animated Rings */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        className="absolute w-[500px] h-[500px] rounded-full border-2 border-emerald-400/40 blur-xl"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{
          delay: 0.5,
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute w-[700px] h-[700px] rounded-full border-2 border-emerald-400/20 blur-xl"
      />

      {/* Loading Text + Pulse Line */}
      <div className="flex flex-col items-center gap-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold"
        >
          <span className="text-emerald-400">Loading</span>
          <span className="text-white">...</span>
        </motion.div>

        {/* Pulse Line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "120px" }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="h-1 bg-emerald-400 rounded-full shadow-[0_0_20px_5px_rgba(16,185,129,0.7)]"
        />
      </div>

      {/* Rotating Emerald Glow Orb */}
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="absolute w-48 h-48 rounded-full border border-emerald-400/40 blur-md shadow-[0_0_40px_15px_rgba(16,185,129,0.25)]"
      />
    </div>
  );
}
