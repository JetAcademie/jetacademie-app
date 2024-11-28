import Navbar from "./Navbar/Navbar";
import InfoSection from "./Info-section/InfoSection";
import Footer from "./Footer/Footer";
import MissionSection from "./Mission-section/MissionSection.jsx";
import MotivationSection from "./MotivationSection/MotivationSection.jsx";

const Homepage = () => {
    return (
        <div>
            <InfoSection />
            <MotivationSection/>
            <MissionSection />
        </div>
    );
};

export default Homepage;
