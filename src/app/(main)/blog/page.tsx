"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Pencil, PlusCircle } from "lucide-react";

export default function BlogPage() {
  const [blogs] = useState([]);

  return (
    <main className="w-full max-w-6xl mx-auto py-16 px-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-4xl font-bold text-white flex items-center gap-3">
          <Pencil className="text-emerald-400" /> Blog
        </h1>

        {/* Add Blog Button (non-functional placeholder) */}
        <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 transition text-white px-5 py-3 rounded-xl text-lg font-semibold">
          <PlusCircle />
          Write Blog
        </button>
      </div>

      {/* Empty State */}
      {blogs.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-32 border border-emerald-500/20 rounded-2xl bg-zinc-900/40 backdrop-blur-xl"
        >
          <h2 className="text-2xl text-white font-semibold mb-4">
            No blogs available yet
          </h2>
          <p className="text-zinc-400 text-lg">
            Once you start writing, your posts will appear here in a beautiful layout.
          </p>
        </motion.div>
      )}

      {/* Future Blog List Placeholder */}
      <div className="mt-12 space-y-6">
        {/* Blog cards will appear here once writing functionality is added */}
      </div>
    </main>
  );
}