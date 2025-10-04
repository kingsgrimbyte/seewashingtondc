"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import AppIcon from "@/components/ui/AppIcon";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Track scroll position for header transformation
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  // Close mega menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        megaMenuOpen &&
        !(event.target as Element).closest(".mega-menu-container")
      ) {
        setMegaMenuOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [megaMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Close mega menu when mobile menu opens
    if (megaMenuOpen) {
      setMegaMenuOpen(null);
    }
  };

  const handleMegaMenu = (key: string | null) => {
    setMegaMenuOpen(megaMenuOpen === key ? null : key);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen) {
      // Focus the search input when opening
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Close the search box
      setSearchOpen(false);
      // Navigate to the search page with the query
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const categories = {
    attractions: [
      { name: "Museums", href: "/museums", icon: "museum" },
      { name: "Monuments", href: "/monuments", icon: "monument" },
      { name: "Memorials", href: "/memorials", icon: "memorial" },
      { name: "Parks", href: "/parks", icon: "park" },
    ],
    activities: [
      {
        name: "Water Sports",
        href: "/water-sports",
        icon: "water",
      },
      {
        name: "Fishing Spots",
        href: "/fishing-spot",
        icon: "fish",
      },
      { name: "Spa", href: "/spa", icon: "spa" },
      { name: "Beaches", href: "/beach", icon: "beach" },
      { name: "Islands", href: "/island", icon: "island" },
    ],
    dining: [
      {
        name: "Restaurants",
        href: "/restaurants",
        icon: "restaurant",
      },
      { name: "Bars", href: "/bar", icon: "bar" },
      { name: "Cuisine", href: "/cuisine", icon: "cafe" },
    ],
    entertainment: [
      { name: "Theaters ", href: "/theater/", icon: "theater" },
      { name: "Zoo", href: "/Zoo/", icon: "zoo" },
      { name: "Golf Courses", href: "/golf-courses/", icon: "golf" },
      { name: "Nightlife & Bars", href: "/bar/", icon: "bar" },
    ],
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 bg-white shadow-md py-2`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center h-14 overflow-hidden">
              <img
                src="https://ik.imagekit.io/h7rza8886p/seewashingtondc.png?updatedAt=1753072362218"
                alt="DC Directory Logo"
                className="h-24  object-contain w-40 "
                style={{ display: "inline-block", verticalAlign: "middle" }}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:space-x-1">
            <Link
              href="/"
              className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-full transition-all text-gray-700 hover:bg-gray-100"
            >
              Home
            </Link>

            {/* Mega menu triggers */}
            <div className="relative mega-menu-container">
              <button
                onClick={() => handleMegaMenu("attractions")}
                className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-full transition-all text-gray-700 hover:bg-gray-100"
              >
                Attractions
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ml-1 transition-transform duration-200 ${
                    megaMenuOpen === "attractions" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            <div className="relative mega-menu-container">
              <button
                onClick={() => handleMegaMenu("activities")}
                className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-full transition-all text-gray-700 hover:bg-gray-100"
              >
                Things To Do
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ml-1 transition-transform duration-200 ${
                    megaMenuOpen === "activities" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            <div className="relative mega-menu-container">
              <button
                onClick={() => handleMegaMenu("dining")}
                className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-full transition-all text-gray-700 hover:bg-gray-100"
              >
                Dining
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ml-1 transition-transform duration-200 ${
                    megaMenuOpen === "dining" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            <div className="relative mega-menu-container">
              <button
                onClick={() => handleMegaMenu("entertainment")}
                className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-full transition-all text-gray-700 hover:bg-gray-100"
              >
                Entertainment
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ml-1 transition-transform duration-200 ${
                    megaMenuOpen === "entertainment" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            {/* About and Contact links */}
            <Link
              href="/about"
              className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-full transition-all text-gray-700 hover:bg-gray-100"
            >
              About
            </Link>

            {/* <Link
              href="/weather"
              className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-full transition-all text-gray-700 hover:bg-gray-100"
            >
              Weather
            </Link> */}

            <Link
              href="/contact"
              className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-full transition-all text-gray-700 hover:bg-gray-100"
            >
              Contact
            </Link>
          </nav>

          {/* Search Button */}
          <div className="hidden md:flex items-center">
            <button
              onClick={toggleSearch}
              className="group p-2 rounded-full flex items-center gap-2 transition-all bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span className="text-sm font-medium pr-1">Search</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full transition-colors text-gray-700 hover:bg-gray-100"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mega menu panels */}
      {megaMenuOpen && (
        <div className="hidden md:block absolute left-0 right-0 bg-white shadow-xl mt-2 py-8 border-t border-gray-100 border-b mega-menu-container">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {categories[megaMenuOpen as keyof typeof categories].map(
                (item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group p-4 rounded-xl hover:bg-primary/5 transition-all duration-200 flex items-center gap-4 hover:scale-105"
                    onClick={() => setMegaMenuOpen(null)}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <span className="text-2xl text-primary">
                        <AppIcon name={item.icon as any} className="text-2xl" />
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Explore {item.name.toLowerCase()}
                      </p>
                    </div>
                  </Link>
                )
              )}
            </div>

            {/* View all section */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="text-center">
                <Link
                  href={`/${
                    megaMenuOpen === "attractions"
                      ? "attractions"
                      : megaMenuOpen === "activities"
                      ? "things-to-do"
                      : megaMenuOpen === "dining"
                      ? "eat-and-drink"
                      : "entertainment"
                  }`}
                  className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors duration-200 font-medium"
                  onClick={() => setMegaMenuOpen(null)}
                >
                  View All{" "}
                  {megaMenuOpen === "attractions"
                    ? "Attractions"
                    : megaMenuOpen === "activities"
                    ? "Activities"
                    : megaMenuOpen === "dining"
                    ? "Dining"
                    : "Entertainment"}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {searchOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-100 p-4 md:p-6 z-50 transition-all duration-300">
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search for attractions, restaurants, parks..."
                    className="w-full bg-gray-50 border-0 pl-12 pr-4 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-gray-800"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition"
                  >
                    Search
                  </button>
                </div>
              </form>

              <button
                className="absolute -top-3 -right-3 bg-gray-200 rounded-full p-1 text-gray-600 hover:bg-gray-300 transition-colors"
                onClick={toggleSearch}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-4 text-gray-700 text-sm">
              <p>Popular: Museums, Restaurants, Parks, Monuments</p>
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute left-0 right-0 bg-white shadow-xl border-t border-gray-100 h-screen overflow-y-auto">
          <div className="pt-2 pb-3 px-4 space-y-1 divide-y divide-gray-100">
            {/* Home link */}
            <Link
              href="/"
              className="block p-3 font-medium text-primary hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>

            {/* About and Contact links */}
            <div className="py-2">
              <Link
                href="/about"
                className="block p-3 font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>

              <Link
                href="/weather"
                className="block p-3 font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Weather
              </Link>

              <Link
                href="/contact"
                className="block p-3 font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>

            {/* Mobile search */}
            <div className="py-3">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-gray-50 border border-gray-200 px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white p-1 rounded-md hover:bg-secondary transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </form>
            </div>

            {/* Mobile categories */}
            {Object.entries(categories).map(([category, items]) => (
              <div key={category} className="pt-3">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </h3>
                <div className="space-y-1">
                  {items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-lg text-primary">
                          <AppIcon
                            name={item.icon as any}
                            className="text-lg"
                          />
                        </span>
                      </div>
                      <span className="font-medium text-gray-900">
                        {item.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
