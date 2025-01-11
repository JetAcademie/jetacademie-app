import axios from 'axios';
import { useEffect, useState } from 'react';
import SectionHeader from '../../components/SectionHeader.jsx';
import TopicCard from '../../components/TopicCard.jsx';
import { slugify } from '../../components/utils.js';

const Mentoring = () => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/grades');
        const transformedGrades = response.data.map((grade) => ({
          title: grade.gradeName || 'Bilinmeyen Sınıf',
          imageUrl: grade.thumbnailUrl || 'https://via.placeholder.com/150', // Varsayılan resim
          link: `/mentoring/${slugify(grade.gradeName)}`,
        }));
        setGrades(transformedGrades);
        setLoading(false);
      } catch (err) {
        setError('Veriler alınırken bir hata oluştu.');
        setLoading(false);
        console.log(err);
      }
    };

    fetchGrades();
  }, []);

  if (loading) {
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
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Mevcut Sınıflar
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Farklı akademik seviyelere özel hazırlanmış mentorluk kaynaklarını
          keşfedin.
        </p>
        <TopicCard data={grades} />
      </section>
    </div>
  );
};

export default Mentoring;
