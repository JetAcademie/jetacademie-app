import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../api/axios';
import SectionHeader from '../../components/SectionHeader';
import { slugify } from '../../components/utils.js';

const ClassPage = () => {
  const { gradeSlug } = useParams();
  const [months, setMonths] = useState([]);
  const [gradeTitle, setGradeTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMonths = async () => {
      try {
        const gradesResponse = await api.get('/grades');
        const grade = gradesResponse.data.find(
          (g) => slugify(g.gradeName) === gradeSlug
        );

        if (!grade) {
          throw new Error('Sınıf bulunamadı.');
        }

        setGradeTitle(grade.gradeName);

        const monthsResponse = await api.get(
          `/months?gradeId=${grade.gradeId}`
        );
        setMonths(monthsResponse.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Ay bilgileri yüklenirken bir hata oluştu.');
        setLoading(false);
      }
    };

    fetchMonths();
  }, [gradeSlug]);

  if (loading) {
    return (
      <div>
        <SectionHeader
          title="Yükleniyor..."
          description="Lütfen bekleyin, ay bilgileri yükleniyor."
        />
        <div className="container mx-auto py-10 px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(9)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-gray-200 text-center p-6 rounded-lg shadow"
              >
                <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto mb-4"></div>
                <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div>
      <SectionHeader
        title={gradeTitle}
        description={`${gradeTitle} için tüm ayları görüntüleyin.`}
      />
      <div className="container mx-auto py-10 px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {months.map((month) => (
            <Link
              key={month.monthId}
              to={`/mentoring/${slugify(gradeTitle)}/${slugify(month.monthName)}`}
              className="bg-blue-100 text-center p-6 rounded-lg shadow hover:shadow-lg hover:bg-blue-200 transition"
            >
              <h3 className="text-lg font-bold text-gray-800">
                {month.monthName}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassPage;
