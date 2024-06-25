import { formatDateTime } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { DeleteConfirmation } from './DeleteConfirmation'

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
}

const Card = ({ product, isOwner }: cardProps) => {

    return (
        <div className='group relative flex flex-col min-h-[380px] w-full max-w-[400px] overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]'>
            <Link href={`/products/${product._id}`} className='flex-grow'>
                <div
                    className='h-64 bg-cover bg-center'
                    style={{ backgroundImage: `url(${product.photo})` }}
                />
            </Link>

            {/* IS OWNER */}
            {isOwner && (
                <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
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

            <div className='flex flex-col gap-3 p-5'>
                <div className="flex gap-2">
                    <span className="text-lg font-semibold bg-green-100 px-4 py-1 text-green-600 rounded">
                        ₹{product.price}
                    </span>
                </div>

                <Link href={`/products/${product._id}`}>
                    <h3 className="text-xl font-bold text-black">
                        {product.name}
                    </h3>
                </Link>

                <p className="text-grey-600 line-clamp-3">
                    {product.description}
                </p>

                <div className="grid grid-cols-2 gap-4 text-grey-700">
                    {product.colorFrom && (
                        <p>
                            <strong>Color:</strong> {product.colorFrom} {product.colorTo && `- ${product.colorTo}`}
                        </p>
                    )}
                    {product.clarityFrom && (
                        <p>
                            <strong>Clarity:</strong> {product.clarityFrom} {product.clarityTo && `- ${product.clarityTo}`}
                        </p>
                    )}
                    {product.cut && (
                        <p>
                            <strong>Cut:</strong> {product.cut}
                        </p>
                    )}
                    {product.shape && (
                        <p>
                            <strong>Shape:</strong> {product.shape}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Card