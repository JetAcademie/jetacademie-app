import Navbar from "./Navbar/Navbar";
import InfoSection from "./info-section/InfoSection";
import Footer from "./footer/Footer";
import MissionSection from "./mission-section/MissionSection.jsx";
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
