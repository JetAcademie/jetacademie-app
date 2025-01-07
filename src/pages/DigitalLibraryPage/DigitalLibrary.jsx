import { useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import AddButton from "../../components/AddButton.jsx";
import AddCategoryModal from "../../components/AddCategoryModal.jsx";
import EditCategoryModal from "../../components/EditCategoryModal.jsx";
import SectionHeader from "../../components/SectionHeader.jsx";
import TopicCard from "../../components/TopicCard.jsx";
import { slugify } from "../../components/utils.js";
import AdminContext from "../../context/AdminContext.jsx";
import { useCategories } from "../../hooks/useCategories.js";
import Axios from "../../utils/axios.js";

const DigitalLibrary = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { isAdmin } = useContext(AdminContext);
  const { data: allCategories, isLoading, error } = useCategories();
  const queryClient = useQueryClient();

  const categories = allCategories
    ? allCategories
        .filter((category) => category.parentCategoryId === null)
        .map((category) => ({
          title: category.categoryName || "Bilinmeyen Kategori",
          imageUrl: category.thumbnailUrl || "https://via.placeholder.com/150",
          link: `/library/${slugify(category.categoryName)}`,
          id: category.categoryId,
        }))
    : [];

  // Kategori silme
  const handleDelete = async (category) => {
    if (!window.confirm(`${category.title} kategorisini silmek istediğinizden emin misiniz?`)) {
      return;
    }

    try {
      await Axios.delete(`categories/${category.id}`);
      queryClient.invalidateQueries(["categories"]);
    } catch (err) {
      console.error("Kategori silinirken hata oluştu:", err);
    }
  };

  // Yeni kategori ekleme
  const handleAddCategory = async (newCategory) => {
    try {
      await Axios.post("categories", newCategory);
      queryClient.invalidateQueries(["categories"]);
      setIsAddModalOpen(false);
    } catch (err) {
      console.error("Yeni kategori eklenirken hata oluştu:", err);
    }
  };

  // Kategori düzenleme
  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const handleEditCategory = async (updatedCategory) => {
    try {
      await Axios.put(`categories/${updatedCategory.id}`, updatedCategory);
      queryClient.invalidateQueries(["categories"]);
      setIsEditModalOpen(false);
    } catch (err) {
      console.error("Kategori düzenlenirken hata oluştu:", err);
    }
  };

  if (isLoading) {
    return <div className="text-center mt-10">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="flex-grow pt-[3rem] bg-white">
      <SectionHeader
        title="Dijital Kütüphane"
        description="Bilginizi zenginleştirmek için çeşitli kitap ve kaynak kategorilerini keşfedin."
      />

      <div className="relative">
        {isAdmin && (
          <div className="absolute top-0 right-0 flex gap-4">
            <AddButton onClick={() => setIsAddModalOpen(true)} />
          </div>
        )}

        <section className="container mx-auto py-10 px-6">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Kategorilerimiz</h2>
          <p className="text-center text-gray-600 mb-10">
            Birçok disipline yayılan özenle seçilmiş kitap ve kaynak koleksiyonumuzu inceleyin.
          </p>
          <TopicCard data={categories} onDelete={handleDelete} onEdit={handleEdit} />
        </section>
      </div>

      {/* Ekle Modal */}
      {isAdmin && (
        <AddCategoryModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddCategory={handleAddCategory}
        />
      )}

      {/* Düzenle Modal */}
      {isAdmin && selectedCategory && (
        <EditCategoryModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          category={selectedCategory}
          onSave={handleEditCategory}
        />
      )}
    </div>
  );
};

export default DigitalLibrary;
