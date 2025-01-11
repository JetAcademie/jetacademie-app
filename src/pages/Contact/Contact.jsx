import { useEffect, useState } from 'react';
import ContactForm from '../../components/ContactForm.jsx';
import LocationCard from '../../components/LocationCard.jsx';
import Map from '../../components/Map.jsx';
import SectionHeader from '../../components/SectionHeader.jsx';
import { locations } from '../../data/data.js';

function Contact() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 0.1);

    return () => clearTimeout(timer); // Temizleme
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow pt-[3rem]">
        <SectionHeader
          title="Bize Ulaşın"
          description="Sizi dinlemekten mutluluk duyarız! Aşağıdaki formu kullanarak bizimle iletişime geçebilir veya bir şubemizi ziyaret edebilirsiniz."
        />

        {/* Locations Section */}
        <section className="container mx-auto mt-12 px-4">
          <h2 className="text-center text-3xl font-semibold mb-10 text-black">
            Şubelerimiz
          </h2>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse flex flex-col items-center bg-gray-200 shadow-lg rounded-lg p-4"
                >
                  <div className="h-10 w-10 bg-gray-300 rounded-full mb-4"></div>
                  <div className="h-6 w-3/4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {locations.map((location, index) => (
                <LocationCard
                  key={index}
                  icon={location.icon}
                  title={location.title}
                  email={location.email}
                />
              ))}
            </div>
          )}
        </section>

        {/* Map and Form */}
        <section className="container mx-auto mt-12 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            {loading ? (
              <>
                <div className="flex flex-col h-full animate-pulse">
                  <div className="h-64 w-full bg-gray-300 rounded"></div>
                </div>
                <div className="flex flex-col h-full animate-pulse">
                  <div className="h-12 w-3/4 bg-gray-300 rounded mb-4"></div>
                  <div className="h-12 w-full bg-gray-300 rounded mb-4"></div>
                  <div className="h-12 w-full bg-gray-300 rounded mb-4"></div>
                  <div className="h-12 w-1/2 bg-gray-300 rounded"></div>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col h-full">
                  <Map />
                </div>
                <div className="flex flex-col h-full">
                  <ContactForm />
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Contact;
