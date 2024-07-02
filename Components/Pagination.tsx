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

    return (
        <div className={styles.pagination}>
            {currentPage > 1 && (
                <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
            )}
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={currentPage === index + 1 ? styles.active : ""}
                >
                    {index + 1}
                </button>
            ))}
            {currentPage < totalPages && (
                <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
            )}
        </div>
    );
};

export default Pagination;
