import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Homepage from "./pages/HomePage/Homepage";
import Contact from "./pages/Contact/Contact";
import DigitalLibrary from "./pages/DigitalLibraryPage/DigitalLibrary";
import Mentoring from "./pages/MentoringPage/MentoringPage";
import ClassPage from "./pages/MentoringPage/ClassPage.jsx";
import {classData,} from "./data/data.js";
import MonthPage from "./pages/MentoringPage/MonthPage.jsx";
import { slugify } from "./components/utils.js";
import CategoryPage from "./pages/DigitalLibraryPage/CategoryPage.jsx";
import SubcategoryPage from "./pages/DigitalLibraryPage/SubCategory.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Homepage />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="library" element={<DigitalLibrary />} />
                    <Route path="library/:categorySlug" element={<CategoryPage />} />
                    <Route path="library/:categorySlug/:subcategorySlug" element={<SubcategoryPage />} />

                    <Route path="mentoring" element={<Mentoring />} />

                    {Object.entries(classData).map(([key, grade]) => (
                        <Route
                            key={key}
                            path={`mentoring/${slugify(key)}`}
                            element={<ClassPage grade={grade} />}
                        />
                    ))}

                    {Object.entries(classData).map(([key, grade]) =>
                        Object.entries(grade.months).map(([month, monthData]) => (
                            <Route
                                key={`${key}-${month}`}
                                path={`mentoring/${slugify(key)}/${slugify(month)}`}
                                element={
                                    <MonthPage
                                        gradeTitle={grade.title}
                                        month={month}
                                  zz      documents={monthData.documents || []}
                                        videos={monthData.videos || []}
                                        additionalLinks={monthData.additionalLinks || []}
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
