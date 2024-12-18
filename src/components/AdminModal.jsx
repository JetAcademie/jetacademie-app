import { useState } from "react";

const AdminModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <>
            {/* Admin Icon */}
            <button onClick={openModal} className="btn btn-ghost btn-circle">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/8747/8747923.png"
                    alt="User Icon"
                    className="w-10 h-10"
                />
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="modal modal-open">
                    <div className="modal-box bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white">
                        <h3 className="font-bold text-lg mb-4">Admin Girişi</h3>
                        <form className="space-y-4">
                            <div>
                                <label className="block mb-1 text-white">Kullanıcı Adı</label>
                                <input
                                    type="text"
                                    placeholder="Kullanıcı adınızı girin"
                                    className="input input-bordered w-full bg-white text-gray-800"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 text-white">Sifre</label>
                                <input
                                    type="email"
                                    placeholder="Sifrenizi girin"
                                    className="input input-bordered w-full bg-white text-gray-800"
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn w-full bg-blue-800 hover:bg-blue-900 text-white"
                            >
                                Giriş Yap
                            </button>

                        </form>
                        <div className="modal-action">
                        <button onClick={closeModal} className="btn">
                                Kapat
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AdminModal;
