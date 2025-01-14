import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/axios';
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
        const categoriesResponse = await api.get('/categories');

        // categorySlug ile ana kategoriyi bul
        const category = categoriesResponse.data.find(
          (cat) => slugify(cat.categoryName) === categorySlug
        );

        if (!category) {
          throw new Error('Ana kategori bulunamadı.');
        }

        // subcategorySlug ile alt kategoriyi bul
        const subcategory = categoriesResponse.data.find(
          (sub) =>
            slugify(sub.categoryName) === subcategorySlug &&
            sub.parentCategoryId === category.categoryId
        );

        if (!subcategory) {
          throw new Error('Alt kategori bulunamadı.');
        }

        setSubcategoryName(subcategory.categoryName);

        // Alt kategoriye ait itemleri getir
        const itemsResponse = await api.get(
          `/items?subcategoryId=${subcategory.categoryId}`
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

  return (
    <div className="container mx-auto py-10 px-6">
      {loading ? (
        <>
          <SectionHeader
            title="Yükleniyor..."
            description="Alt kategori içeriği yükleniyor. Lütfen bekleyin."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse flex flex-col items-center bg-gray-200 shadow-lg rounded-lg overflow-hidden"
              >
                <div className="h-48 w-full bg-gray-300 rounded-t-lg"></div>
                <div className="w-3/4 h-6 bg-gray-300 mt-4 rounded"></div>
                <div className="w-1/2 h-4 bg-gray-300 mt-2 mb-4 rounded"></div>
              </div>
            ))}
          </div>
        </>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default SubcategoryPage;
