
// Função para criar uma matriz 256x256 com os valores dos pixels
export function criarMatriz({ largura, altura, pixels }) {    
    const matriz = [];

    for (let y = 0; y < altura; y++) {
        const linha = [];
        for (let x = 0; x < largura; x++) {
            const index = y * largura + x;
            linha.push(pixels[index]);
        }
        matriz.push(linha);
    }
    return matriz;
}

