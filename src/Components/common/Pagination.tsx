// Pagination component
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePages = pages.slice(
    Math.max(0, currentPage - 2),
    Math.min(totalPages, currentPage + 2)
  );

  return (
    <div className="flex justify-center gap-3 mt-8">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-primary-50 hover:text-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center gap-1"
        aria-label="Previous"
      >
        &lt;
      </button>

      {currentPage > 3 && pages[0] && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-primary-50 hover:text-primary-700 transition font-medium"
          >
            1
          </button>
          {currentPage > 3 && <span className="px-2 py-1">...</span>}
        </>
      )}

      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 border rounded-lg shadow-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-primary-300 ${
            page === currentPage
              ? 'bg-primary-600 text-white border-primary-600 scale-105'
              : 'bg-white border-gray-300 hover:bg-primary-50 hover:text-primary-700'
          }`}
        >
          {page}
        </button>
      ))}

      {currentPage < totalPages - 2 && (
        <>
          {currentPage < totalPages - 2 && <span className="px-2 py-1">...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-primary-50 hover:text-primary-700 transition font-medium"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-primary-50 hover:text-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center gap-1"
        aria-label="Next"
      >
        &gt;
      </button>
    </div>
  );
};
