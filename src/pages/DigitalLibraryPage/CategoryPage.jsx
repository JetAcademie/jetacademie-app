import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookCard from "../../components/BookCard.jsx";
import SectionHeader from "../../components/SectionHeader.jsx";
import { slugify } from "../../components/utils.js";
import { useCategories } from "../../hooks/useCategories.js";

const CategoryPage = () => {
  const { categorySlug } = useParams();
  const { data: categories, isLoading, error } = useCategories();
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    if (categories) {
      // categorySlug ile kategoriyi bul
      const currentCategory = categories.find(
        (category) => slugify(category.categoryName) === categorySlug,
      );

      if (currentCategory) {
        // Bu kategorinin alt kategorilerini filtrele
        const childCategories = categories.filter(
          (category) => category.parentCategoryId === currentCategory.categoryId,
        );
        setSubcategories(childCategories);
      }
    }
  }, [categories, categorySlug]);

  if (isLoading) {
    return <div className="text-center mt-10">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Veriler alınırken bir hata oluştu.</div>;
  }

  return (
    <div className="container mx-auto py-10 px-6 ">
      <SectionHeader
        title="Alt Kategoriler"
        description="Bu kategorideki alt kategorilere göz atın."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        {subcategories.map((subCategory) => (
          <BookCard
            key={subCategory.categoryId}
            title={subCategory.categoryName}
            imageUrl={subCategory.thumbnailUrl}
            link={`/library/${slugify(categorySlug)}/${slugify(subCategory.categoryName)}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
