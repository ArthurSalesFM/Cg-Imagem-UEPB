// Função para renderizar a imagem PGM no canvas usando a matriz
export function renderizarPGMNoCanvas({ largura, altura }, matriz, canvas) {
    canvas.width = largura; // Define a largura do canvas para a largura da imagem
    canvas.height = altura; // Define a altura do canvas para a altura da imagem

    const ctx = canvas.getContext('2d'); // Obtém o contexto 2D do canvas
    const imageData = ctx.createImageData(largura, altura); // Cria um novo ImageData com as dimensões da imagem

    for (let y = 0; y < altura; y++) {
        for (let x = 0; x < largura; x++) {
            const valorPixel = matriz[y][x]; // Obtém o valor do pixel na posição (x, y) da matriz
            const i = (y * largura + x) * 4; // Calcula o índice na matriz de pixels

            // Supondo que os valores da matriz estão na escala de 0 a 255
            imageData.data[i] = valorPixel;         // Define o valor R (vermelho)
            imageData.data[i + 1] = valorPixel;     // Define o valor G (verde)
            imageData.data[i + 2] = valorPixel;     // Define o valor B (azul)
            imageData.data[i + 3] = 255;            // Define o valor A (opacidade) como totalmente opaco
        }
    }

    ctx.putImageData(imageData, 0, 0); // Desenha a imagem no canvas
}

