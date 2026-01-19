"use client";

import CountryFlagSearch from "./countryFlag";
import CountryDialSearch from "./countryDial";
import IndiaCitiesSearch from "./IndiaCitiesSearch";
import RailwayStationSearch from "./RailwayStationSearch";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

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
  {
    title: "India Cities Search",
    description:
      "A comprehensive database of Indian cities and towns across all states and union territories, available at your fingertips.",
    component: <IndiaCitiesSearch />,
  },
  {
    title: "India Railway Stations",
    description:
      "Search through thousands of Indian railway stations by name or station code with real-time autocomplete functionality.",
    component: <RailwayStationSearch />,
  },
];

const ShowCase = () => {
  return (
    <div className="w-full max-w-6xl mx-auto py-16 px-6 space-y-24">
      <div className="flex justify-center items-center gap-3">
        <Sparkles className="w-6 h-6 text-emerald-400" />
        <h1 className="text-4xl font-bold text-white text-center">
          Featured <span className="text-emerald-400">JSON</span>ly APIs
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
          className={`flex flex-col md:flex-row items-center gap-12 ${index % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
        >
          {/* Text Section */}
          <div className="md:w-1/2 space-y-6">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
              API Showcase {index + 1}
            </div>
            <h2 className="text-3xl font-bold text-white">{item.title}</h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Component Showcase */}
          <div className="md:w-1/2 w-full bg-zinc-900/50 border border-emerald-500/10 rounded-2xl p-8 shadow-2xl backdrop-blur-sm hover:border-emerald-400/30 transition-all relative min-h-[300px] flex items-center justify-center">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-emerald-500/10 blur-3xl rounded-full" />
            <div className="w-full relative z-10">
              {item.component}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ShowCase;
