import { getUserByClerkId } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs/server";
import { SignInButton } from "@clerk/nextjs";
import { getAllProductsPag } from "@/lib/actions/product.action";
import Pagination from "@/Components/Pagination";
import Search from "@/Components/Search";
import styles from "@/style/productRoutePage.module.css";
import AllJewellerys from "@/Components/AllJewellerys";
import { getAllJewelleryPag } from "@/lib/actions/jewellery.action";

type Jewellery = {
    _id: string;
    name: string;
    description: string;
    price: number;
    photo: string;
    height: string;
    width: string;
    carat: string;
    weight: string;
    material: string;
    certificate: string;
};

type Props = {
    searchParams: { page: string, query: string };
};

async function products({ searchParams }: Props) {
    const page = parseInt(searchParams.page) || 1;
    const query = searchParams.query || '';
    const res = await getAllJewelleryPag({ query, limit: 8, page }) as { data: Jewellery[], totalPages: number };
    const data = res.data;
    const totalPages = res.totalPages;

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

    return (
        <>
            <div className={styles.heading}>
                <h1>Jewellery Catalog</h1>
                <Search placeholder="Search Jewellery by name..." />
            </div>
            <AllJewellerys userType={userType} data={data} />
            <Pagination currentPage={page} totalPages={totalPages} />
        </>
    );
}

export default products;
