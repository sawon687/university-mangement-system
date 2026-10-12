"use client";

import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ProgramPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function UsePagination({
  currentPage,
  totalPages,
  onPageChange,
}: ProgramPaginationProps) {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages: (number | "ellipsis")[] = [];

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("ellipsis");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let page = start; page <= end; page++) {
      pages.push(page);
    }

    if (currentPage < totalPages - 2) {
      pages.push("ellipsis");
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <PaginationRoot className="mt-8">
      <PaginationContent className="flex-wrap gap-1">
        <PaginationItem>
          <PaginationPrevious
            href="#programs"
            onClick={(event) => {
              event.preventDefault();

              if (currentPage > 1) {
                onPageChange(currentPage - 1);
              }
            }}
            aria-disabled={currentPage === 1}
            className={
              currentPage === 1
                ? "pointer-events-none opacity-40"
                : "cursor-pointer"
            }
          />
        </PaginationItem>

        {getPages().map((page, index) => (
          <PaginationItem key={`${page}-${index}`}>
            {page === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={`#page-${page}`}
                isActive={currentPage === page}
                onClick={(event) => {
                  event.preventDefault();
                  onPageChange(page);
                }}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#programs"
            onClick={(event) => {
              event.preventDefault();

              if (currentPage < totalPages) {
                onPageChange(currentPage + 1);
              }
            }}
            aria-disabled={currentPage === totalPages}
            className={
              currentPage === totalPages
                ? "pointer-events-none opacity-40"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
}
