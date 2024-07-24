"use client";

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from "@/style/Card.module.css";
import { DeleteJewelleryConformation } from './DeleteJewelleryConformation';

type jewelleryCardProps = {
    product: {
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
    isOwner: boolean;
};

const JewelleryCard = ({ product, isOwner }: jewelleryCardProps) => {
    const router = useRouter();

    const handleCardClick = () => {
        router.push(`/jewellery/${product._id}`);
    };

    return (
        <div className={styles.card}>
            <div
                style={{ backgroundImage: `url(${product.photo})` }}
                className={styles.cardLink}
                onClick={handleCardClick}
                role="button"
            />
            {isOwner && (
                <div className={styles.cardActions}>
                    <Link href={`/jewellery/${product._id}/update`} onClick={(e) => e.stopPropagation()}>
                        <Image
                            src="/assets/icons/edit.svg"
                            alt='edit'
                            width={20}
                            height={20}
                        />
                    </Link>
                    <div onClick={(e) => e.stopPropagation()}>
                        <DeleteJewelleryConformation productId={product._id} /> {/*  */}
                    </div>
                </div>
            )}
            <div className={styles.cardContent} onClick={handleCardClick} role="button">
                <div className={styles.priceContainer}>
                    <span className={styles.cardPrice}>
                        ${product.price}
                    </span>
                </div>
                <p className={styles.cardName}>{product.name}</p>
                <p className={styles.cardDescription}>{product.description}</p>
                <div className={styles.cardAttributes}>
                    {/* {product.carat && (
                        <p><strong>Carat:</strong> {product.carat}</p>
                    )}
                    {product.weight && (
                        <p><strong>Weight:</strong> {product.weight}</p>
                    )}
                    {product.width && (
                        <p><strong>Width:</strong> {product.width}</p>
                    )}
                    {product.height && (
                        <p><strong>Height:</strong> {product.height}</p>
                    )} */}
                </div>
            </div>
        </div>
    );
}

export default JewelleryCard;
