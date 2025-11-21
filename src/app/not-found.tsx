"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Ghost } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#18181B] text-white px-6">
      {/* Floating Glow */}
      <div className="fixed inset-0 -z-10 bg-linear-to-br from-emerald-500/10 via-transparent to-black"></div>

      {/* Ghost Icon */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-6"
      >
        <Ghost className="w-28 h-28 text-emerald-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.6)] animate-pulse" />
      </motion.div>

      {/* Big Title */}
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="text-6xl font-extrabold tracking-wide"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-4 text-xl text-zinc-300 max-w-lg text-center"
      >
        Looks like you wandered into the void. The page you’re searching for
        doesn’t exist anymore (or never did).
      </motion.p>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8"
      >
        <Link
          href="/"
          className="flex items-center gap-2 bg-emerald-500/20 hover:bg-emerald-500/30 transition-all backdrop-blur-md border border-emerald-400/20 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-emerald-400/20"
        >
          <ArrowLeft className="w-5 h-5 text-emerald-400" />
          Go Back Home
        </Link>
      </motion.div>

      {/* Footer Glow Line */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "70%" }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="h-1 mt-10 bg-linear-to-r from-transparent via-emerald-400 to-transparent rounded-full shadow-[0_0_25px_8px_rgba(16,185,129,0.4)]"
      ></motion.div>
    </div>
  );
}
