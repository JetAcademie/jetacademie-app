import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import SectionHeader from "../../components/SectionHeader";
import { slugify } from "../../components/utils.js";
import { useGrades } from "../../hooks/useGrades.js";
import { useMonths } from "../../hooks/useMonths.js";

const ClassPage = () => {
  const { gradeSlug } = useParams();
  const { data: grades, isLoading: gradesLoading, error: gradesError } = useGrades();
  const [gradeTitle, setGradeTitle] = useState("");

  // Mevcut sınıfı bul
  const currentGrade = grades?.find((g) => slugify(g.gradeName) === gradeSlug);

  // Ayları getir
  const {
    data: months = [],
    isLoading: monthsLoading,
    error: monthsError,
  } = useMonths(currentGrade?.gradeId);

  // Sınıf başlığını güncelle
  if (currentGrade && !gradeTitle) {
    setGradeTitle(currentGrade.gradeName);
  }

  if (gradesLoading || monthsLoading) {
    return <div className="text-center mt-10">Yükleniyor...</div>;
  }

  const error = gradesError || monthsError;
  if (error) {
    return <div className="text-center mt-10 text-red-500">Veriler alınırken bir hata oluştu.</div>;
  }

  if (!currentGrade) {
    return <div className="text-center mt-10 text-red-500">Sınıf bulunamadı.</div>;
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
              <h3 className="text-lg font-bold text-gray-800">{month.monthName}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassPage;
