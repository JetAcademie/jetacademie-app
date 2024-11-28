import InfoSection from "./Info-section/InfoSection";
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
