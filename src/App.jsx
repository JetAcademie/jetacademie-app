import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/HomePage/Homepage";
import Contact from "./pages/Contact/Contact";
import DigitalLibrary from "./pages/DigitalLibraryPage/DigitalLibrary";
import Mentoring from "./pages/MentoringPage/MentoringPage";
import EducationalBooks from "./pages/DigitalLibraryPage/EducationalBooks";
import Layout from "./components/Layout";
import HistoricalBooks from "./pages/DigitalLibraryPage/HistoricalBooks.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Homepage />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="library" element={<DigitalLibrary />} />
                    <Route path="library/educational-books" element={<EducationalBooks />} />
                    <Route path="library/historical-books" element={<HistoricalBooks />} />
                    <Route path="mentoring" element={<Mentoring />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
