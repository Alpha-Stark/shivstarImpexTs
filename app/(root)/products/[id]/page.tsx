import ProductDetails from '@/Components/ProductDetail';
import { getProductById } from '@/lib/actions/product.action';
import { SearchParamProps } from '@/types';


const ProductPage = async ({ params: { id }, searchParams }: SearchParamProps) => {
    const product = await getProductById(id);

    return <ProductDetails product={product} />;
};

export default ProductPage;
