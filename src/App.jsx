import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Homepage from "./pages/HomePage/Homepage";
import Contact from "./pages/Contact/Contact";
import DigitalLibrary from "./pages/DigitalLibraryPage/DigitalLibrary";
import EducationalBooks from "./pages/DigitalLibraryPage/EducationalBooks";
import QuranBooks from "./pages/DigitalLibraryPage/QuranBooks";
import Mentoring from "./pages/MentoringPage/MentoringPage";
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
                    <Route path="library/educational-books/quran" element={<QuranBooks />} />
                    <Route path="mentoring" element={<Mentoring />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
