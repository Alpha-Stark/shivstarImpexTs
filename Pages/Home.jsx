import React from "react";
import { MainPagemainComponent } from "../Components/MainPage-mainComponent";
import { NewCollection } from "../Components/NewCollection";
import { CategoriesSection } from "../Components/CategoriesSection";
import { Gifts } from "../Components/Gifts";
import Bestseller from "../Components/Bestseller";
import Abouts from "../Components/Abouts";
import Footer from "../Components/Footer";

export const Home = () => {
    const fetchUser = async () => {
        const userDetails = await User.find({ clerkId: userId });
        console.log(userDetails);
    };
    fetchUser();
    return (
        <>
            <MainPagemainComponent />
            <NewCollection />
            <CategoriesSection />
            <Bestseller />
            <Gifts />
            <Abouts />
        </>
    );
};
