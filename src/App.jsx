import "./App.css";
import Navbar from "./pages/HomePage/Navbar/Navbar";
import InfoSection from "./pages/HomePage/info-section/InfoSection.jsx";
import Footer from "./pages/HomePage/footer/footer.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import MissionSection from "./pages/HomePage/mission-section/MissionSection.jsx";



function App() {
  return (
    <>
      <Navbar />
        <InfoSection />
        <MissionSection/>
        <Footer />

    </>
  );
}

export default App;
