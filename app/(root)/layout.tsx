"use client";
import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";

export default function RootLayout({ children }: {
    children: React.ReactNode
}) {
    return (
        <div className="bg-white">
            <Navbar />
            <main className="pt-16">{children}</main>
            <Footer />
        </div>
    );
}
