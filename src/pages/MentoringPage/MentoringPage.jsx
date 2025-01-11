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

        setTimeout(() => {
          setGrades(transformedGrades);
          setLoading(false);
        }, 0.1);
      } catch (err) {
        setError('Veriler alınırken bir hata oluştu.');
        setLoading(false);
        console.log(err);
      }
    };

    fetchGrades();
  }, []);

  return (
    <div className="bg-white">
      <div className="flex-grow pt-[3rem]">
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

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, index) => (
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
          <TopicCard data={grades} />
        )}
      </section>
    </div>
  );
};

export default Mentoring;
