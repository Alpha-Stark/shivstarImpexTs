"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import categoryimgDefault from "../Pics/categoryImgdefault.jpg";
import categoryimgRings from "../Pics/5-Carat-Diamond-Dress-Ring-with-Basket-Setting-in-Platinum.jpg";
import categoryimgEarring from "../Pics/Rhinestone-Earrings-Jewelry-Ladies-Temperament-Fashion-Full-Crystal-Shiny-Tassel-Earrings-Party-Wedding-Bijoux-Gifts-Wholesale.webp";
import categoryimgBracelet from "../Pics/photo-1506049420574-b51320eee265.avif";
import categoryimgWatches from "../Pics/watchesnew-1612817159450-08a180df028b.avif";
import categoryimgMenjewellery from "../Pics/menjewellery1620891239438-eb4b8b467fb7.avif";
import categoryimgPendant from "../Pics/pendant-1611583027838-515a1087afdb.avif";
import Image from "next/image";
import styles from "../style/CategoriesSection.module.css";

export const CategoriesSection = () => {
    const [hoverImg, setHoverImg] = useState(categoryimgDefault);

    useEffect(() => {
        // Preload images for better performance
        const imagesToPreload = [categoryimgRings, categoryimgEarring, categoryimgBracelet, /* categoryimgWatches, */ categoryimgMenjewellery, categoryimgPendant];
        imagesToPreload.forEach((img) => {
            const image = new window.Image();
            image.src = img.src;
        });
    }, []);

    const handleMouseEnter = (image: any) => {
        setHoverImg(image);
    };

    return (
        <Box className={styles.container}>
            <Flex className={styles.flexContainer}>
                <Box className={styles.textContainer}>
                    <Text className={styles.heading}>Categories</Text>
                    <Text className={styles.subheading}>Discover Our Collection of Jewellery by Categories</Text>

                    <Box className={styles.categoryList}>
                        <Text className={styles.categoryItem} onMouseEnter={() => handleMouseEnter(categoryimgRings)}>Rings</Text>
                        <Text className={styles.categoryItem} onMouseEnter={() => handleMouseEnter(categoryimgBracelet)}>Bracelets</Text>
                        <Text className={styles.categoryItem} onMouseEnter={() => handleMouseEnter(categoryimgEarring)}>Earrings</Text>
                        <Text className={styles.categoryItem} onMouseEnter={() => handleMouseEnter(categoryimgPendant)}>Necklaces & Pendants</Text>
                        {/* <Text className={styles.categoryItem} onMouseEnter={() => handleMouseEnter(categoryimgWatches)}>Watches</Text> */}
                        <Text className={styles.categoryItem} onMouseEnter={() => handleMouseEnter(categoryimgMenjewellery)}>Men's Jewelry</Text>
                        <Text className={styles.allCategories}>All Categories</Text>
                    </Box>
                </Box>

                <Box className={styles.imageContainer}>
                    <Image src={hoverImg} alt="Category Image" layout="fill" objectFit="cover" quality={100} priority />
                </Box>
            </Flex>
        </Box>
    );
};
