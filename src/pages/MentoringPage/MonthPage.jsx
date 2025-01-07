import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SectionHeader from "../../components/SectionHeader";
import Axios from "../../utils/axios";

const MonthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { grade, month } = location.state || {};
  const [materials, setMaterials] = useState({ documents: [], videos: [], links: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      if (!grade || !month) return;

      try {
        const materialsResponse = await Axios.get(
          `materials?gradeId=${grade.id}&monthId=${month.id}`,
        );

        const groupedMaterials = { documents: [], videos: [], links: [] };
        materialsResponse.data.forEach((material) => {
          if (material.type === "documents") groupedMaterials.documents.push(material);
          else if (material.type === "videos") groupedMaterials.videos.push(material);
          else if (material.type === "links") groupedMaterials.links.push(material);
        });

        setMaterials(groupedMaterials);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Materyaller yüklenirken bir hata oluştu.");
        setLoading(false);
      }
    };

    fetchMaterials();
  }, [grade, month]);

  // Eğer state yoksa ana sayfaya yönlendir
  if (!grade || !month) {
    navigate("/mentoring");
    return null;
  }

  if (loading) {
    return <div className="text-center mt-10">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  const { documents, videos, links } = materials;

  return (
    <div className="container mx-auto py-10 px-6">
      {/* Başlık */}
      <SectionHeader
        title={grade.name}
        description={`Bu sayfa ${month.name} ayına ait tüm materyalleri içermektedir.`}
      />

      {/* İçerik Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        {/* PDF Dokümanları */}
        <div className="md:col-span-2">
          <h2 className="text-3xl font-bold text-gray-700 mb-6 border-b-2 border-green-500 pb-2">
            PDF Dokümanları
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition transform hover:scale-105"
              >
                {/* PDF Preview */}
                <div className="bg-gray-100 h-48 flex items-center justify-center">
                  <embed
                    src={doc.url}
                    type="application/pdf"
                    className="w-full h-full"
                    title={doc.name}
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-bold text-gray-700 px-4">{doc.name}</h3>
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    Görüntüle / İndir
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ek Linkler */}
        <div className="md:col-span-1">
          <h2 className="text-3xl font-bold text-gray-700 mb-6 border-b-2 border-yellow-500 pb-2">
            Ek Linkler
          </h2>
          <ul className="space-y-3">
            {links.map((link, index) => (
              <li
                key={index}
                className="bg-gray-50 p-4 rounded-lg shadow-md border hover:shadow-lg transition"
              >
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline font-medium"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Videolar */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-gray-700 mb-6 border-b-2 border-blue-500 pb-2">
          Videolar
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <div key={index} className="rounded-lg shadow-md overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${new URL(video.url).searchParams.get("v")}`}
                title={video.title}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-48 md:h-56 rounded-md"
              ></iframe>
              <h3 className="text-md font-bold text-gray-800 mt-2 text-center">{video.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonthPage;
