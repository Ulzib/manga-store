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
        className="w-7 h-7 md:w-9 md:h-9"
      >
        <ChevronLeft className="w-5 h-5 text-black" />
      </Button>

      <span className="px-4 text-[12px] md:text-sm text-white">
        {currentPage} / {pageCount}
      </span>

      <Button
        variant="outline"
        onClick={() => onPageChange(nextPage)}
        disabled={!nextPage}
        className="w-7 h-7 md:w-9 md:h-9 "
      >
        <ChevronRight className="w-5 h-5 text-black" />
      </Button>
    </div>
  );
};

export default Pagination;
