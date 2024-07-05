import React from 'react';
import styles from '@/style/FloatingButton.module.css';
import Link from 'next/link';

const FloatingButton = ({ path }: { path: string }) => {
    return (
        // make a button which redirects to some route
        <Link href={path} className={styles.floatingButton}>
            +
        </Link>

    );
};

export default FloatingButton;
