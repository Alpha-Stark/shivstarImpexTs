import { auth, currentUser } from "@clerk/nextjs/server";
import React from "react";
import JewelleryForm from "@/Components/JewelleryForm";
import { SignInButton } from "@clerk/nextjs";
import { getUserByClerkId } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";

const createEvent = async () => {
    /* const { sessionClaims } = auth();
    const userId = sessionClaims?.userId; //added question mark because it was showing error that "sessionClaims can be null"
    // We must not forget to add the userId to the clerk metadata, to actually reterive it as we are doing in the above line. And to do it we need to customize the clerk session token. Docs: https://clerk.com/docs/backend-requests/making/custom-session-token => {"userId": "{{user.public_metadata.userId}}"}
 */

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
        redirect("/jewellery");
    }

    return (
        <>
            <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10 flex justify-center items-center pt-20">
                <h3 className="h3-bold text-center sm:text-left">Create Product</h3>
            </section>

            <div className="container mx-auto px-4 my-8">
                <JewelleryForm type="Create" />
            </div>
        </>
    );


};

export default createEvent;
