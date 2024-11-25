import "./App.css";
import Navbar from "./pages/HomePage/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'normalize.css';
import InfoSection from "./pages/HomePage/info-section/InfoSection.jsx";



function App() {
  return (
    <>
      <Navbar />
        <InfoSection />
    </>
  );
}

export default App;
