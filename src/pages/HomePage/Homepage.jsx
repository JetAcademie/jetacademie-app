import Navbar from "./Navbar/Navbar";
import InfoSection from "./Info-section/InfoSection";
import Footer from "./Footer/Footer";
import MissionSection from "./Mission-section/MissionSection.jsx";
import MotivationSection from "./MotivationSection/MotivationSection.jsx";

const Homepage = () => {
    return (
        <div>
            <Navbar />
            <InfoSection />
            <MotivationSection/>
            <MissionSection />
            <Footer />
        </div>
    );
};

export default Homepage;
