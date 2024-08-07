import Collection from "./Collection";
import { getAllProducts } from "@/lib/actions/product.action";
import Search from "./Search";


type Product = {
    _id: string,
    name: string,
    description: string,
    price: number,
    fluorescence: string,
    photo: string,
    colorFrom: string,
    colorTo: string,
    clarityFrom: string,
    clarityTo: string,
    cut: string,
    shape: string,
    certificate: string,
}

// async function AllProducts({ userType, searchParams }: { userType: string, searchParams: SearchParamProps }) {
async function AllProducts({ userType, data }: { userType: string, data: Product[] }) {
    /*  const page = Number(searchParams?.page) || 1;
     const searchText = (searchParams?.query as string) || ''; */

    let isOwner: boolean = false;
    if (userType === "owner") isOwner = true;
    // console.log(isOwner)


    /*const products = await getAllProducts();

     const products = await getAllProductsPag({
        query: searchText,
        page,
        limit: 6
    }); */

    return (
        <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12 mt-10">
            <Collection data={data} isOwner={isOwner} />
        </section>
    );
}

export default AllProducts;
