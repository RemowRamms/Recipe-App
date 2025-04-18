import React from "react";

const pages = [1, 2, 3];
const currentPage = 2;

export function Pagination() {
  return (
    <nav className="flex gap-2 items-center justify-center" aria-label="Pagination">
      <a
        href="#"
        aria-label="Previous"
        className="px-3 py-1.5 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
      >
        &lt;
      </a>
      {pages.map((page) => (
        <a
          key={page}
          aria-current={page === currentPage ? "page" : undefined}
          className={`px-3 py-1.5 rounded border transition ${
            page === currentPage
              ? "border-gray-600 bg-gray-600 text-white"
              : "border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
        >
          {page}
        </a>
      ))}
      
      <a
        href="#"
        aria-label="Next"
        className="px-3 py-1.5 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
      >
        &gt;
      </a>
    </nav>
  );
}