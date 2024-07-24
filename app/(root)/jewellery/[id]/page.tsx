import { getJewelleryById } from '@/lib/actions/jewellery.action';
import { SearchParamProps } from '@/types';
import Image from 'next/image';
import React from 'react';

const ProductDetails = async ({ params: { id }, searchParams }: SearchParamProps) => {
    const product = await getJewelleryById(id);

    return (
        <>
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

                        {product.diamondDescription && (
                            <div className="flex flex-col gap-2">
                                <p className="text-xl font-bold text-gray-600">Diamonds:</p>
                                <p className="text-lg whitespace-pre-line">{product.diamondDescription}</p>
                            </div>
                        )}

                        {product.materialDescription && (
                            <div className="flex flex-col gap-2">
                                <p className="text-xl font-bold text-gray-600">Materials:</p>
                                <p className="text-lg whitespace-pre-line">{product.materialDescription}</p>
                            </div>
                        )}

                        {product.material && (
                            <div className="flex flex-col gap-2">
                                <p className="text-lg font-medium">
                                    <span className="text-xl font-bold text-gray-600">Material: </span>
                                    {product.material}
                                </p>
                            </div>
                        )}

                        {product.certificate && (
                            <div className="flex flex-col gap-2">
                                <p className='text-lg'>
                                    <span className="text-xl font-bold text-gray-600">Certificate: </span>
                                    {product.certificate}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProductDetails;
