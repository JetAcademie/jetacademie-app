import { useNavigate } from "react-router-dom";
import SectionHeader from "../../components/SectionHeader.jsx";
import TopicCard from "../../components/TopicCard.jsx";
import { useGrades } from "../../hooks/useGrades.js";

const Mentoring = () => {
  const navigate = useNavigate();
  const { data: gradesData, isLoading, error } = useGrades();

  const grades = gradesData
    ? gradesData.map((grade) => ({
        title: grade.gradeName || "Bilinmeyen Sınıf",
        imageUrl: grade.thumbnailUrl || "https://via.placeholder.com/150",
        onClick: () =>
          navigate("/mentoring/class", {
            state: {
              grade: {
                id: grade.gradeId,
                name: grade.gradeName,
                thumbnailUrl: grade.thumbnailUrl,
              },
            },
          }),
      }))
    : [];

  if (isLoading) {
    return <div className="text-center mt-10">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white">
      <div className="flex-grow pt-[3rem] ">
        <SectionHeader
          title="Mentorluk"
          description="Başarıya yardımcı olmak için tasarlanmış mentorluk kaynaklarını keşfedin."
        />
      </div>
      <section className="container mx-auto py-10 px-6">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Mevcut Sınıflar</h2>
        <p className="text-center text-gray-600 mb-10">
          Farklı akademik seviyelere özel hazırlanmış mentorluk kaynaklarını keşfedin.
        </p>
        <TopicCard data={grades} />
      </section>
    </div>
  );
};

export default Mentoring;
