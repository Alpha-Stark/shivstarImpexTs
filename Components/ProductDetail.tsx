'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const ProductDetails = ({ product }: { product: any }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <section className='flex justify-center bg-primary-50 bg-dotted-pattern bg-contain'>
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl gap-8 p-5 md:p-10">
                <Image
                    src={product.photo}
                    alt='Product Image'
                    width={1000}
                    height={1000}
                    className='h-full min-h-[300px] object-cover object-center rounded-lg shadow-md'
                />

                <div className="flex w-full flex-col gap-6 p-5">
                    <h2 className='text-3xl font-bold'>{product.name}</h2>

                    <div className="flex flex-wrap gap-4 items-center">
                        <p className='text-2xl font-semibold bg-green-100 px-5 py-2 text-green-700 rounded'>
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
                        className='mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75'
                        onClick={openModal}
                    >
                        Inquire about this product
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                                            Inquire about {product.name}
                                        </h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Call us at <strong>+91 84696 29836</strong> to inquire or purchase this product.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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