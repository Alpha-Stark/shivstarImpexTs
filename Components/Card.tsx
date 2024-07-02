"use client";

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { DeleteConfirmation } from './DeleteConfirmation';
import styles from "@/style/Card.module.css";

type cardProps = {
    product: {
        _id: string;
        name: string;
        description: string;
        price: number;
        photo: string;
        colorFrom: string;
        colorTo: string;
        clarityFrom: string;
        clarityTo: string;
        cut: string;
        fluorescence: string;
        shape: string;
        certificate: string;
    };
    isOwner: boolean;
};

const Card = ({ product, isOwner }: cardProps) => {
    const router = useRouter();

    const handleCardClick = () => {
        router.push(`/products/${product._id}`);
    };

    return (
        <div className={styles.card} onClick={handleCardClick} role="button">
            <div
                style={{ backgroundImage: `url(${product.photo})` }}
                className={styles.cardLink}
            />
            {isOwner && (
                <div className={styles.cardActions}>
                    <Link href={`/products/${product._id}/update`}>
                        <Image
                            src="/assets/icons/edit.svg"
                            alt='edit'
                            width={20}
                            height={20}
                        />
                    </Link>
                    <DeleteConfirmation productId={product._id} />
                </div>
            )}
            <div className={styles.cardContent}>
                <div className={styles.priceContainer}>
                    <span className={styles.cardPrice}>
                        ${product.price}
                    </span>
                </div>
                <p className={styles.cardName}>{product.name}</p>
                <p className={styles.cardDescription}>{product.description}</p>
                <div className={styles.cardAttributes}>
                    {product.colorFrom && (
                        <p><strong>Color:</strong> {product.colorFrom} {product.colorTo && `- ${product.colorTo}`}</p>
                    )}
                    {product.clarityFrom && (
                        <p><strong>Clarity:</strong> {product.clarityFrom} {product.clarityTo && `- ${product.clarityTo}`}</p>
                    )}
                    {product.cut && (
                        <p><strong>Cut:</strong> {product.cut}</p>
                    )}
                    {product.shape && (
                        <p><strong>Shape:</strong> {product.shape}</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Card;
