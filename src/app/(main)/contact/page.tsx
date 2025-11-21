/* eslint-disable @next/next/no-img-element */
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiThreads } from "react-icons/si";
import { Sparkles } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="w-full flex-1 flex items-center justify-center px-6">
      <div className="max-w-3xl w-full bg-zinc-900 rounded-3xl p-10 border border-emerald-500/20 shadow-xl">
        <div className="flex flex-col items-center text-center space-y-6">
          <img
            src="https://avatars.githubusercontent.com/u/166295238?v=4"
            alt="Ayush Saini"
            className="w-32 h-32 rounded-full object-cover border-4 border-emerald-400 shadow-lg"
          />

          <h1 className="text-4xl font-bold text-white">Ayush Saini</h1>
          <p className="text-xl text-emerald-400 font-medium">Full Stack Developer</p>

          <div className="space-y-2 text-zinc-300 text-lg">
            <p>📞 8824415430</p>
            <p>📧 ayush.jslab@gmail.com</p>
          </div>

          <div className="flex items-center gap-6 text-2xl text-white mt-4">
            <a
              href="https://github.com/ayushjslab"
              target="_blank"
              className="hover:text-emerald-400 transition-all transform hover:scale-110"
            >
              <FaGithub />
            </a>
            <a
              href="https://instagram.com/ayushjslab"
              target="_blank"
              className="hover:text-emerald-400 transition-all transform hover:scale-110"
            >
              <FaInstagram />
            </a>
            <a
              href="https://threads.net/ayushjslab"
              target="_blank"
              className="hover:text-emerald-400 transition-all transform hover:scale-110"
            >
              <SiThreads />
            </a>
            <a
              href="https://linkedin.com/ayushjslab"
              target="_blank"
              className="hover:text-emerald-400 transition-all transform hover:scale-110"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://x.com/ayushjslab"
              target="_blank"
              className="hover:text-emerald-400 transition-all transform hover:scale-110"
            >
              <FaXTwitter />
            </a>
            <a
              href="https://ayushjslab.vercel.app"
              target="_blank"
              className="hover:text-emerald-400 transition-all transform hover:scale-110"
            >
              <Sparkles className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}