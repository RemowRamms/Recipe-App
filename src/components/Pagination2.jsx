import React from "react";

var currentPage = 1;

export function Pagination({setCurrentPage, pages}) {
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
          onClick={() => {
            setCurrentPage(page)
           currentPage = page

          }

        }
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

        aria-label="Next"
        className="px-3 py-1.5 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
      >
        &gt;
      </a>
    </nav>
  );
}