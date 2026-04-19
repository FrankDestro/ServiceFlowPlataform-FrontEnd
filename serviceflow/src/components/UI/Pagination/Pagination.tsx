import React, { type JSX, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./Pagination.css";

interface PaginationProps {
  totalItems: number;
  itemsPerPageOptions?: number[];
  initialPage?: number;
  selectedSize?: number;
  onPageSizeChange?: (newSize: number) => void;
  onPageChange?: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPageOptions = [10, 20, 50],
  initialPage = 1,
  selectedSize,
  onPageSizeChange,
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(
    selectedSize || itemsPerPageOptions[0]
  );

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      onPageChange?.(page - 1); // backend zero-based
    }
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newSize = Number(e.target.value);
    setItemsPerPage(newSize);
    setCurrentPage(1);
    onPageSizeChange?.(newSize);
  };

  const renderPageNumbers = () => {
    const pages: JSX.Element[] = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`page-number ${i === currentPage ? "active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="pagination-container">
      <div className="pagination-controls">
        {/* Página anterior */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Página anterior"
        >
          <ChevronLeft size={20} />
         <span>Anterior</span>
        </button>

        {renderPageNumbers()}

        {/* Próxima página */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Próxima página"
        >
          <ChevronRight size={20}/>
         <span>Anterior</span>
        </button>
      </div>

      <div className="items-per-page">
        <label>Itens por página</label>
        <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
          {itemsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Pagination;

