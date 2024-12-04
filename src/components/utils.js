// Renk Paleti Sabiti
export const colorPalettes = [
    ["#FFC107", "#FFD54F"], // Sarı tonları
    ["#2196F3", "#64B5F6"], // Mavi tonları
    ["#4CAF50", "#81C784"], // Yeşil tonları
    ["#FF5722", "#FF8A65"], // Turuncu tonları
    ["#9C27B0", "#BA68C8"], // Mor tonları
];

// Rastgele renk seçimi yapan fonksiyon
export const getRandomColors = () => {
    return colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
};


export const slugify = (str) => {
    return str
        .toLowerCase()
        .replace(/ç/g, "c")
        .replace(/ğ/g, "g")
        .replace(/ı/g, "i")
        .replace(/ö/g, "o")
        .replace(/ş/g, "s")
        .replace(/ü/g, "u")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
};