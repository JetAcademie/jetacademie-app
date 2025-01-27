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
import { CategoryLevels } from '../../data/constants.js';

const SubcategoryPage = () => {
  const { categorySlug, subcategorySlug } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { isAdmin } = useContext(AdminContext);
  const [category, setCategory] = useState(null);
  const [refecth, setRefetch] = useState(false);

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
        setCategory(category);

        const itemsResponse = await api.get(
          `/items/by-category/${category.categoryId}`
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
  }, [categorySlug, subcategorySlug, refecth]);

  const handleAddItem = (newItem) => {
    const itemToBeAdded = {
      thumbnailFile: newItem.thumbnailFile,
      pdfFile: newItem.pdfFile,
    };

    return api
      .post(
        `/items?categoryId=${category.categoryId}&itemName=${newItem.itemName}`,
        itemToBeAdded,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )
      .then((response) => {
        setIsAddModalOpen(false);
        alert('Yeni öğe başarıyla eklendi.');
        setRefetch(!refecth);
        return response.data;
      })
      .catch((error) => {
        console.error('Yeni öğe eklenirken hata oluştu.', error);
        alert('Öğe eklenirken bir hata oluştu. Lütfen tekrar deneyin.');
        throw error;
      });
  };

  const handleEditItem = (updatedItem) => {
    const itemToBeUpdated = {
      thumbnailFile: updatedItem.thumbnail,
      pdfFile: updatedItem.itemName,
    };

    return api
      .put(
        `/items?itemId=${updatedItem.itemId}&categoryId=${category.categoryId}&itemName=${updatedItem.itemName}`,
        itemToBeUpdated,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )
      .then((response) => {
        setRefetch(!refecth);
        setIsEditModalOpen(false);
        alert('Öğe başarıyla güncellendi.');
        return response.data;
      })
      .catch((error) => {
        console.error('Öğe düzenlenirken hata oluştu.', error);
        alert('Öğe düzenlenirken bir hata oluştu. Lütfen tekrar deneyin.');
        throw error;
      });
  };

  const handleDeleteItem = (item) => {
    const isConfirmed = window.confirm(
      `${item.itemName} silmek istediğinizden emin misiniz?`
    );

    if (!isConfirmed) {
      return false;
    }

    return api
      .delete(`/items/${item.itemId}`)
      .then(() => {
        setRefetch(!refecth);
        alert(`${item.itemName} başarıyla silindi.`);
        return true;
      })
      .catch((error) => {
        console.error('Öğe silinirken hata oluştu.', error);
        alert('Öğe silinirken bir hata oluştu. Lütfen tekrar deneyin.');
        throw error;
      });
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  return (
    <div className="container mx-auto py-10 px-6">
      <SectionHeader
        title={'Alt Kategori'}
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
              id={item.itemId}
              title={item.itemName}
              imageUrl={item?.thumbnailUrl || item?.thumbnail}
              link={item?.fileUrl || item.thumbnailUrl || ''}
              onDelete={() => handleDeleteItem(item)}
              onEdit={() => handleEdit(item)}
              level={CategoryLevels.item}
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
            level={CategoryLevels.item}
          />
          {selectedItem && (
            <EditItemModal
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              item={selectedItem}
              onSave={handleEditItem}
              level={CategoryLevels.item}
            />
          )}
        </>
      )}
    </div>
  );
};

export default SubcategoryPage;
