"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import React from "react";
import styles from "../style/navbar.module.css";
import logo from "../ShivstarLogo.png";
import Image from "next/image";
import Link from "next/link";

function Navbar() {
    return (
        <div className={styles.navbaronly}>
            <div className={styles["navbar-logo"]}>
                <Link href="/" className="flex items-center p-1">
                    <Image src={logo} alt="Logo" width={85} height={55} />
                    <h4>SHIVSTAR IMPEX</h4>
                </Link>
            </div>
            <div className={styles.navbarlinks}>
                <Link href="/products" className={`${styles["navbar-link"]} my-1 md:my-0 mx-2 md:mx-4 p-1`}>
                    Diamonds
                </Link>
                <Link href="/watches" className={`${styles["navbar-link"]} my-1 md:my-0 mx-2 md:mx-4 p-1`}>
                    Watches
                </Link>
                <Link href="/gift" className={`${styles["navbar-link"]} my-1 md:my-0 mx-2 md:mx-4 p-1`}>
                    Gift
                </Link>
                <Link href="/contactUs" className={`${styles["navbar-link"]} my-1 md:my-0 mx-2 md:mx-4 p-1`}>
                    Contact
                </Link>
                <Link href="/account" className={`${styles["navbar-link"]} my-1 md:my-0 mx-2 md:mx-4 p-1`}>
                    Account
                </Link>
                <Link href="/bag" className={`${styles["navbar-link"]} my-1 md:my-0 mx-2 md:mx-4 p-1`}>
                    Bag
                </Link>
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
        </div>
    );
}

export default Navbar;
