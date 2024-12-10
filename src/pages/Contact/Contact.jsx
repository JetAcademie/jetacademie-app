import SectionHeader from "../../components/SectionHeader.jsx";
import ContactForm from "../../components/ContactForm.jsx";
import Map from "../../components/Map.jsx";
import LocationCard from "../../components/LocationCard.jsx";
import { locations } from "../../data/data.js";

function Contact() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <main className="flex-grow pt-[3rem]">
                <SectionHeader
                    title="Bize Ulaşın"
                    description="Sizi dinlemekten mutluluk duyarız! Aşağıdaki formu kullanarak bizimle iletişime geçebilir veya bir şubemizi ziyaret edebilirsiniz."
                />

                {/* Locations Section */}
                <section className="container mx-auto mt-12 px-4">
                    <h2 className="text-center text-3xl font-semibold mb-10">Şubelerimiz</h2>
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
                </section>

                {/* Map and Form */}
                <section className="container mx-auto mt-12 px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                        <div className="flex flex-col h-full">
                            <Map />
                        </div>
                        <div className="flex flex-col h-full">
                            <ContactForm />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Contact;
