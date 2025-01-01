import { useRef } from "react";
import emailjs from "emailjs-com";

const ContactForm = () => {
    const formRef = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                "service_9odzo94",
                "template_bf7p4zf",
                e.target,
                "5P-JLa6PGxb4j_sEj"
            )
            .then(
                (result) => {
                    console.log("Email gönderildi:", result.text);
                    alert("Mesajınız başarıyla gönderildi!");
                },
                (error) => {
                    console.error("Email gönderme hatası:", error.text);
                    alert("Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.");
                }
            );

        e.target.reset();
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 mb-16">
            <h4 className="text-2xl font-extrabold mb-6 text-gray-800">Mesaj Bırakın</h4>
            <form ref={formRef} onSubmit={sendEmail}>
                <div className="mb-4">
                    <label htmlFor="from_name" className="block text-gray-700 font-medium mb-2">
                        Adınız
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            id="from_name"
                            name="from_name"
                            placeholder="Adınızı Girin"
                            required
                            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
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
                            name="email"
                            placeholder="E-posta Adresinizi Girin"
                            required
                            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
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
                        name="message"
                        placeholder="Mesajınızı buraya yazın"
                        required
                        rows="5"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
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
