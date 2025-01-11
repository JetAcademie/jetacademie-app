import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookCard from '../../components/BookCard.jsx';
import SectionHeader from '../../components/SectionHeader.jsx';
import { slugify } from '../../components/utils.js';

const CategoryPage = () => {
  const { categorySlug } = useParams();
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        // Tüm kategorileri getir
        const response = await axios.get(
          'http://localhost:8080/api/categories'
        );

        // categorySlug ile kategoriyi bul
        const currentCategory = response.data.find(
          (category) => slugify(category.categoryName) === categorySlug
        );

        if (!currentCategory) {
          throw new Error('Kategori bulunamadı.');
        }

        // Bu kategorinin alt kategorilerini filtrele
        const childCategories = response.data.filter(
          (category) => category.parentCategoryId === currentCategory.categoryId
        );

        setSubcategories(childCategories);
        setLoading(false);
      } catch (err) {
        setError('Veriler alınırken bir hata oluştu.');
        setLoading(false);
        console.log(err);
      }
    };

    fetchSubcategories();
  }, [categorySlug]);

  if (loading) {
    return <div className="text-center mt-10">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
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
