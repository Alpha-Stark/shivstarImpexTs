"use client";

import { useRouter } from 'next/navigation';
import styles from "@/style/Pagination.module.css";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
};

const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
    const router = useRouter();

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            router.push(`/products?page=${page}`);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxPageNumbersToShow = 5;

        if (totalPages <= maxPageNumbersToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            let startPage = Math.max(1, currentPage - 2);
            let endPage = Math.min(totalPages, currentPage + 2);

            if (startPage === 1) {
                endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);
            } else if (endPage === totalPages) {
                startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
            }

            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }

            if (startPage > 1) {
                pageNumbers.unshift("...");
                pageNumbers.unshift(1);
            }

            if (endPage < totalPages) {
                pageNumbers.push("...");
                pageNumbers.push(totalPages);
            }
        }

        return pageNumbers;
    };

    return (
        <div className={styles.pagination}>
            {currentPage > 1 && (
                <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
            )}
            {renderPageNumbers().map((page, index) =>
                typeof page === "number" ? (
                    <button
                        key={index}
                        onClick={() => handlePageChange(page)}
                        className={currentPage === page ? styles.active : ""}
                    >
                        {page}
                    </button>
                ) : (
                    <span key={index} className={styles.ellipsis}>
                        {page}
                    </span>
                )
            )}
            {currentPage < totalPages && (
                <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
            )}
        </div>
    );
};

export default Pagination;
