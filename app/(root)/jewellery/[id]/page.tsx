// import CheckoutButton from '@/components/shared/CheckoutButton';
// import Collection from '@/components/shared/Collection';
// import { getEventById, getRelatedEventsByCategory } from '@/lib/actions/event.action';
import { getProductById } from '@/lib/actions/product.action';
import { SearchParamProps } from '@/types';
import Image from 'next/image';

const ProductDetails = async ({ params: { id }, searchParams }: SearchParamProps) => {
    const product = await getProductById(id);
    /* const relatedEvents = await getRelatedEventsByCategory({
        categoryId: event.category._id,
        eventId: event._id,
        page: searchParams.page as string
    }) */
    // console.log(product)

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

                        <div className="flex flex-col gap-2">
                            {product.clarityFrom && (
                                <p className="text-lg font-medium">
                                    <span className="text-xl font-bold text-gray-600">Clarity: </span>
                                    <span className="text-primary-500 font-semibold">{product.clarityFrom} {product.clarityTo && `- ${product.clarityTo}`}</span>
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

                        {/* {product.stock && (
                            <p className="text-lg font-medium">
                                <span className="text-xl font-bold text-gray-600">Stock: </span>
                                {product.stock}
                            </p>
                        )} */}

                        {product.description && (
                            <div className="flex flex-col gap-2">
                                <p className="text-xl font-bold text-gray-600">Description:</p>
                                <p className="text-lg">{product.description}</p>
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

                        <div className="flex flex-wrap gap-4 items-center">
                            <p className='text-2xl font-semibold bg-green-100 px-5 py-2 text-green-700 rounded'>
                                {`$${product.price}`}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProductDetails