import React from 'react';
import Card from './Card';
import styles from "@/style/Collection.module.css"

type Product = {
    _id: string,
    name: string,
    description: string,
    price: number,
    fluorescence: string,
    photo: string,
    colorFrom: string,
    colorTo: string,
    clarityFrom: string,
    clarityTo: string,
    cut: string,
    shape: string,
    certificate: string,
}

const Collection = ({ data, isOwner }: { data: Product[], isOwner: boolean }) => {
    const emptyTitle = "No Products Available";
    const emptyStateSubtext = "Please check back later for new products.";
    return (
        <>
            {data.length > 0 ? (
                <div className={styles.collectionContainer}>
                    <ul className={styles.productGrid}>
                        {data.map((product) => (
                            <li key={product._id} className='flex justify-center'>
                                <Card product={product} isOwner={isOwner} />
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className={styles.emptyState}>
                    <h3 className={styles.emptyTitle}>{emptyTitle}</h3>
                    <p className={styles.emptySubtext}>{emptyStateSubtext}</p>
                </div>
            )}
        </>
    );
}

export default Collection;
