import { useLocation, useNavigate } from "react-router-dom";
import SectionHeader from "../../components/SectionHeader";
import { useMonths } from "../../hooks/useMonths.js";

const ClassPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const grade = location.state?.grade;
  const { data: months = [], isLoading: monthsLoading, error: monthsError } = useMonths(grade?.id);

  // Eğer state yoksa ana sayfaya yönlendir
  if (!grade) {
    navigate("/mentoring");
    return null;
  }

  if (monthsLoading) {
    return <div className="text-center mt-10">Yükleniyor...</div>;
  }

  if (monthsError) {
    return <div className="text-center mt-10 text-red-500">Veriler alınırken bir hata oluştu.</div>;
  }

  return (
    <div>
      <SectionHeader
        title={grade.name}
        description={`${grade.name} için tüm ayları görüntüleyin.`}
      />
      <div className="container mx-auto py-10 px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {months.map((month) => (
            <div
              key={month.monthId}
              onClick={() =>
                navigate("/mentoring/month", {
                  state: {
                    grade,
                    month: {
                      id: month.monthId,
                      name: month.monthName,
                    },
                  },
                })
              }
              className="bg-blue-100 text-center p-6 rounded-lg shadow hover:shadow-lg hover:bg-blue-200 transition cursor-pointer"
            >
              <h3 className="text-lg font-bold text-gray-800">{month.monthName}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassPage;
