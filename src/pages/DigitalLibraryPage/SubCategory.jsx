import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BookCard from "../../components/BookCard.jsx";
import SectionHeader from "../../components/SectionHeader.jsx";
import Axios from "../../utils/axios.js";

const SubcategoryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { category, subcategory } = location.state || {};
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      if (!category || !subcategory) return;

      try {
        const itemsResponse = await Axios.get(`items?subcategoryId=${subcategory.id}`);
        setItems(itemsResponse.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Veriler alınırken bir hata oluştu.");
        setLoading(false);
      }
    };

    fetchItems();
  }, [category, subcategory]);

  // Eğer state yoksa ana sayfaya yönlendir
  if (!category || !subcategory) {
    navigate("/library");
    return null;
  }

  if (loading) {
    return <div className="text-center mt-10">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto py-10 px-6">
      <SectionHeader
        title={subcategory.name}
        description="Bu alt kategorideki kitaplara göz atın."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        {items.map((item) => (
          <BookCard
            key={item.itemId}
            title={item.itemName}
            imageUrl={item.thumbnailUrl}
            link={item.fileUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default SubcategoryPage;
