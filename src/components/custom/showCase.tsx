"use client";

import CountryFlagSearch from "./countryFlag";
import CountryDialSearch from "./countryDial";
import { motion } from "framer-motion";
import { Sparkles, Code2, Lightbulb, Rocket } from "lucide-react";
const showCaseData = [
  {
    title: "Countries Search",
    description:
      "Allow users to quickly search for any country by name or country code using an elegant and responsive autocomplete interface.",
    component: <CountryFlagSearch />,
  },
  {
    title: "Dial Code Search",
    description:
      "Search international dial codes effortlessly by country name, dial code, or ISO country code using a smooth search experience.",
    component: <CountryDialSearch />,
  },
];

const ShowCase = () => {
  return (
    <div className="w-full max-w-6xl mx-auto py-16 space-y-24">
      <div className="flex justify-center items-center gap-3">
        <Sparkles className="w-6 h-6 text-emerald-400" />
        <h1 className="text-4xl font-bold text-white">
          Some Uses of <span className="text-emerald-400">JSON</span>ly APIs
        </h1>
        <Sparkles className="w-6 h-6 text-emerald-400" />
      </div>
      {showCaseData.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={`flex flex-col md:flex-row items-center gap-12 ${
            index % 2 !== 0 ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Text Section */}
          <div className="md:w-1/2 space-y-4">
            <h2 className="text-3xl font-bold text-white">{item.title}</h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Component Showcase */}
          <div className="md:w-1/2 bg-zinc-900 rounded-2xl p-6 shadow-xl backdrop-blur-xl hover:border-emerald-400/40 transition-all relative min-h-[260px] flex items-start">
            {item.component}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ShowCase;
