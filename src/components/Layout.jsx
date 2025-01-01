import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar.jsx";
import Footer from "./Footer/Footer.jsx";

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Navbar />

            <main className="flex-grow">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default Layout;
