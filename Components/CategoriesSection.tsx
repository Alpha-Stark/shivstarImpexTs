"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
// import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react'
import React, { useState, useEffect } from "react";
import categoryimgDefault from "../Pics/categoryImgdefault.jpg";
import categoryimgRings from "../Pics/5-Carat-Diamond-Dress-Ring-with-Basket-Setting-in-Platinum.jpg";
import categoryimgEarring from "../Pics/Rhinestone-Earrings-Jewelry-Ladies-Temperament-Fashion-Full-Crystal-Shiny-Tassel-Earrings-Party-Wedding-Bijoux-Gifts-Wholesale.webp";
import categoryimgBracelet from "../Pics/photo-1506049420574-b51320eee265.avif";
import categoryimgWatches from "../Pics/watchesnew-1612817159450-08a180df028b.avif";
import categoryimgMenjewellery from "../Pics/menjewellery1620891239438-eb4b8b467fb7.avif";
import categoryimgPendant from "../Pics/pendant-1611583027838-515a1087afdb.avif";
import Image from "next/image";

export const CategoriesSection = () => {
    const [hoverImg, setHoverImg] = useState(categoryimgDefault);

    useEffect(() => {
        // Preload images for better performance
        const imagesToPreload = [categoryimgRings, categoryimgEarring, categoryimgBracelet, categoryimgWatches, categoryimgMenjewellery, categoryimgPendant];
        imagesToPreload.forEach((img) => {
            /* const image = new Image();
            image.src = img; */
        });
    }, []);

    const handleMouseEnter = (image) => {
        setHoverImg(image);
    };

    return (
        <Box w="82%" m="70px auto">
            <Flex flexDirection={{ base: "column", sm: "column", md: "row", lg: "row", xl: "row", "2xl": "row" }} w="100%" justifyContent="space-between" alignItems="center">
                <Box cursor="pointer" textAlign="left" color="#171616" fontWeight="400">
                    <Text fontSize="32px" fontWeight="300" textTransform="capitalize">
                        Categories
                    </Text>
                    <Text fontSize="16px">Discover Our Collection of Jewellery by Categories</Text>

                    <Box mt="50px" lineHeight="40px" fontWeight="500" boxSize="fit-content">
                        <Text
                            fontSize="16px"
                            _hover={{
                                textDecoration: "underline",
                            }}
                            onMouseEnter={() => handleMouseEnter(categoryimgRings)}
                        >
                            Rings
                        </Text>
                        <Text
                            fontSize="16px"
                            _hover={{
                                textDecoration: "underline",
                            }}
                            onMouseEnter={() => handleMouseEnter(categoryimgBracelet)}
                        >
                            Bracelets
                        </Text>
                        <Text
                            fontSize="16px"
                            _hover={{
                                textDecoration: "underline",
                            }}
                            onMouseEnter={() => handleMouseEnter(categoryimgEarring)}
                        >
                            Earrings
                        </Text>
                        <Text
                            fontSize="16px"
                            _hover={{
                                textDecoration: "underline",
                            }}
                            onMouseEnter={() => handleMouseEnter(categoryimgPendant)}
                        >
                            Necklaces & Pendants
                        </Text>
                        <Text
                            fontSize="16px"
                            _hover={{
                                textDecoration: "underline",
                            }}
                            onMouseEnter={() => handleMouseEnter(categoryimgWatches)}
                        >
                            Watches
                        </Text>
                        <Text
                            fontSize="16px"
                            _hover={{
                                textDecoration: "underline",
                            }}
                            onMouseEnter={() => handleMouseEnter(categoryimgMenjewellery)}
                        >
                            Men's Jewelry
                        </Text>
                        <Text fontSize="16px" textTransform="uppercase" letterSpacing="2px" mt="40px">
                            All Categories
                        </Text>
                    </Box>
                </Box>

                <Box minW="250px" w="38%" h="75vh" position="relative" overflow="hidden" boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;" borderRadius="5px">
                    <Image
                        src={hoverImg}
                        alt="Category Image"
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                        priority // Preloads the image
                    />
                </Box>
            </Flex>
        </Box>
    );
};
