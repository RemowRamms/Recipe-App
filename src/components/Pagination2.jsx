import React from "react";

export function Pagination({ setCurrentPage, pages, currentPage }) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <nav className="flex gap-2 items-center justify-center" aria-label="Pagination">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`px-3 py-1.5 rounded border transition ${
          currentPage === 1
            ? "border-gray-200 text-gray-400 cursor-not-allowed"
            : "border-gray-300 text-gray-700 hover:bg-gray-100"
        }`}
        aria-label="Previous page"
      >
        &lt;
      </button>
      {pages.map((page) => (
        <button
          onClick={() => setCurrentPage(page)}
          key={page}
          aria-current={page === currentPage ? "page" : undefined}
          className={`px-3 py-1.5 rounded border transition ${
            page === currentPage
              ? "border-gray-600 bg-gray-600 text-white"
              : "border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={handleNext}
        disabled={currentPage === pages.length}
        className={`px-3 py-1.5 rounded border transition ${
          currentPage === pages.length
            ? "border-gray-200 text-gray-400 cursor-not-allowed"
            : "border-gray-300 text-gray-700 hover:bg-gray-100"
        }`}
        aria-label="Next page"
      >
        &gt;
      </button>
    </nav>
  );
}