"use client";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import Link from "next/link";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Add URLs corresponding to nav items
  const navItems = [
    { name: "Home", url: "/" },
    { name: "Docs", url: "/docs" },
    { name: "Github", url: "https://github.com/ayushjslab/jsonly", external: true },
    { name: "Contact", url: "/contact" },
    { name: "Blog", url: "/blog" },
  ];

  return (
    <header className="bg-transparent backdrop-blur-2xl shadow-lg sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 md:px-8">
        <div className="text-4xl font-bold text-white tracking-wide hover:text-emerald-400 transition-colors duration-300 cursor-pointer ml-10">
          <Link href="/">
            {" "}
            <span className="text-emerald-400">JSON</span>ly
          </Link>
        </div>

        <ul className="hidden md:flex items-center gap-8 list-none text-white mr-10">
          {navItems.map((item) => (
            <li
              key={item.name}
              className="relative cursor-pointer text-xl font-semibold transition-all duration-300 hover:text-emerald-400 group"
            >
              {item.external ? (
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.name}
                </a>
              ) : (
                <Link href={item.url}>{item.name}</Link>
              )}
              <span className="absolute left-0 -bottom-1 w-0 h-1 bg-emerald-400 transition-all duration-300 group-hover:w-full rounded"></span>
            </li>
          ))}
        </ul>

        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white text-3xl focus:outline-none cursor-pointer"
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <ul className="flex flex-col gap-4 px-6 pb-4 md:hidden text-white">
          {navItems.map((item) => (
            <li
              key={item.name}
              className="cursor-pointer text-lg font-semibold hover:text-emerald-400 transition-colors duration-300"
            >
              {item.external ? (
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.name}
                </a>
              ) : (
                <Link href={item.url}>{item.name}</Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};

export default Header;
