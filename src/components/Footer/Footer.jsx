const Footer = () => {
    return (
        <footer className="bg-[#16407a] text-white py-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <h5 className="text-lg font-bold mb-4 border-b-2 border-gray-300 pb-2">
                            Adres
                        </h5>
                        <p className="text-gray-300">
                            Kunstlaan 3,
                            <br />
                            1210 Brussel
                        </p>
                    </div>

                    <div>
                        <h5 className="text-lg font-bold mb-4 border-b-2 border-gray-300 pb-2">
                            Irtibat
                        </h5>
                        <p className="text-gray-300">
                            info@vzwjet.be
                            <br />
                            +32 488 60 36 98
                        </p>
                    </div>

                    <div>
                        <h5 className="text-lg font-bold mb-4 border-b-2 border-gray-300 pb-2">
                            Bolge mailleri:
                        </h5>
                        <ul className="text-gray-300 space-y-2">
                            <li>antwerpen@vzwjet.be</li>
                            <li>limburg@vzwjet.be</li>
                            <li>gent@vzwjet.be</li>
                            <li>brussel@vzwjet.be</li>
                            <li>leuven@vzwjet.be</li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="text-lg font-bold mb-4 border-b-2 border-gray-300 pb-2 text-center">
                            Bizi Takip Edin
                        </h5>
                        <div className="flex justify-center space-x-6">
                            <a
                                href="https://www.instagram.com/vzwjet/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-300 hover:text-gray-100 transition duration-300"
                            >
                                <i className="fab fa-instagram fa-2x"></i>
                            </a>
                            <a
                                href="https://www.youtube.com/@JeugdenToekomst"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-300 hover:text-gray-100 transition duration-300"
                            >
                                <i className="fab fa-youtube fa-2x"></i>
                            </a>
                            <a
                                href="https://www.facebook.com/vzwjet"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-300 hover:text-gray-100 transition duration-300"
                            >
                                <i className="fab fa-facebook fa-2x"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-500 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between text-gray-300">
                    <div className="text-center md:text-left text-sm">
                        &copy; 2024. Alle rechten voorbehouden aan{" "}
                        <a
                            href="#"
                            className="text-green-400 hover:text-green-300 transition duration-300"
                        >
                            vzw JET
                        </a>
                    </div>
                    <div className="my-4 md:my-0">
                        <img
                            src="https://vzwjet.be/wp-content/uploads/2024/05/vzw-jet-logo.png"
                            alt="Logo"
                            className="max-w-[80px] mx-auto"
                        />
                    </div>
                    <div className="text-center md:text-right text-sm">
                        Designed by{" "}
                        <span className="font-semibold text-green-400 hover:text-green-300 transition duration-300">
              JET
            </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
