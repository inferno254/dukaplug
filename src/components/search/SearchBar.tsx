// src/components/search/SearchBar.tsx
"use client";

import { ChangeEvent } from "react";

type SearchBarProps = {
  query: string;
  setQuery: (q: string) => void;
};

export default function SearchBar({ query, setQuery }: SearchBarProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="flex items-center mb-6">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded bg-[#1A1E1A] text-[#F6F4EC] placeholder:text-[#888] focus:outline-none focus:ring-2 focus:ring-[#4CA82E]"
      />
    </div>
  );
}

