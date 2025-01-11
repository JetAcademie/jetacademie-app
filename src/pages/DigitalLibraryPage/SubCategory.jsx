import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookCard from '../../components/BookCard.jsx';
import SectionHeader from '../../components/SectionHeader.jsx';
import { slugify } from '../../components/utils.js';

const SubcategoryPage = () => {
  const { categorySlug, subcategorySlug } = useParams();
  const [items, setItems] = useState([]);
  const [subcategoryName, setSubcategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // Tüm kategorileri getir
        const response = await axios.get(
          'http://localhost:8080/api/categories'
        );

        // categorySlug ile ana kategoriyi bul
        const category = response.data.find(
          (cat) => slugify(cat.categoryName) === categorySlug
        );

        if (!category) {
          throw new Error('Ana kategori bulunamadı.');
        }

        // subcategorySlug ile alt kategoriyi bul
        const subcategory = response.data.find(
          (sub) =>
            slugify(sub.categoryName) === subcategorySlug &&
            sub.parentCategoryId === category.categoryId
        );

        if (!subcategory) {
          throw new Error('Alt kategori bulunamadı.');
        }

        setSubcategoryName(subcategory.categoryName);

        // Alt kategoriye ait itemleri getir
        const itemsResponse = await axios.get(
          `http://localhost:8080/api/items?subcategoryId=${subcategory.categoryId}`
        );
        setItems(itemsResponse.data);
        setLoading(false);
      } catch (err) {
        setError('Veriler alınırken bir hata oluştu.');
        setLoading(false);
        console.log(err);
      }
    };

    fetchItems();
  }, [categorySlug, subcategorySlug]);

  if (loading) {
    return <div className="text-center mt-10">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto py-10 px-6">
      <SectionHeader
        title={subcategoryName}
        description="Bu alt kategorideki kitaplara göz atın."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        {items.map((item) => (
          <BookCard
            key={item.itemId}
            title={item.itemName}
            imageUrl={item.thumbnailUrl}
            link={item.fileUrl} // PDF dosyasına yönlendirme
          />
        ))}
      </div>
    </div>
  );
};

export default SubcategoryPage;
