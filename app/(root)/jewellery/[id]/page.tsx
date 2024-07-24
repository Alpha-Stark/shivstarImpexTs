import JewelleryDetail from '@/Components/JewelleryDetail';
import { getJewelleryById } from '@/lib/actions/jewellery.action';
import { SearchParamProps } from '@/types';
import Image from 'next/image';


const ProductDetails = async ({ params: { id }, searchParams }: SearchParamProps) => {
    const product = await getJewelleryById(id);

    return (
        <JewelleryDetail product={product} />
    );
};

export default ProductDetails;
