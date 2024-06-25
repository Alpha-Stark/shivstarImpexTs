import { getUserByClerkId } from "@/lib/actions/user.action";
import AllProducts from "@/Components/AllProducts";
import { currentUser } from "@clerk/nextjs/server";
import { SignInButton } from "@clerk/nextjs";

interface Product {
    avatar: string;
    brand: string;
    about: string;
    price: string;
}


async function products() {

    const user = await currentUser();
    if (!user) {
        return <SignInButton />;
    }
    const clerkId = user.id;
    // console.log(clerkId);


    // Function to fetch user type

    const fetchUserType = async () => {
        try {
            const userDetails = await getUserByClerkId(clerkId);
            // console.log(userDetails);
            return userDetails.userType;
        } catch (err) {
            console.error("Failed to fetch user type", err);
        }
    };

    let userType = await fetchUserType();


    return (
        <AllProducts userType={userType} />
    );
}

export default products;
