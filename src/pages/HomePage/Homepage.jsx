import InfoSection from "./Info-section/InfoSection";
import MissionSection from "./Mission-section/MissionSection.jsx";
import MotivationSection from "./MotivationSection/MotivationSection.jsx";

const Homepage = () => {
  return (
    <div className="mt-24 bg-gray-100">
      <InfoSection />
      <MotivationSection />
      <MissionSection />
    </div>
  );
};

export default Homepage;
