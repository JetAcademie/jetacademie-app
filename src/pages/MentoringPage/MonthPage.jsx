import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SectionHeader from "../../components/SectionHeader";
import { slugify } from "../../components/utils";

const MonthPage = () => {
  const { gradeSlug, monthSlug } = useParams();

  const monthMapping = {
    "eylul": 1,
    "ekim": 2,
    "kasim": 3,
    "aralik": 4,
    "kis-kampi": 5,
    "ocak": 6,
    "subat": 7,
    "mart": 8,
    "nisan": 9,
    "mayis": 10,
    "haziran": 11,
    "yaz-kampi": 12,
  };

  const [materials, setMaterials] = useState({ documents: [], videos: [], links: [] });
  const [gradeTitle, setGradeTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        console.log("gradeSlug:", gradeSlug);
        console.log("monthSlug:", monthSlug);
        console.log("monthId:", monthMapping[monthSlug]);

        if (!monthMapping[monthSlug]) {
          throw new Error(`Geçersiz ay slug: ${monthSlug}`);
        }

        const gradesResponse = await axios.get("http://localhost:8080/api/grades");
        const grade = gradesResponse.data.find((g) => slugify(g.gradeName) === gradeSlug);

        if (!grade) {
          throw new Error("Sınıf bulunamadı.");
        }

        setGradeTitle(grade.gradeName);

        const materialsResponse = await axios.get(
            `http://localhost:8080/api/materials?gradeId=${grade.gradeId}&monthId=${monthMapping[monthSlug]}`
        );

        if (!materialsResponse.data.length) {
          throw new Error("Hiçbir materyal bulunamadı.");
        }

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
  }, [gradeSlug, monthSlug]);

  if (loading) {
    return <div className="text-center mt-10">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  const { documents, videos, links } = materials;

  return (
      <div>
        <SectionHeader title={gradeTitle} description={`${monthSlug} ayına ait materyalleri görüntülüyorsunuz.`} />
        <div>
          <h2>Dokümanlar</h2>
          {documents.map((doc) => (
              <a href={doc.url} key={doc.materialId} target="_blank" rel="noreferrer">
                {doc.name}
              </a>
          ))}

          <h2>Videolar</h2>
          {videos.map((video) => (
              <iframe key={video.materialId} src={video.url} title={video.name} frameBorder="0"></iframe>
          ))}

          <h2>Linkler</h2>
          {links.map((link) => (
              <a href={link.url} key={link.materialId} target="_blank" rel="noreferrer">
                {link.name}
              </a>
          ))}
        </div>
      </div>
  );
};

export default MonthPage;
