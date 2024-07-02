"use client";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from '@/style/Search.module.css';

const Search = ({ placeholder = 'Search products by name...' }: { placeholder?: string }) => {
    const [query, setQuery] = useState('');
    const searchParams = useSearchParams() ?? new URLSearchParams();
    const router = useRouter();

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            let newUrl = '';
            if (query) {
                newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: 'query',
                    value: query,
                });
            } else {
                newUrl = removeKeysFromQuery({
                    params: searchParams.toString(),
                    keysToRemove: ['query'],
                });
            }

            router.push(newUrl, { scroll: false });
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [query, searchParams, router]);

    return (
        <div className={styles.searchContainer}>
            <Image src="/assets/icons/search.svg" alt="search" width={24} height={24} className={styles.searchIcon} />
            <input
                type="text"
                placeholder={placeholder}
                onChange={(e) => setQuery(e.target.value)}
                className={styles.searchInput}
            />
        </div>
    );
};

export default Search;
