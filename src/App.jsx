import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Homepage from "./pages/HomePage/Homepage.jsx";
import Contact from "./pages/Contact/contact.jsx";
import DigitalLibrary from "./DigitalLibraryPage/DigitalLibrary.jsx";
import Mentoring from "./MentoringPage/MentoringPage.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/library" element={<DigitalLibrary />} />
                <Route path="/mentoring" element={<Mentoring />} />
            </Routes>
        </Router>
    );
}

export default App;
