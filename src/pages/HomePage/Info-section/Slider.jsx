import { useState, useEffect } from "react";
import NavigationButton from "./NavigationButton";

const Slider = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setCurrentIndex((prev) => (prev + 1) % slides.length), 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    const updateIndex = (newIndex) => {
        setCurrentIndex((newIndex + slides.length) % slides.length);
    };

    return (
        <div className="mt-16 relative overflow-hidden rounded-lg max-w-lg mx-auto">
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                }}
            >
                {slides.map((slide) => (
                    <img
                        key={slide.id}
                        src={slide.imageUrl}
                        alt={slide.altText}
                        className="w-full flex-none object-cover"
                    />
                ))}
            </div>

            <NavigationButton direction="prev" onClick={() => updateIndex(currentIndex - 1)} />

            <NavigationButton direction="next" onClick={() => updateIndex(currentIndex + 1)} />
        </div>
    );
};

export default Slider;
