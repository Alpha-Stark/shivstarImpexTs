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

    /* 
        const products = [
            {
                id: "1",
                avatar: "https://gem-garden-jewelry-store.vercel.app/static/media/card5.471f0f73c03a3ce42177.png",
                brand: "Messika",
                about: "White Gold Diamond Ring.",
                price: "$1.390",
            },
            {
                id: "2",
                avatar: "https://gem-garden-jewelry-store.vercel.app/static/media/card6.cdfc389c353e0a1a95c5.png",
                brand: "Tiffani",
                about: "Silver Necklace.",
                price: "$750",
            },
            {
                id: "3",
                avatar: "https://gem-garden-jewelry-store.vercel.app/static/media/card7.3abfa35a89cf47b097ae.png",
                brand: "Bulgari",
                about: "White Gold Diamond Earring.",
                price: "$7.250",
            },
            {
                id: "1",
                avatar: "https://mygemma.com/cdn/shop/products/122588-fv_1200x.jpg?v=1659050494",
                brand: "Cartier",
                about: "White Gold Ring.",
                price: "$1.950",
            }
        ];
     */

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
