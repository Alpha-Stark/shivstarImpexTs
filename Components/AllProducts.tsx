import Collection from "./Collection";
import { getAllProducts } from "@/lib/actions/product.action";
import Search from "./Search";

/* interface Product {
    id: string;
    avatar: string;
    brand: string;
    about: string;
    price: string;
} */

/* type SearchParamProps = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
} */

// async function AllProducts({ userType, searchParams }: { userType: string, searchParams: SearchParamProps }) {
async function AllProducts({ userType }: { userType: string }) {
    /*  const page = Number(searchParams?.page) || 1;
     const searchText = (searchParams?.query as string) || ''; */

    let isOwner: boolean = false;
    if (userType === "owner") isOwner = true;
    console.log(isOwner)


    const products = await getAllProducts();

    /* const products = await getAllProductsPag({
        query: searchText,
        page,
        limit: 6
    }); */

    return (
        <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12 mt-10">
            {/* <div className="flex w-full flex-col gap-5 md-flex-row">
                <Search />
            </div> */}
            <Collection data={products} isOwner={isOwner} />

            {/* <Collection
                data={products}
                emptyTitle="No Products Available"
                emptyStateSubtext="Please check back later for new products."
                limit={10}
                page={1}
                totalPages={Math.ceil(products?.length / 10)}
            /> */}
        </section>
    );
}

export default AllProducts;
