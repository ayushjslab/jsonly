"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Copy, Check, Terminal, Globe, ArrowRight, Activity, Trash2, Send, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const EXAMPLES = [
    {
        id: "get-countries",
        title: "List Countries",
        method: "GET",
        endpoint: "/api/countries/dial?limit=5",
        description: "Fetch a paginated list of countries with dial codes.",
    },
    {
        id: "post-city",
        title: "Add New City",
        method: "POST",
        endpoint: "/api/india/cities",
        description: "Add a custom city to an Indian state (In-memory).",
        body: JSON.stringify({
            state: "Haryana",
            city: "Sky City"
        }, null, 2)
    },
    {
        id: "search-stations",
        title: "Search Stations",
        method: "GET",
        endpoint: "/api/india/railway-stations?station=NDLS",
        description: "Search for stations by name, code or city.",
    },
    {
        id: "delete-city",
        title: "Remove City",
        method: "DELETE",
        endpoint: "/api/india/cities?state=Haryana&city=Sky City",
        description: "Delete a city from the database (In-memory).",
    },
];

export default function LiveTester() {
    const [activeTab, setActiveTab] = useState(EXAMPLES[0]);
    const [requestBody, setRequestBody] = useState(activeTab.body || "");
    const [response, setResponse] = useState<any>(null);
    const [metadata, setMetadata] = useState<{ status: number; time: number } | null>(null);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [viewMode, setViewMode] = useState<"body" | "params">(activeTab.method === "GET" ? "params" : "body");

    useEffect(() => {
        setRequestBody(activeTab.body || "");
        setViewMode(activeTab.method === "GET" ? "params" : "body");
        setResponse(null);
        setMetadata(null);
    }, [activeTab]);

    const runTest = async () => {
        setLoading(true);
        const startTime = performance.now();
        try {
            const options: RequestInit = {
                method: activeTab.method,
                headers: { "Content-Type": "application/json" },
            };

            if (["POST", "PUT", "PATCH"].includes(activeTab.method) && requestBody) {
                options.body = requestBody;
            }

            const res = await fetch(activeTab.endpoint, options);
            const endTime = performance.now();
            const data = await res.json();

            setResponse(data);
            setMetadata({
                status: res.status,
                time: Math.round(endTime - startTime)
            });
        } catch (error) {
            const endTime = performance.now();
            setResponse({ error: "Failed to fetch response" });
            setMetadata({ status: 500, time: Math.round(endTime - startTime) });
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        const curl = activeTab.method === "GET"
            ? `curl -X GET "https://jsonly.com${activeTab.endpoint}"`
            : `curl -X ${activeTab.method} "https://jsonly.com${activeTab.endpoint}" -H "Content-Type: application/json" -d '${requestBody}'`;

        navigator.clipboard.writeText(curl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="w-full max-w-7xl mx-auto py-32 px-6">
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6 text-left">
                <div className="space-y-4 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                        Developer Playground
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                        Test your <span className="bg-clip-text text-transparent bg-linear-to-r from-emerald-400 to-teal-200">API logic</span> live
                    </h2>
                    <p className="text-zinc-400 text-lg">
                        Select an endpoint from the sidebar and execute real requests. Explore the responses and understand the data structure instantly.
                    </p>
                </div>
                <div className="flex items-center gap-4 text-zinc-500 text-sm font-medium pb-2">
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Active</div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500" /> Ready</div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                {/* Endpoint Selection */}
                <div className="xl:col-span-4 space-y-3">
                    <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-4 px-2">Endpoints</div>
                    {EXAMPLES.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item)}
                            className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 group relative overflow-hidden ${activeTab.id === item.id
                                ? "bg-emerald-500/10 border-emerald-500/50 shadow-lg"
                                : "bg-zinc-900/40 border-white/5 hover:border-emerald-500/20"
                                }`}
                        >
                            {activeTab.id === item.id && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500"
                                />
                            )}
                            <div className="flex items-center justify-between mb-2">
                                <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-tighter ${item.method === "GET" ? "bg-blue-500/20 text-blue-400" :
                                    item.method === "POST" ? "bg-emerald-500/20 text-emerald-400" :
                                        "bg-red-500/20 text-red-400"
                                    }`}>
                                    {item.method}
                                </span>
                                <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${activeTab.id === item.id ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0 group-hover:opacity-50 group-hover:translate-x-0"
                                    }`} />
                            </div>
                            <h3 className="text-white font-bold mb-1">{item.title}</h3>
                            <p className="text-xs text-zinc-500 leading-relaxed truncate">{item.endpoint}</p>
                        </button>
                    ))}

                    <div className="mt-8 p-6 rounded-2xl bg-linear-to-br from-emerald-500/10 to-transparent border border-emerald-500/10">
                        <h4 className="text-emerald-400 font-bold mb-2">Need a custom key?</h4>
                        <p className="text-xs text-zinc-500 leading-relaxed mb-4">
                            JSONly is an open sandbox. You can modify state and data in-memory for testing purposes.
                        </p>
                        <button onClick={() => window.open('https://github.com/ayushjslab/jsonly', '_blank')} className="text-xs font-bold text-white flex items-center gap-1 hover:gap-2 transition-all">
                            GitHub Repository <ChevronRight size={14} />
                        </button>
                    </div>
                </div>

                {/* Playground Console */}
                <div className="xl:col-span-8 space-y-4">
                    {/* Header bar */}
                    <div className="bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                        <div className="p-4 bg-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/5">
                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                <div className="flex gap-1.5 mr-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                </div>
                                <div className="h-4 w-px bg-white/10 mx-2 hidden sm:block" />
                                <div className="bg-black/40 px-3 py-1.5 rounded-lg border border-white/5 flex items-center gap-2 w-full sm:w-auto">
                                    <span className={`text-[10px] font-bold ${activeTab.method === "GET" ? "text-blue-400" : "text-emerald-400"}`}>
                                        {activeTab.method}
                                    </span>
                                    <code className="text-xs text-zinc-300 truncate max-w-[200px] md:max-w-md">
                                        {activeTab.endpoint}
                                    </code>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                                <button
                                    onClick={copyToClipboard}
                                    className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-zinc-400 hover:text-white transition-all shadow-sm"
                                    title="Copy as cURL"
                                >
                                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                                </button>
                                <button
                                    onClick={runTest}
                                    disabled={loading}
                                    className="flex items-center gap-2 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 flex-1 sm:flex-none"
                                >
                                    {loading ? <Activity className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                    Send Request
                                </button>
                            </div>
                        </div>

                        {/* Editor/Response Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
                            {/* Request Config */}
                            <div className="border-r border-white/5 flex flex-col">
                                <div className="px-6 py-3 border-b border-white/5 flex items-center justify-between">
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => setViewMode("params")}
                                            className={`text-[10px] uppercase font-bold tracking-widest transition-colors ${viewMode === "params" ? "text-emerald-400" : "text-zinc-500 hover:text-zinc-300"}`}
                                        >
                                            Parameters
                                        </button>
                                        {activeTab.method !== "GET" && (
                                            <button
                                                onClick={() => setViewMode("body")}
                                                className={`text-[10px] uppercase font-bold tracking-widest transition-colors ${viewMode === "body" ? "text-emerald-400" : "text-zinc-500 hover:text-zinc-300"}`}
                                            >
                                                Request Body
                                            </button>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => {
                                            setRequestBody(activeTab.body || "");
                                            setResponse(null);
                                            setMetadata(null);
                                        }}
                                        className="text-zinc-500 hover:text-zinc-300 transition-colors"
                                        title="Reset"
                                    >
                                        <RotateCcw size={14} />
                                    </button>
                                </div>
                                <div className="flex-1 p-0 flex flex-col bg-black/20">
                                    {viewMode === "params" ? (
                                        <div className="p-8 flex flex-col items-center justify-center h-full text-center space-y-4">
                                            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                                                <Globe className="w-6 h-6 text-blue-400" />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-white font-bold">Query Parameters</p>
                                                <p className="text-xs text-zinc-500 max-w-[200px]">URL params are detected automatically from the endpoint string.</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <textarea
                                            value={requestBody}
                                            onChange={(e) => setRequestBody(e.target.value)}
                                            spellCheck={false}
                                            className="flex-1 bg-transparent p-6 font-mono text-sm text-emerald-200 outline-none resize-none placeholder-zinc-700"
                                            placeholder="Enter JSON body..."
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Response Viewer */}
                            <div className="flex flex-col bg-black/40">
                                <div className="px-6 py-3 border-b border-white/5 flex items-center justify-between">
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-300">Response</span>
                                    {metadata && (
                                        <div className="flex items-center gap-3">
                                            <span className={`text-[10px] font-bold ${metadata.status >= 400 ? "text-red-400" : "text-emerald-400"}`}>
                                                {metadata.status} OK
                                            </span>
                                            <span className="text-[10px] font-bold text-zinc-500">
                                                {metadata.time}ms
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 overflow-auto p-6 scrollbar-hide">
                                    <AnimatePresence mode="wait">
                                        {response ? (
                                            <motion.div
                                                key="response"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="font-mono text-xs leading-relaxed"
                                            >
                                                <pre className="text-zinc-300">
                                                    {Object.entries(response).map(([key, value]) => (
                                                        <div key={key} className="mb-0.5">
                                                            <span className="text-purple-400">"{key}"</span>:{" "}
                                                            {typeof value === "string" ? (
                                                                <span className="text-emerald-300 font-medium">"{value}"</span>
                                                            ) : typeof value === "number" ? (
                                                                <span className="text-amber-400">{value}</span>
                                                            ) : typeof value === "boolean" ? (
                                                                <span className="text-blue-400">{String(value)}</span>
                                                            ) : (
                                                                <span className="text-zinc-400">{JSON.stringify(value, null, 2)}</span>
                                                            )}
                                                            <span className="text-zinc-500">,</span>
                                                        </div>
                                                    ))}
                                                </pre>
                                            </motion.div>
                                        ) : (
                                            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${loading ? "bg-emerald-500/10 scale-110" : "bg-zinc-800/50"}`}>
                                                    <Terminal className={`w-6 h-6 ${loading ? "text-emerald-400" : "text-zinc-600"}`} />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-zinc-500 text-sm font-medium">
                                                        {loading ? "Waiting for response..." : "Ready to handle your request"}
                                                    </p>
                                                    {!loading && <p className="text-[10px] text-zinc-700">Output will be displayed in JSON format</p>}
                                                </div>
                                            </div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ChevronRight({ size = 16 }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m9 18 6-6-6-6" />
        </svg>
    );
}
