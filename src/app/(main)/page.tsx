import Example from "@/components/custom/exmple";
import Hero from "@/components/custom/hero";
import ShowCase from "@/components/custom/showCase";
import LiveTester from "@/components/custom/LiveTester";
import Footer from "@/components/custom/footer";
import Script from "next/script";

export default function Home() {
  return (
    <main className="min-h-screen text-white selection:bg-emerald-500/30">
      <Script
        src="https://echomark.vercel.app/widget.js?siteId=691957c6460be5c6953072de"
        strategy="afterInteractive"
      />
      <div className="relative">
        
        <Hero />
        <LiveTester />
        <ShowCase />
        <div className="py-20">
          <Example />
        </div>
        <Footer />
      </div>
    </main>
  );
}
