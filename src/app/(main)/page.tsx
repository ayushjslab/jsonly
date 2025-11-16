
import Example from "@/components/custom/exmple";
import Hero from "@/components/custom/hero";
import ShowCase from "@/components/custom/showCase"
import Footer from "@/components/custom/footer"
import Script from "next/script";
export default function Home() {
  return (
    <div>
     <Script
        src="https://echomark.vercel.app/widget.js?siteId=691957c6460be5c6953072de"
        strategy="afterInteractive"
      />
      <Hero />
      <Example/>
      <ShowCase/>
      <Footer/>
    </div>
  );
}
