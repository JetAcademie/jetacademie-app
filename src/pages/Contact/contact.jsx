import Navbar from "../HomePage/Navbar/Navbar";
import Footer from "../HomePage/footer/Footer";

function Contact() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <main className="flex-grow pt-[5rem]"> {/* Navbar'ın yüksekliğine göre padding-top */}
                {/* Header */}
                <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 shadow-md">
                    <h1 className="text-center text-4xl font-extrabold tracking-wide">
                        Contact Us
                    </h1>
                    <p className="text-center mt-2 text-lg">
                        We’d love to hear from you! Feel free to reach out using the form
                        below or visit one of our locations.
                    </p>
                </header>

                {/* Locations Section */}
                <section className="container mx-auto mt-12 px-4">
                    <h2 className="text-center text-3xl font-semibold mb-10">
                        Our Locations
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: "fas fa-envelope",
                                title: "General Email Address",
                                email: "info@vzwjet.be",
                            },
                            {
                                icon: "fas fa-city",
                                title: "Brussels",
                                email: "brussels@vzwjet.be",
                            },
                            {
                                icon: "fas fa-landmark",
                                title: "Antwerp",
                                email: "antwerp@vzwjet.be",
                            },
                            {
                                icon: "fas fa-university",
                                title: "Flemish Brabant",
                                email: "leuven@vzwjet.be",
                            },
                            {
                                icon: "fas fa-map-marked-alt",
                                title: "Limburg",
                                email: "limburg@vzwjet.be",
                            },
                            {
                                icon: "fas fa-church",
                                title: "Ghent",
                                email: "ghent@vzwjet.be",
                            },
                        ].map((location, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-br from-white to-gray-100 rounded-xl shadow-lg p-6 border border-gray-300 transform hover:scale-105 hover:shadow-2xl transition-transform duration-300"
                            >
                                <h5 className="text-xl font-bold flex items-center mb-4 text-gray-800">
                                    <i className={`${location.icon} text-blue-500 mr-3`}></i>
                                    {location.title}
                                </h5>
                                <p className="text-gray-600">Email: {location.email}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact Section with Map and Form */}
                <section className="container mx-auto mt-12 px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                        {/* Google Map */}
                        <div className="relative overflow-hidden rounded-xl shadow-lg">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2519.398973738911!2d4.3642118157494015!3d50.84832457953126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c4853e3d955b%3A0xddb57f1cbe1237e1!2sAvenue%20des%20Arts%203%2C%201210%20Saint-Josse-ten-Noode!5e0!3m2!1sen!2sbe!4v1632134567801!5m2!1sen!2sbe"
                                width="100%"
                                height="400"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                title="Google Map"
                                className="rounded-xl"
                            ></iframe>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                            <h4 className="text-2xl font-extrabold mb-6 text-gray-800">
                                Leave a Message
                            </h4>
                            <form>
                                <div className="mb-4">
                                    <label
                                        htmlFor="name"
                                        className="block text-gray-700 font-medium mb-2"
                                    >
                                        Name
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="name"
                                            placeholder="Your Name"
                                            required
                                            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <i className="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="email"
                                        className="block text-gray-700 font-medium mb-2"
                                    >
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            id="email"
                                            placeholder="Your Email Address"
                                            required
                                            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <i className="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="message"
                                        className="block text-gray-700 font-medium mb-2"
                                    >
                                        Your Message
                                    </label>
                                    <textarea
                                        id="message"
                                        placeholder="Write your message here"
                                        required
                                        rows="5"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-medium hover:opacity-90 transition duration-300"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default Contact;
