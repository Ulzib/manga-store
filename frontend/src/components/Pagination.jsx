import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";

const Pagination = ({ pagination, currentPage, onPageChange }) => {
  if (!pagination || pagination.pageCount <= 1) return null;

  const { pageCount, prevPage, nextPage } = pagination;

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <Button
        variant="outline"
        onClick={() => onPageChange(prevPage)}
        disabled={!prevPage}
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      <span className="px-4 text-sm">
        {currentPage} / {pageCount}
      </span>

      <Button
        variant="outline"
        onClick={() => onPageChange(nextPage)}
        disabled={!nextPage}
      >
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default Pagination;
