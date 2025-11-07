import React from "react";

const Example = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6 md:px-20 py-16 space-y-8">
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center leading-snug md:leading-tight">
        How Working with API Endpoints <br className="hidden md:block" /> and
        HTTP Methods in <span className="text-emerald-400">Jsonly</span>?
      </h1>

      {/* Description */}
      <p className="max-w-3xl text-center text-lg sm:text-xl md:text-2xl text-gray-300">
        Jsonly provides developers with a fully functional playground for JSON
        APIs. Experiment with HTTP methods like{" "}
        <span className="font-semibold text-emerald-400">
          GET, POST, PUT, PATCH,
        </span>{" "}
        and <span className="font-semibold text-emerald-400">DELETE</span>, and
        see instant responses in real-time. All actions are live, fully
        interactive, and temporary — making Jsonly a safe, fast, and open-source
        tool for testing and learning.
      </p>

      {/* Optional CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <button className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-lg font-semibold transition-all duration-300">
          Try APIs
        </button>
        <button className="px-6 py-3 border border-emerald-500 hover:bg-emerald-500 hover:text-white rounded-lg font-semibold transition-all duration-300">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default Example;
