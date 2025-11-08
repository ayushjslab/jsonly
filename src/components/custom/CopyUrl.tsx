"use client";

import { useState } from "react";
import { Clipboard, Check } from "lucide-react"; // icons
import { Button } from "@/components/ui/button"; // optional if using shadcn/ui

export function CopyUrl({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2 bg-neutral-900 p-3 rounded-xl">
      <code className="text-emerald-400">{url}</code>
      <Button
        onClick={handleCopy}
        variant="ghost"
        size="icon"
        title="Copy URL"
        className="text-emerald-300 hover:text-white"
      >
        {copied ? <Check size={16} /> : <Clipboard size={16} />}
      </Button>
    </div>
  );
}
