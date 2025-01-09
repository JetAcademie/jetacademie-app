import { UserIcon } from '@heroicons/react/16/solid/index.js';
import { useState } from 'react';

const AdminModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const modalHandler = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Admin Icon */}
      <button onClick={modalHandler} className="btn btn-ghost btn-circle">
        <UserIcon className="h-6 w-6 text-white" />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white relative">
            {/* Kapatma Iconu */}
            <button
              onClick={modalHandler}
              className="absolute top-4 right-4 text-white hover:text-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

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
                <label className="block mb-1 text-white">Şifre</label>
                <input
                  type="password"
                  placeholder="Şifrenizi girin"
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
          </div>
        </div>
      )}
    </>
  );
};

export default AdminModal;
