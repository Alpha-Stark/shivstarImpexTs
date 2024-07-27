'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './ProductDetailsContent.module.css';

const ProductDetails = ({ product }: { product: any }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <section className={styles.productDetailsContainer}>
            <div className={styles.productGrid}>
                <Image
                    src={product.photo}
                    alt='Product Image'
                    width={1000}
                    height={1000}
                    className={styles.productImage}
                />

                <div className={styles.productInfo}>
                    <h2 className={styles.productName}>{product.name}</h2>

                    <div className={styles.priceContainer}>
                        <p className={styles.productPrice}>
                            {`$${product.price}`}
                        </p>
                    </div>

                    {product.description && (
                        <div className="flex flex-col gap-2">
                            <p className="text-xl font-bold text-gray-600">Description:</p>
                            <p className="text-lg whitespace-pre-line">{product.description}</p>
                        </div>
                    )}

                    <div className="flex flex-col gap-2">
                        {product.clarityFrom && (
                            <p className="text-lg font-medium">
                                <span className="text-xl font-bold text-gray-600">Clarity: </span>
                                <span className="text-primary-500 font-semibold">
                                    {product.clarityFrom} {product.clarityTo && `- ${product.clarityTo}`}
                                </span>
                            </p>
                        )}
                        {(product.colorFrom || product.colorTo) && (
                            <p className="text-lg font-medium">
                                <span className="text-xl font-bold text-gray-600">Color: </span>
                                {product.colorFrom && `${product.colorFrom}`} {product.colorTo && `- ${product.colorTo}`}
                            </p>
                        )}
                        {product.shape && (
                            <>
                                <p className="text-lg font-medium">
                                    <span className="text-xl font-bold text-gray-600">Shape: </span>
                                    {product.shape}
                                </p>
                                <p className="text-lg font-medium">
                                    <span className="text-xl font-bold text-gray-600">Cut: </span>
                                    {product.cut}
                                </p>
                            </>
                        )}
                        {product.fluorescence && (
                            <p className="text-lg font-medium">
                                <span className="text-xl font-bold text-gray-600">Fluorescence: </span>
                                {product.fluorescence}
                            </p>
                        )}
                    </div>

                    {product.certificate && (
                        <div className="flex flex-col gap-2">
                            <p className='text-lg'>
                                <span className="text-xl font-bold text-gray-600">Certificate: </span>
                                {product.certificate}
                            </p>
                        </div>
                    )}

                    <button
                        className={styles.inquiryButton}
                        onClick={openModal}
                    >
                        Inquire about this product
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <div className={styles.modalBackground}>
                    <div className={styles.modalCenter}>
                        <div className={styles.modalOverlay} aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className={styles.modalContent}>
                            <div className={styles.modalHeader}>
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className={styles.modalTitle}>
                                            Inquire about {product.name}
                                        </h3>
                                        <div className={styles.modalBody}>
                                            <p className={styles.modalText}>
                                                Call us at <strong>1-800-123-4567</strong> to inquire or purchase this product.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.modalFooter}>
                                <button
                                    type="button"
                                    className={styles.modalCloseButton}
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

export default ProductDetails;
