"use client";

import Card from './Card';
import styles from "@/style/Collection.module.css";
import JewelleryCard from './JewelleryCard';

type Jewellery = {
    _id: string;
    name: string;
    description: string;
    price: number;
    photo: string;
    diamondDescription: String,
    materialDescription: String,
    material: string;
    certificate: string;
};

const JewelleryCollection = ({ data, isOwner }: { data: Jewellery[], isOwner: boolean }) => {
    const emptyTitle = "No Products Available";
    const emptyStateSubtext = "Please check back later for new products.";

    return (
        <>
            {data.length > 0 ? (
                <div className={styles.collectionContainer}>
                    <ul className={styles.productGrid}>
                        {data.map((product) => (
                            <li key={product._id} className={styles.productItem}>
                                <JewelleryCard product={product} isOwner={isOwner} />
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

export default JewelleryCollection;
