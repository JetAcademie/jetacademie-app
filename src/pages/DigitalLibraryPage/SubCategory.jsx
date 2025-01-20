import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/axios';
import AddButton from '../../components/AddButton.jsx';
import AddItemModal from '../../components/AddItemModal.jsx';
import BookCard from '../../components/BookCard.jsx';
import EditItemModal from '../../components/EditItemModal.jsx';
import SectionHeader from '../../components/SectionHeader.jsx';
import { slugify } from '../../components/utils.js';
import AdminContext from '../../context/AdminContext.jsx';

const SubcategoryPage = () => {
  const { categorySlug, subcategorySlug } = useParams();
  const [items, setItems] = useState([]);
  const [subcategoryName, setSubcategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { isAdmin } = useContext(AdminContext);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const categoriesResponse = await api.get('/categories');
        const category = categoriesResponse.data.find(
          (cat) => slugify(cat.categoryName) === categorySlug
        );

        if (!category) {
          throw new Error('Ana kategori bulunamadı.');
        }

        const subcategory = categoriesResponse.data.find(
          (sub) =>
            slugify(sub.categoryName) === subcategorySlug &&
            sub.parentCategoryId === category.categoryId
        );

        if (!subcategory) {
          throw new Error('Alt kategori bulunamadı.');
        }

        setSubcategoryName(subcategory.categoryName);

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

  const handleAddItem = async (newItem) => {
    try {
      const subcategoryId = items.length ? items[0].subcategoryId : null;

      if (!subcategoryId) throw new Error("Alt kategori ID'si bulunamadı.");

      const formData = new FormData();
      formData.append('subcategoryId', subcategoryId);
      formData.append('itemName', newItem.itemName);
      formData.append('thumbnailUrl', newItem.thumbnailUrl);
      formData.append('file', newItem.file);

      const response = await api.post('/items', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setItems((prevItems) => [...prevItems, response.data]);
      setIsAddModalOpen(false);
    } catch (err) {
      console.error('Yeni öğe eklenirken hata oluştu.', err);
    }
  };

  const handleEditItem = async (updatedItem) => {
    try {
      const formData = new FormData();
      formData.append('subcategoryId', updatedItem.subcategoryId);
      formData.append('itemName', updatedItem.itemName);
      formData.append('thumbnailUrl', updatedItem.thumbnailUrl);
      if (updatedItem.file) {
        formData.append('file', updatedItem.file);
      }

      const response = await api.put(`/items/${updatedItem.itemId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.itemId === response.data.itemId ? response.data : item
        )
      );
      setIsEditModalOpen(false);
    } catch (err) {
      console.error('Öğe düzenlenirken hata oluştu.', err);
    }
  };

  const handleDeleteItem = async (item) => {
    if (!window.confirm(`${item.itemName} silmek istediğinizden emin misiniz?`))
      return;

    try {
      await api.delete(`/items/${item.itemId}`);
      setItems((prevItems) =>
        prevItems.filter((existingItem) => existingItem.itemId !== item.itemId)
      );
    } catch (err) {
      console.error('Öğe silinirken hata oluştu.', err);
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  return (
    <div className="container mx-auto py-10 px-6">
      <SectionHeader
        title={subcategoryName}
        description="Bu alt kategorideki öğeleri yönetin veya keşfedin."
      />

      {isAdmin && <AddButton onClick={() => setIsAddModalOpen(true)} />}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-2">
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
          {items.map((item) => (
            <BookCard
              key={item.itemId}
              title={item.itemName}
              imageUrl={item.thumbnailUrl}
              link={item?.fileUrl || item.thumbnailUrl || ''}
              onDelete={() => handleDeleteItem(item)}
              onEdit={() => handleEdit(item)}
            />
          ))}
        </div>
      )}

      {isAdmin && (
        <>
          <AddItemModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onAdd={handleAddItem}
          />
          {selectedItem && (
            <EditItemModal
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              item={selectedItem}
              onSave={handleEditItem}
            />
          )}
        </>
      )}
    </div>
  );
};

export default SubcategoryPage;
