
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
    if (totalPages <= 5) return i + 1;
    
    if (currentPage <= 3) return i + 1;
    
    if (currentPage >= totalPages - 2) return totalPages - 4 + i;
    
    return currentPage - 2 + i;
  });

  return (
    <div className="flex items-center justify-center mt-6 gap-1">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={cn(
          "h-8 w-8 rounded-md flex items-center justify-center",
          "border border-envio-gray-200",
          "hover:bg-envio-gray-100 transition-colors",
          currentPage === 1 && "opacity-50 cursor-not-allowed"
        )}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      
      {currentPage > 3 && totalPages > 5 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="h-8 w-8 rounded-md flex items-center justify-center hover:bg-envio-gray-100"
          >
            1
          </button>
          <span className="px-2">...</span>
        </>
      )}

      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={cn(
            "h-8 w-8 rounded-md flex items-center justify-center",
            page === currentPage
              ? "bg-envio-red text-white"
              : "hover:bg-envio-gray-100"
          )}
        >
          {page}
        </button>
      ))}

      {currentPage < totalPages - 2 && totalPages > 5 && (
        <>
          <span className="px-2">...</span>
          <button
            onClick={() => onPageChange(totalPages)}
            className="h-8 w-8 rounded-md flex items-center justify-center hover:bg-envio-gray-100"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={cn(
          "h-8 w-8 rounded-md flex items-center justify-center",
          "border border-envio-gray-200",
          "hover:bg-envio-gray-100 transition-colors",
          currentPage === totalPages && "opacity-50 cursor-not-allowed"
        )}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
