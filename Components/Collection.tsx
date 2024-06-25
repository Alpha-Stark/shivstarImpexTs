import React from 'react';
import Card from './Card';
// import Pagination from './Pagination';

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


/* type CollectionProps = {
    data: Product[],
    emptyTitle: string,
    emptyStateSubtext: string,
    limit: number,
    page: number | string,
    totalPages?: number,
    urlParamName?: string
} */

const Collection = ({ data, isOwner }: { data: Product[], isOwner: boolean }) => {
    const emptyTitle = "No Products Available";
    const emptyStateSubtext = "Please check back later for new products.";
    return (
        <>
            {data.length > 0 ? (
                <div className='flex flex-col items-center gap-10'>
                    <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 xl:gap-10">
                        {data.map((product) => (
                            <li key={product._id} className='flex justify-center'>
                                <Card product={product} isOwner={isOwner} />
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className='flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center'>
                    <h3 className='p-bold-20 md:h5-bold'>{emptyTitle}</h3>
                    <p className='p-regular-14'>{emptyStateSubtext}</p>
                </div>
            )}
        </>
    );
}


export default Collection;
