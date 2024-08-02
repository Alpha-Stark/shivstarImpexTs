'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../style/JewelleryDetails.module.css';

const JewelleryDetail = ({ product }: { product: any }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <section className={styles.sectionContainer}>
            <div className={styles.gridContainer}>
                <Image
                    src={product.photo}
                    alt='Product Image'
                    width={1000}
                    height={1000}
                    className={styles.productImage}
                />

                <div className={styles.detailsContainer}>
                    <h2 className={styles.productName}>{product.name}</h2>

                    <div className="flex flex-wrap gap-4 items-center">
                        <p className={styles.priceTag}>
                            ${product.price}
                        </p>
                    </div>

                    {product.description && (
                        <div className="flex flex-col gap-2">
                            <p className={styles.textExtraLarge}>Description:</p>
                            <p className={styles.whitespacePreLine}>{product.description}</p>
                        </div>
                    )}

                    {product.diamondDescription && (
                        <div className="flex flex-col gap-2">
                            <p className={styles.textExtraLarge}>Diamonds:</p>
                            <p className={styles.whitespacePreLine}>{product.diamondDescription}</p>
                        </div>
                    )}

                    {product.materialDescription && (
                        <div className="flex flex-col gap-2">
                            <p className={styles.textExtraLarge}>Materials:</p>
                            <p className={styles.whitespacePreLine}>{product.materialDescription}</p>
                        </div>
                    )}

                    {product.material && (
                        <div className="flex flex-col gap-2">
                            <p className={styles.textLarge}>
                                <span className={styles.textExtraLarge}>Material: </span>
                                {product.material}
                            </p>
                        </div>
                    )}

                    {product.certificate && (
                        <div className="flex flex-col gap-2">
                            <p className={styles.textLarge}>
                                <span className={styles.textExtraLarge}>Certificate: </span>
                                {product.certificate}
                            </p>
                        </div>
                    )}

                    <button
                        className={styles.inquireButton}
                        onClick={openModal}
                    >
                        Inquire about this product
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContainer}>
                        <div className={styles.modalContent}>
                            <div className={styles.modalHeader}>
                                <h3 className={styles.modalTitle}>
                                    Inquire about {product.name}
                                </h3>
                            </div>
                            <div className={styles.modalBody}>
                                <p>
                                    Call us at <strong>+91 84696 29836</strong> to inquire or purchase this product.
                                </p>
                            </div>
                            <div className={styles.modalFooter}>
                                <button
                                    type="button"
                                    className={styles.closeButton}
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default JewelleryDetail;
