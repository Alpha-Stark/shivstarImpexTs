import React from "react";
import styles from "../style/Newcollection.module.css";

export const NewCollection = () => {
    const products = [
        {
            imgSrc: "https://gem-garden-jewelry-store.vercel.app/static/media/card5.471f0f73c03a3ce42177.png",
            title: "Messika",
            description: "White Gold Diamond Ring.",
            price: "$1.390",
        },
        {
            imgSrc: "https://gem-garden-jewelry-store.vercel.app/static/media/card6.cdfc389c353e0a1a95c5.png",
            title: "Tiffani",
            description: "Silver Necklace.",
            price: "$750",
        },
        {
            imgSrc: "https://gem-garden-jewelry-store.vercel.app/static/media/card7.3abfa35a89cf47b097ae.png",
            title: "Bulgari",
            description: "White Gold Diamond Earring.",
            price: "$7.250",
        },
        {
            imgSrc: "https://mygemma.com/cdn/shop/products/122588-fv_1200x.jpg?v=1659050494",
            title: "Cartier",
            description: "White Gold Ring.",
            price: "$1.950",
        },
    ];
    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.headerText}>
                        <h1>New Collection</h1>
                        <p>Top-rated jewellery from our collection</p>
                    </div>
                    <div className={styles.viewAllButton}>
                        {/* <button onClick={() => navigate("/products")}>VIEW ALL</button> */}
                    </div>
                </div>

                <div className={styles.grid}>
                    {products.map((product, id) => (
                        <div key={id} className={styles.card}>
                            <img src={product.imgSrc} alt={product.title} />
                            <h3>{product.title}</h3>
                            <p>{product.description}</p>
                            <p className={styles.price}>{product.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default NewCollection;
