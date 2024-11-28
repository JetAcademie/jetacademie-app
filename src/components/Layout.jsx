import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../pages/HomePage/Navbar/Navbar.jsx";
import Footer from "../pages/HomePage/Footer/Footer";

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-grow">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default Layout;
