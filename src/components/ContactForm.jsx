const ContactForm = () => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 mb-16">
            <h4 className="text-2xl font-extrabold mb-6 text-gray-800">Mesaj Bırakın</h4>
            <form>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                        Adınız
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            id="name"
                            placeholder="Adınızı Girin"
                            required
                            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <i className="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                        E-posta Adresiniz
                    </label>
                    <div className="relative">
                        <input
                            type="email"
                            id="email"
                            placeholder="E-posta Adresinizi Girin"
                            required
                            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <i className="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                        Mesajınız
                    </label>
                    <textarea
                        id="message"
                        placeholder="Mesajınızı buraya yazın"
                        required
                        rows="5"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-medium hover:opacity-90 transition duration-300"
                >
                    Gönder
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
