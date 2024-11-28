function MissionSection() {
    return (
        <section id="mission-section" className="py-10 bg-gray-100">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap">
                    {/* Left Side: Video */}
                    <div className="w-full md:w-1/2 px-4">
                        <div className="relative w-full h-[500px]">
                            <iframe
                                className="absolute top-0 left-0 w-full h-full rounded-md"
                                src="https://www.youtube.com/embed/Q4xjrbrBQL8"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>


                    {/* Right Side: Mission & Vision */}
                    <div className="w-full md:w-1/2 px-4 bg-white p-6 rounded-lg shadow">
                        <h3 className="text-xl font-semibold mb-4">Misyonumuz:</h3>
                        <p className="text-gray-700 mb-6">
                            Misyonumuz, gençlerin kendilerini rahat hissedebileceği, güvenli ve destekleyici bir
                            ortam oluşturarak onların potansiyellerini tam anlamıyla ortaya koymalarını sağlamaktır.
                            Sorumlu ve kendine güvenen bireyler olarak gelişmeleri için gerekli olan araçları ve
                            rehberliği sunmayı amaçlıyoruz.
                        </p>
                        <h3 className="text-xl font-semibold mb-4">Vizyonumuz</h3>
                        <p className="text-gray-700">
                            Vizyonumuz, her gencin öğrenip büyüyebileceği ve ilham alarak desteklendiği bir dünya yaratmaktır.
                            Gençlerin geleceğin yapı taşları olduğuna inanıyoruz ve onlara bu geleceği aktif bir şekilde şekillendirebilmeleri için gerekli araçları
                            ve özgüveni kazandırmanın bizim sorumluluğumuz olduğunu düşünüyoruz.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MissionSection;
