import { getUserByClerkId } from "@/lib/actions/user.action";
import AllProducts from "@/Components/AllProducts";
import { currentUser } from "@clerk/nextjs/server";
import { SignInButton } from "@clerk/nextjs";
import { getAllProductsPag } from "@/lib/actions/product.action";
import Pagination from "@/Components/Pagination";

type Product = {
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

type Props = {
    searchParams: { page: string };
};


async function products({ searchParams }: Props) {
    const page = parseInt(searchParams.page) || 1;
    // const { data, totalPages } = await getAllProductsPag({ query: '', limit: 8, page });
    const res = await getAllProductsPag({ query: "", limit: 8, page }) as { data: Product[], totalPages: number };
    const data = res.data;
    const totalPages = res.totalPages;

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
        <>
            <AllProducts userType={userType} data={data} />
            <Pagination currentPage={page} totalPages={totalPages} />
        </>
    );
}

export default products;
