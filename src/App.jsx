import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Homepage from "./pages/HomePage/Homepage";
import Contact from "./pages/Contact/Contact";
import DigitalLibrary from "./pages/DigitalLibraryPage/DigitalLibrary";
import EducationalBooks from "./pages/DigitalLibraryPage/EducationalBooks";
import QuranBooks from "./pages/DigitalLibraryPage/QuranBooks";
import Mentoring from "./pages/MentoringPage/MentoringPage";
import HistoricalBooks from "./pages/DigitalLibraryPage/HistoricalBooks.jsx";
import ClassPage from "./pages/MentoringPage/ClassPage.jsx";
import {classData, mentoringGrades} from "./data/data.js";
import MonthPage from "./pages/MentoringPage/MonthPage.jsx";
import { slugify } from "./components/utils.js";

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

                    {Object.entries(classData).map(([key, grade]) => (
                        <Route
                            key={key}
                            path={`mentoring/${slugify(key)}`}
                            element={<ClassPage grade={grade} />}
                        />
                    ))}
                    {Object.entries(classData).map(([key, grade]) =>
                        Object.keys(grade.months).map((month) => (
                            <Route
                                key={`${key}-${month}`}
                                path={`mentoring/${slugify(key)}/${slugify(month)}`}
                                element={
                                    <MonthPage
                                        gradeTitle={grade.title}
                                        month={month}
                                        documents={grade.months[month]}
                                    />
                                }
                            />
                        ))
                    )}
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
