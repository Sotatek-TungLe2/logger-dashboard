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
        className="w-8 h-8 border-2 border-inlinecode-100 !bg-base-175 rounded-lg text-system-content"
        onClick={() => onPageChange(1)}
        disabled={page === 1}
      >
        <ChevronsLeft size={16} color="currentColor" />
      </Button>
      <Button
        variant="outline"
        className="w-8 h-8 flex items-center justify-center border-2 border-inlinecode-100 !bg-base-175 rounded-lg text-system-content"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        <ChevronLeft size={14} />
      </Button>
      {getPages().map((p) => (
        <Button
          key={p}
          variant="outline"
          className={`w-8 h-8 border-2 border-inlinecode-100 !bg-base-175 rounded-lg text-system-content ${
            page === p ? " !border-1 border-primary-950 text-orange-400" : ""
          }`}
          onClick={() => onPageChange(p)}
        >
          {p}
        </Button>
      ))}
      <Button
        className="w-8 h-8 border-2 border-inlinecode-100 !bg-base-175 rounded-lg text-system-content"
        variant="outline"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        <ChevronRight size={14} />
      </Button>
      <Button
        className="w-8 h-8 border-2 border-inlinecode-100 !bg-base-175 rounded-lg text-system-content"
        variant="outline"
        onClick={() => onPageChange(totalPages)}
        disabled={page === totalPages}
      >
        <ChevronsRight size={14} />
      </Button>
      <Button className="px-1 border-2 h-8 flex border-inlinecode-100 !bg-base-175 rounded-lg disabled:opacity-50 text-system-content" variant="outline">{totalPages}건</Button>
    </div>
  );
}