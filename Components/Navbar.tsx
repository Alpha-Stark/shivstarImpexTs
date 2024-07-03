"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import React, { useState } from "react";
import styles from "../style/navbar.module.css";
import logo from "../ShivstarLogo.png";
import Image from "next/image";
import Link from "next/link";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles.navbaronly}>
            <div className={styles["navbar-logo"]}>
                <Link href="/" className={styles.navbarLogoLink}>
                    <Image src={logo} alt="Logo" width={85} height={55} />
                    <h4>SHIVSTAR IMPEX</h4>
                </Link>
            </div>
            <div className={`${styles.navbarlinks} ${isOpen ? styles.show : ''}`}>
                <Link href="/products" className={styles["navbar-link"]}>
                    Diamonds
                </Link>
                <Link href="/jewellery" className={styles["navbar-link"]}>
                    Jewellery
                </Link>
                {/* <Link href="/gift" className={styles["navbar-link"]}>
                    Gift
                </Link>
                <Link href="/contactUs" className={styles["navbar-link"]}>
                    Contact
                </Link>
                <Link href="/account" className={styles["navbar-link"]}>
                    Account
                </Link>
                <Link href="/bag" className={styles["navbar-link"]}>
                    Bag
                </Link> */}
            </div>
            <div className={styles.navbarbuttons}>
                <SignedOut>
                    <SignInButton>
                        <button className={`${styles.button} ${styles.dark}`}>Login</button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
            <div className={styles.hamburger} onClick={toggleMenu}>
                <div className={`${styles.bar} ${isOpen ? styles.change : ''}`}></div>
                <div className={`${styles.bar} ${isOpen ? styles.change : ''}`}></div>
                <div className={`${styles.bar} ${isOpen ? styles.change : ''}`}></div>
            </div>
        </div>
    );
}

export default Navbar;
