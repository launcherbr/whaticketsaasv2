export function getRandomRGBA() {
    const limiar = 190;

    const r = Math.floor(Math.random() * limiar);
    const g = Math.floor(Math.random() * limiar);
    const b = Math.floor(Math.random() * limiar);

    const a = Math.random() * 0.5 + 0.5;

    return `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;
}

// Função para gerar cores baseadas na paleta da marca
export function getBrandColorRGBA() {
    const brandColors = [
        { r: 0, g: 66, b: 218 }, // #0042DA
        { r: 125, g: 158, b: 233 }, // #7D9EE9
        { r: 0, g: 59, b: 184 }, // Variação mais escura do azul principal
        { r: 107, g: 143, b: 230 }, // Variação mais escura do azul claro
        { r: 30, g: 90, b: 235 }, // Tom intermediário
        { r: 150, g: 180, b: 240 }, // Tom mais claro
    ];

    const randomColor = brandColors[Math.floor(Math.random() * brandColors.length)];
    const a = Math.random() * 0.3 + 0.7; // Opacidade entre 0.7 e 1.0

    return `rgba(${randomColor.r}, ${randomColor.g}, ${randomColor.b}, ${a.toFixed(2)})`;
}
