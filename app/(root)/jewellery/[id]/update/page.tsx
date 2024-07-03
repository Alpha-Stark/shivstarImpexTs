import ProductForm from "@/Components/ProductForm";
import { getProductById } from "@/lib/actions/product.action";
import { auth } from "@clerk/nextjs/server";
import React from "react";

type UpdateProductProps = {
    params: {
        id: string
    }
}

const UpdateProduct = async ({ params: { id } }: UpdateProductProps) => {
    // const { sessionClaims } = auth();
    // const userId = sessionClaims?.userId as string; //added question mark because it was showing error that "sessionClaims can be null"
    const product = await getProductById(id);

    return (
        <>
            <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                <h3 className="wrapper h3-bold text-center sm:text-left">Update Product</h3>
            </section>
            <div className="wrapper my-8">
                <ProductForm type="Update" product={product} productId={product._id} />
            </div>
        </>
    );
};

export default UpdateProduct;
