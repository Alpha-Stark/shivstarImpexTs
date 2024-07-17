"use client";
import Abouts from "@/Components/Abouts";
import Bestseller from "@/Components/Bestseller";
import { CategoriesSection } from "@/Components/CategoriesSection";
import { Gifts } from "@/Components/Gifts";
import { MainPageMainComponent } from "@/Components/MainPage-mainComponent";

import { NewCollection } from "@/Components/NewCollection";

export default function Home() {
    return (
        <>
            <MainPageMainComponent />
            <NewCollection />
            <CategoriesSection />
            {/* <Bestseller /> */}
            <Gifts />
            <Abouts />
        </>
    );
}
