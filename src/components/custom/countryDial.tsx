"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { COUNTRIES_DIAL } from "@/json/countries/country-dial";

export default function CountryDialSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Filter countries based on search query (limit to 5 results)
  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }

    const query = searchQuery.toLowerCase();
    return COUNTRIES_DIAL.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.code.toLowerCase().includes(query) ||
        item.dial_code.includes(query)
    ).slice(0, 5);
  }, [searchQuery]);

  return (
    <div className="w-full max-w-md">
      <div className="relative">
        {/* Search Input */}
        <div className="relative group">
          <div className="absolute left-3 top-3 text-emerald-400 pointer-events-none">
            <Search size={20} />
          </div>

          <input
            type="text"
            placeholder="Search by country, code or dial..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => searchQuery && setIsOpen(true)}
            className="w-full pl-10 pr-4 py-3 bg-zinc-900 border-2 border-emerald-500/30 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
          />

          {/* Glow effect */}
          <div className="absolute inset-0 rounded-lg bg-emerald-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none" />
        </div>

        {/* Dropdown */}
        {isOpen && filteredCountries.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border-2 border-emerald-500/30 rounded-lg overflow-hidden shadow-xl z-10">
            <div className="max-h-80 overflow-y-auto">
              {filteredCountries.map((item, index) => (
                <button
                  key={`${item.code}-${index}`}
                  onClick={() => {
                    setSearchQuery(`${item.name} (${item.dial_code})`);
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-emerald-500/10 transition-colors duration-150 border-b border-emerald-500/10 last:border-b-0 text-left group"
                >
                  {/* Country Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate group-hover:text-emerald-300 transition-colors">
                      {item.name}
                    </p>

                    <p className="text-zinc-400 text-xs group-hover:text-emerald-400/70 transition-colors">
                      {item.code.toUpperCase()} • {item.dial_code}
                    </p>
                  </div>

                  {/* Indicator */}
                  <div className="w-2 h-2 rounded-full bg-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* No results */}
        {isOpen && searchQuery.trim() && filteredCountries.length === 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border-2 border-emerald-500/30 rounded-lg p-4">
            <p className="text-zinc-400 text-sm text-center">
              No countries found matching “{searchQuery}”
            </p>
          </div>
        )}
      </div>

      {/* Search info */}
      {searchQuery && (
        <div className="mt-3 text-xs text-zinc-500">
          <p>
            Found{" "}
            <span className="text-emerald-400 font-semibold">
              {filteredCountries.length}
            </span>{" "}
            result{filteredCountries.length !== 1 ? "s" : ""}
          </p>
        </div>
      )}
    </div>
  );
}
