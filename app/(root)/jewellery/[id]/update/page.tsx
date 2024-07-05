import JewelleryForm from "@/Components/JewelleryForm";
import ProductForm from "@/Components/ProductForm";
import { getJewelleryById } from "@/lib/actions/jewellery.action";
import { getProductById } from "@/lib/actions/product.action";
import { getUserByClerkId } from "@/lib/actions/user.action";
import { SignInButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

type UpdateProductProps = {
    params: {
        id: string
    }
}

const UpdateProduct = async ({ params: { id } }: UpdateProductProps) => {
    // const { sessionClaims } = auth();
    // const userId = sessionClaims?.userId as string; //added question mark because it was showing error that "sessionClaims can be null"
    const jewellery = await getJewelleryById(id);

    const user = await currentUser();
    if (!user) {
        return <SignInButton />;
    }
    const clerkId = user.id;

    const fetchUserType = async () => {
        try {
            const userDetails = await getUserByClerkId(clerkId);
            return userDetails.userType;
        } catch (err) {
            console.error("Failed to fetch user type", err);
        }
    };

    let userType = await fetchUserType();
    if (userType === "user") {
        redirect(`/jewellery/${jewellery._id}`);
    }

    return (
        <>
            <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                <h3 className="wrapper h3-bold text-center sm:text-left">Update Jewellery Description</h3>
            </section>
            <div className="wrapper my-8">
                <JewelleryForm type="Update" jewellery={jewellery} jewelleryId={jewellery._id} />
            </div>
        </>
    );
};

export default UpdateProduct;
