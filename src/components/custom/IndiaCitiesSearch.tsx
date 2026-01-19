"use client";

import { useState, useMemo } from "react";
import { Search, MapPin } from "lucide-react";
import { INDIAN_CITIES } from "@/json/cities/india";

export default function IndiaCitiesSearch() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const allCities = useMemo(() => {
        return Object.entries(INDIAN_CITIES).flatMap(([state, cities]) =>
            cities.map((city) => ({ city, state }))
        );
    }, []);

    const filteredCities = useMemo(() => {
        if (!searchQuery.trim()) return [];
        const query = searchQuery.toLowerCase();
        return allCities
            .filter(
                (item) =>
                    item.city.toLowerCase().includes(query) ||
                    item.state.toLowerCase().includes(query)
            )
            .slice(0, 5);
    }, [searchQuery, allCities]);

    return (
        <div className="w-full max-w-md">
            <div className="relative">
                <div className="relative group">
                    <div className="absolute left-3 top-3 text-emerald-400 pointer-events-none">
                        <Search size={20} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search Indian cities or states..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setIsOpen(true);
                        }}
                        onFocus={() => searchQuery && setIsOpen(true)}
                        className="w-full pl-10 pr-4 py-3 bg-zinc-900 border-2 border-emerald-500/30 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
                    />
                    <div className="absolute inset-0 rounded-lg bg-emerald-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none" />
                </div>

                {isOpen && filteredCities.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border-2 border-emerald-500/30 rounded-lg overflow-hidden shadow-xl z-20">
                        <div className="max-h-80 overflow-y-auto">
                            {filteredCities.map((item, index) => (
                                <button
                                    key={`${item.city}-${item.state}-${index}`}
                                    onClick={() => {
                                        setSearchQuery(`${item.city}, ${item.state}`);
                                        setIsOpen(false);
                                    }}
                                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-emerald-500/10 transition-colors duration-150 border-b border-emerald-500/10 last:border-b-0 text-left group"
                                >
                                    <MapPin size={18} className="text-emerald-500/50 group-hover:text-emerald-400 transition-colors" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white font-medium truncate group-hover:text-emerald-300 transition-colors">
                                            {item.city}
                                        </p>
                                        <p className="text-zinc-400 text-xs group-hover:text-emerald-400/70 transition-colors">
                                            {item.state}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {isOpen && searchQuery.trim() && filteredCities.length === 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border-2 border-emerald-500/30 rounded-lg p-4 z-20">
                        <p className="text-zinc-400 text-sm text-center">
                            No cities found matching “{searchQuery}”
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
