import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "@/components/base/Button";

interface PaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  totalItems,
  onPageChange,
}: PaginationProps) {
 
  const getPages = () => {
    const pages = [];
    let start = Math.max(1, page - 1);
    let end = start + 3;
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - 3);
    }
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <div className="flex items-center gap-1 mt-4 justify-end">
      <Button
        variant="outline"
        className="w-8 h-8 "
        onClick={() => onPageChange(1)}
        disabled={page === 1}
      >
        <ChevronsLeft size={16} color="currentColor" />
      </Button>
      <Button
        variant="outline"
        className="w-8 h-8 flex items-center justify-center"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        <ChevronLeft size={14} />
      </Button>
      {getPages().map((p) => (
        <Button
          key={p}
          variant="outline"
          className={`w-8 h-8 ${
            page === p ? "border-orange-500 text-orange-400" : ""
          }`}
          onClick={() => onPageChange(p)}
        >
          {p}
        </Button>
      ))}
      <Button
        className="w-8 h-8"
        variant="outline"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        <ChevronRight size={14} />
      </Button>
      <Button
        className="w-8 h-8 "
        variant="outline"
        onClick={() => onPageChange(totalPages)}
        disabled={page === totalPages}
      >
        <ChevronsRight size={14} />
      </Button>
      <Button className="px-1  h-8 flex  disabled:opacity-50" variant="outline">{totalItems}건</Button>
    </div>
  );
}