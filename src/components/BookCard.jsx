import PropTypes from "prop-types";

const BookCard = ({ title, imageUrl }) => {
    // Varsayılan renk paleti
    const colorPalettes = [
        ["#FFC107", "#FFD54F"], // Sarı tonları
        ["#2196F3", "#64B5F6"], // Mavi tonları
        ["#4CAF50", "#81C784"], // Yeşil tonları
        ["#FF5722", "#FF8A65"], // Turuncu tonları
        ["#9C27B0", "#BA68C8"], // Mor tonları
    ];

    // Rastgele bir renk seç
    const colors = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];

    return (
        <div className="flex flex-col items-center bg-white shadow-md rounded-lg overflow-hidden">
            {/* Dinamik Üst Çizgi */}
            <div
                className={`w-full h-1`}
                style={{
                    background: `linear-gradient(to right, ${colors[0]}, ${colors[1]})`,
                }}
            ></div>

            {/* Resim */}
            <img
                src={imageUrl}
                alt={title}
                className="w-32 h-32 object-cover mt-4"
            />

            {/* Başlık */}
            <h3 className="mt-4 text-center text-gray-800 text-lg font-semibold">
                {title}
            </h3>

            {/* Dinamik Alt Çizgi */}
            <div
                className={`w-full h-1 mt-4`}
                style={{
                    background: `linear-gradient(to right, ${colors[0]}, ${colors[1]})`,
                }}
            ></div>
        </div>
    );
};

BookCard.propTypes = {
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
};

export default BookCard;
