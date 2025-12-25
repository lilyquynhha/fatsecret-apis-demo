import SearchBar from "@/components/ui/foods/search-bar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto w-full md:w-[80%] lg:w-[70%] py-6 px-6">
        <SearchBar />
        {children}
      </div>
    </div>
  );
}
