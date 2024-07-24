import JewelleryCollection from "./JewelleryCollection";


type Jewellery = {
    _id: string;
    name: string;
    description: string;
    price: number;
    photo: string;
    diamondDescription: String,
    materialDescription: String,
    material: string;
    certificate: string;
};

// async function AllProducts({ userType, searchParams }: { userType: string, searchParams: SearchParamProps }) {
async function AllJewellerys({ userType, data }: { userType: string, data: Jewellery[] }) {

    let isOwner: boolean = false;
    if (userType === "owner") isOwner = true;
    // console.log(isOwner)

    return (
        <section id="jewellery" className="wrapper my-8 flex flex-col gap-8 md:gap-12 mt-10">
            <JewelleryCollection data={data} isOwner={isOwner} />
        </section>
    );
}

export default AllJewellerys;
