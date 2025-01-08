import { useLocation, useNavigate } from "react-router-dom";
import BookCard from "../../components/BookCard.jsx";
import SectionHeader from "../../components/SectionHeader.jsx";
import { useCategories } from "../../hooks/useCategories.js";

const CategoryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const category = location.state?.category;
  const { data: allCategories, isLoading, error } = useCategories();

  // Eğer state yoksa ana sayfaya yönlendir
  if (!category.id) {
    navigate("/library");
    return null;
  }

  if (isLoading) {
    return <div className="text-center mt-10">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  // Alt kategorileri filtrele
  const subcategories = allCategories
    ? allCategories
        .filter((cat) => cat.parentCategoryId === category.id)
        .map((subCategory) => ({
          title: subCategory.categoryName,
          imageUrl: subCategory.thumbnailUrl,
          onClick: () =>
            navigate("/library/subcategory", {
              state: {
                category,
                subcategory: {
                  id: subCategory.categoryId,
                  name: subCategory.categoryName,
                  thumbnailUrl: subCategory.thumbnailUrl,
                },
              },
            }),
        }))
    : [];

  return (
    <div className="container mx-auto py-10 px-6 ">
      <SectionHeader
        title="Alt Kategoriler"
        description="Bu kategorideki alt kategorilere göz atın."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        {subcategories.map((subCategory, index) => (
          <BookCard
            key={index}
            title={subCategory.title}
            imageUrl={subCategory.imageUrl}
            onClick={subCategory.onClick}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
