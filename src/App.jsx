import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Contact from "./pages/Contact/Contact";
import CategoryPage from "./pages/DigitalLibraryPage/CategoryPage.jsx";
import DigitalLibrary from "./pages/DigitalLibraryPage/DigitalLibrary";
import SubcategoryPage from "./pages/DigitalLibraryPage/SubCategory.jsx";
import Homepage from "./pages/HomePage/Homepage";
import ClassPage from "./pages/MentoringPage/ClassPage.jsx";
import Mentoring from "./pages/MentoringPage/MentoringPage";
import MonthPage from "./pages/MentoringPage/MonthPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="contact" element={<Contact />} />
          <Route path="library" element={<DigitalLibrary />} />
          <Route path="/library/:categorySlug" element={<CategoryPage />} />
          <Route path="library/:categorySlug/:subcategorySlug" element={<SubcategoryPage />} />
          <Route path="mentoring/:gradeSlug" element={<ClassPage />} />
          <Route path="mentoring/:gradeSlug/:monthSlug" element={<MonthPage />} />
          <Route path="mentoring" element={<Mentoring />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
