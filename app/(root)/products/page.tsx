"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

interface Product {
    avatar: string;
    brand: string;
    about: string;
    price: string;
}

function AllProducts() {
    const [data, setData] = useState<Product[]>([]);
    const [page, setPage] = useState(1);
    const [Loading, setLoading] = useState(false);
    const [Err, setErr] = useState(false);

    // fetch data function to fetch data from the mongodb database
    const products: Product[] = [
        {
            avatar: "https://gem-garden-jewelry-store.vercel.app/static/media/card5.471f0f73c03a3ce42177.png",
            brand: "Messika",
            about: "White Gold Diamond Ring.",
            price: "$1.390",
        },
        {
            avatar: "https://gem-garden-jewelry-store.vercel.app/static/media/card6.cdfc389c353e0a1a95c5.png",
            brand: "Tiffani",
            about: "Silver Necklace.",
            price: "$750",
        },
        {
            avatar: "https://gem-garden-jewelry-store.vercel.app/static/media/card7.3abfa35a89cf47b097ae.png",
            brand: "Bulgari",
            about: "White Gold Diamond Earring.",
            price: "$7.250",
        },
        {
            avatar: "https://mygemma.com/cdn/shop/products/122588-fv_1200x.jpg?v=1659050494",
            brand: "Cartier",
            about: "White Gold Ring.",
            price: "$1.950",
        },
        {
            avatar: "https://mygemma.com/cdn/shop/products/122588-fv_1200x.jpg?v=1659050494",
            brand: "Cartier",
            about: "White Gold Ring.",
            price: "$1.950",
        },
        {
            avatar: "https://mygemma.com/cdn/shop/products/122588-fv_1200x.jpg?v=1659050494",
            brand: "Cartier",
            about: "White Gold Ring.",
            price: "$1.950",
        },
        {
            avatar: "https://mygemma.com/cdn/shop/products/122588-fv_1200x.jpg?v=1659050494",
            brand: "Cartier",
            about: "White Gold Ring.",
            price: "$1.950",
        },
        {
            avatar: "https://mygemma.com/cdn/shop/products/122588-fv_1200x.jpg?v=1659050494",
            brand: "Cartier",
            about: "White Gold Ring.",
            price: "$1.950",
        },
        {
            avatar: "https://mygemma.com/cdn/shop/products/122588-fv_1200x.jpg?v=1659050494",
            brand: "Cartier",
            about: "White Gold Ring.",
            price: "$1.950",
        },
        {
            avatar: "https://mygemma.com/cdn/shop/products/122588-fv_1200x.jpg?v=1659050494",
            brand: "Cartier",
            about: "White Gold Ring.",
            price: "$1.950",
        },
        {
            avatar: "https://mygemma.com/cdn/shop/products/122588-fv_1200x.jpg?v=1659050494",
            brand: "Cartier",
            about: "White Gold Ring.",
            price: "$1.950",
        },
        {
            avatar: "https://mygemma.com/cdn/shop/products/122588-fv_1200x.jpg?v=1659050494",
            brand: "Cartier",
            about: "White Gold Ring.",
            price: "$1.950",
        },
        {
            avatar: "https://mygemma.com/cdn/shop/products/122588-fv_1200x.jpg?v=1659050494",
            brand: "Cartier",
            about: "White Gold Ring.",
            price: "$1.950",
        },
        {
            avatar: "https://mygemma.com/cdn/shop/products/122588-fv_1200x.jpg?v=1659050494",
            brand: "Cartier",
            about: "White Gold Ring.",
            price: "$1.950",
        },
        {
            avatar: "https://mygemma.com/cdn/shop/products/122588-fv_1200x.jpg?v=1659050494",
            brand: "Cartier",
            about: "White Gold Ring.",
            price: "$1.950",
        },
        {
            avatar: "https://mygemma.com/cdn/shop/products/122588-fv_1200x.jpg?v=1659050494",
            brand: "Cartier",
            about: "White Gold Ring.",
            price: "$1.950",
        },
        {
            avatar: "https://mygemma.com/cdn/shop/products/122588-fv_1200x.jpg?v=1659050494",
            brand: "Cartier",
            about: "White Gold Ring.",
            price: "$1.950",
        },
    ];

    const fetchrender = async () => {
        setLoading(true);
        try {
            // let res = await fetch(`https://traveller-jt36.onrender.com/jewellery?_page=${page}&_limit=12`);
            // let result = await res.json();

            let res = axios.get("https://traveller-jt36.onrender.com/jewellery?_page=1&_limit=12");
            // const result: Product[] = res;
            // setData(res);
            setData(products);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setErr(true);
        }
    };

    useEffect(() => {
        fetchrender();
    }, [page]);

    if (Loading) {
        return (
            <div style={{ padding: "150px", textAlign: "center" }}>
                <div className="spinner"></div>
                <style jsx>{`
                    .spinner {
                        border: 4px solid rgba(0, 0, 0, 0.1);
                        border-left-color: #000;
                        border-radius: 50%;
                        width: 50px;
                        height: 50px;
                        animation: spin 1s linear infinite;
                    }
                    @keyframes spin {
                        to {
                            transform: rotate(360deg);
                        }
                    }
                `}</style>
            </div>
        );
    }

    if (Err) {
        return (
            <div>
                <p style={{ color: "red" }}>An error occurred. Please try again.</p>
            </div>
        );
    }

    const handleClick = (val: any) => {
        setPage(page + val);
    };
    /*  const [isHovered, setIsHovered] = useState(false);
     const handleMouseEnter = () => {
         setIsHovered(true);
     } */

    return (
        <div style={{ paddingTop: "115px", paddingBottom: "0px" }}>
            <div
                style={{
                    textAlign: "left",
                    color: "#171616",
                    width: "90%",
                    margin: "auto",
                    display: "grid",
                    gap: "2%",
                    justifyContent: "center",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                }}
            >
                {products.map((ele, i) => (
                    <div
                        key={i}
                        style={{
                            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                            display: "flex",
                            flexDirection: "column",
                            padding: "10px",
                            height: "320px",
                            transition: "transform 0.4s",
                            cursor: "pointer",
                            // transform: isHovered ? "scale(1.02)" : "none",
                            // hover: "scale(1.02)",
                        }}
                    >
                        <img src={ele.avatar} style={{ width: "200px", margin: "auto" }} alt="Item" />
                        {/* <Image src={ele.avatar} alt="Item" width={200} height={200} margin="auto" /> */}
                        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "2%" }}>
                                <h6 style={{ textAlign: "left" }}>{ele.brand}</h6>
                                <p style={{ fontSize: "14px", maxWidth: "130px", textOverflow: "ellipsis", overflow: "hidden" }}>{ele.about}</p>
                                <p style={{ fontSize: "14px", color: "gray" }}>{ele.price}</p>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center", gap: "10px" }}>
                                <button style={{ color: "black", fontSize: "15px", background: "none", border: "none", cursor: "pointer" }}>More Detail</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "12%" }}>
                <button onClick={() => handleClick(-1)} disabled={page === 1} style={{ padding: "10px", marginRight: "10px" }}>
                    Previous
                </button>
                <p>{page}</p>
                <button onClick={() => handleClick(1)} style={{ padding: "10px", marginLeft: "10px" }}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default AllProducts;
