import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import api from '../../api/axios.js';
import AddButton from '../../components/AddButton.jsx';
import AddItemModal from '../../components/AddItemModal.jsx';
import BookCard from '../../components/BookCard.jsx';
import EditItemModal from '../../components/EditItemModal.jsx';
import SectionHeader from '../../components/SectionHeader.jsx';
import { slugify } from '../../components/utils.js';
import AdminContext from '../../context/AdminContext.jsx';

const CategoryPage = () => {
  const { categorySlug } = useParams();
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const { isAdmin } = useContext(AdminContext);

  const location = useLocation();
  const { itemId } = location && location.state ? location.state : {};
  // Add at the top of component:
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        if (!itemId) {
          navigate('/library');
          return null;
        }
        const response = await api.get(`/categories/by-parent/${itemId}`);
        console.log(response.data);

        const childCategories = response.data.map((category) => ({
          title: category.categoryName,
          thumbnailUrl: category.thumbnailUrl,
          link: `/library/${slugify(category.categoryName)}`,
          id: category.categoryId,
        }));

        setSubcategories(childCategories);
        setLoading(false);
      } catch (err) {
        console.error('Hata oluştu:', err);
        setError('Veriler alınırken bir hata oluştu.');
        setLoading(false);
      }
    };

    fetchSubcategories();
  }, [categorySlug]);

  const handleDelete = async (subcategory) => {
    if (
      !window.confirm(
        `${subcategory.title} silmek istediğinizden emin misiniz?`
      )
    )
      return;

    try {
      await api.delete(`/categories/${subcategory.id}`);
      setSubcategories((prev) =>
        prev.filter((cat) => cat.categoryId !== subcategory.id)
      );
    } catch (err) {
      console.error('Alt kategori silinirken hata oluştu:', err);
    }
  };

  const handleAddSubcategory = async (newSubcategory) => {
    const toBeAddedSubcategory = {
      ...newSubcategory,
      parentCategoryId: itemId,
    };
    try {
      const response = await api.post('/categories', toBeAddedSubcategory);
      setSubcategories((prev) => [...prev, response.data]);
      setIsAddModalOpen(false);
    } catch (err) {
      console.error('Alt kategori eklenirken hata oluştu:', err);
    }
  };

  const handleEditSubcategory = async (updatedSubcategory) => {
    try {
      const response = await api.put(
        `/categories/${updatedSubcategory.categoryId}`,
        updatedSubcategory
      );
      setSubcategories((prev) =>
        prev.map((cat) =>
          cat.categoryId === response.data.categoryId ? response.data : cat
        )
      );
      setIsEditModalOpen(false);
    } catch (err) {
      console.error('Alt kategori düzenlenirken hata oluştu:', err);
    }
  };

  const handleEdit = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setIsEditModalOpen(true);
  };

  return (
    <div className="container mx-auto py-10 px-6">
      <SectionHeader
        title="Alt Kategoriler"
        description="Alt kategorileri yönetin veya keşfedin."
      />

      {isAdmin && <AddButton onClick={() => setIsAddModalOpen(true)} />}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-1">
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
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {subcategories.map((subcategory) => (
            <BookCard
              key={subcategory.id}
              title={subcategory.title}
              imageUrl={subcategory.thumbnailUrl}
              link={`/library/${slugify(categorySlug)}/${slugify(subcategory.title)}`}
              onDelete={() => handleDelete(subcategory)}
              onEdit={() => handleEdit(subcategory)}
            />
          ))}
        </div>
      )}

      {isAdmin && (
        <>
          <AddItemModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onAdd={handleAddSubcategory}
          />
          {selectedSubcategory && (
            <EditItemModal
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              item={selectedSubcategory}
              onSave={handleEditSubcategory}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CategoryPage;
