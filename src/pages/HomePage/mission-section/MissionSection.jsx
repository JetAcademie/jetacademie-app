function MissionSection() {
    return (
        <section className="py-10 bg-gray-100">
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
                        <h3 className="text-xl font-semibold mb-4">Our Mission:</h3>
                        <p className="text-gray-700 mb-6">
                            Our mission is to create a safe and supportive environment where
                            young people feel comfortable and can reach their full potential.
                            We aim to provide them with the tools and guidance they need to
                            develop into responsible and confident individuals.
                        </p>
                        <h3 className="text-xl font-semibold mb-4">Our Vision:</h3>
                        <p className="text-gray-700">
                            Our vision is a world where every young person has the chance to
                            grow, learn, and discover in an environment that inspires and
                            supports them. We believe young people are the future, and it is
                            our responsibility to equip them with the tools and confidence to
                            actively shape that future.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MissionSection;
