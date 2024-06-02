export const matrizBase = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

export function grayErosion(image, mascara) {

    console.log("image", image);
    console.log("mascara", mascara);

    const result = []

    const base = image
    const n = image.length;
    const m = image[0].length;

    for (let i = 0; i < n; i++) {
        const resultLine = [];
        for (let j = 0; j < m; j++) {
            const currPixel = []
            for (let k = -1; k <= 1; k++) {
                for (let l = -1; l <= 1; l++) {
                    const row = i + k;
                    const col = j + l;

                    if (row >= 0 && row < n && col >= 0 && col < m) {
                        currPixel.push(base[row][col] - mascara[k + 1][l + 1])
                    } else {
                        currPixel.push(0)
                    }
                }
            }
            const minValue = Math.min(...currPixel);
            resultLine.push(minValue);
        }
        result.push(resultLine);
    }

    return result;
}

export function grayDilation(image, mascara) {
    const result = []

    const base = image
    const n = image.length;
    const m = image[0].length;

    for (let i = 0; i < n; i++) {
        const resultLine = [];
        for (let j = 0; j < m; j++) {
            const currPixel = []
            for (let k = -1; k <= 1; k++) {
                for (let l = -1; l <= 1; l++) {
                    const row = i + k;
                    const col = j + l;

                    if (row >= 0 && row < n && col >= 0 && col < m) {
                        currPixel.push(base[row][col] + mascara[k + 1][l + 1])
                    } else {
                        currPixel.push(0)
                    }
                }
            }
            const minValue = Math.max(...currPixel);
            resultLine.push(minValue);
        }
        result.push(resultLine);
    }

    return result;
}


export function binaryErosion(image, mascara) {

    const base = image
    const n = image.length;
    const m = image[0].length;

    const result = Array.from({ length: n }, () => Array(m).fill(255));

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            let coincide = true;

            for (let k = -1; k <= 1; k++) {
                for (let l = -1; l <= 1; l++) {
                    const row = i + k;
                    const col = j + l;

                    if (
                        row >= 0 &&
                        row < n &&
                        col >= 0 &&
                        col < m &&
                        mascara[k + 1][l + 1] == 0 &&
                        mascara[k + 1][l + 1] !== base[row][col]
                    ) {
                        coincide = false;
                        break;
                    }
                }

                if (!coincide) {
                    break;
                }
            }

            if (coincide) {
                for (let k = -1; k <= 1; k++) {
                    for (let l = -1; l <= 1; l++) {
                        const row = i + k;
                        const col = j + l;

                        if (
                            row >= 0 &&
                            row < n &&
                            col >= 0 &&
                            col < m &&
                            mascara[k + 1][l + 1] == 0
                        ) {
                            result[row][col] = 0;
                        }
                    }
                }
            }
        }
    }

    return result;
}

export function binaryDilation(image, mascara) {
    
    const base = image
    const n = image.length;
    const m = image[0].length;

    const result = Array.from({ length: n }, () => Array(m).fill(255));

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (mascara[1][1] == 0 && mascara[1][1] == base[i][j]) {
                for (let k = -1; k <= 1; k++) {
                    for (let l = -1; l <= 1; l++) {
                        const row = i + k;
                        const col = j + l;

                        if (row >= 0 && row < n && col >= 0 && col < m && mascara[k + 1][l + 1] == 0) {
                            result[row][col] = mascara[k + 1][l + 1]
                        }
                    }
                }
            }
        }
    }

    return result;
}

// Função para realizar a operação de abertura em uma imagem binária
export function binaryOpening(image, structuringElement, isBinary) {
    if (isBinary) {
        const resultbinaryErosion = binaryErosion(image, structuringElement);
        return binaryDilation(resultbinaryErosion, structuringElement);
    }
    const resultbinaryErosion = grayErosion(image, structuringElement);
    return binaryDilation(resultbinaryErosion, structuringElement);
}

// Função para realizar a operação de fechamento em uma imagem binária
export function binaryClosing(image, structuringElement, isBinary) {
    if (isBinary) {
        const resultbinaryDilation = binaryDilation(image, structuringElement);
        return binaryErosion(resultbinaryDilation, structuringElement);
    }
    const resultbinaryDilation = grayDilation(image, structuringElement);
    return grayErosion(resultbinaryDilation, structuringElement);
}

// Função para realizar a operação de binaryGradiente em uma imagem binária
export function binaryGradient(image, structuringElement, isBinary) {
    if (isBinary) {
        const resultbinaryDilation = binaryDilation(image, structuringElement);
        const resultbinaryErosion = binaryErosion(image, structuringElement);

        const resultbinaryGradient = [];
        for (let i = 0; i < image.length; i++) {
            resultbinaryGradient[i] = resultbinaryDilation[i] - resultbinaryErosion[i];
        }
        return resultbinaryGradient;
    }
    const resultGrayDilation = grayDilation(image, structuringElement);
    const resultGrayErosion = grayErosion(image, structuringElement);

    const resultgrayGradient = [];
    for (let i = 0; i < image.length; i++) {
        resultgrayGradient[i] = resultGrayDilation[i] - resultGrayErosion[i];
    }
    return resultgrayGradient;
}

// Função para realizar a operação de top hat em uma imagem binária
export function binaryTopHat(image, structuringElement, isBinary) {
    if (isBinary) {
        const resultbinaryOpening = binaryOpening(image, structuringElement, true);

        // Top Hat é a diferença entre a imagem original e a abertura
        const resultTopHat = [];
        for (let i = 0; i < image.length; i++) {
            resultTopHat[i] = image[i] - resultbinaryOpening[i];
        }

        return resultTopHat;
    }
    const resultbinaryOpening = binaryOpening(image, structuringElement, false);

    // Top Hat é a diferença entre a imagem original e a abertura
    const resultTopHat = [];
    for (let i = 0; i < image.length; i++) {
        resultTopHat[i] = image[i] - resultbinaryOpening[i];
    }

    return resultTopHat;
}

export function binaryBottomHat(image, structuringElement, isBinary) {
    if (isBinary) {
        const resultbinaryClosing = binaryClosing(image, structuringElement, true);

        const resultBottomHat = [];
        for (let i = 0; i < image.length; i++) {
            resultBottomHat[i] = resultbinaryClosing[i] - image[i];
        }

        return resultBottomHat;
    }
    const resultbinaryClosing = binaryClosing(image, structuringElement, false);

    const resultBottomHat = [];
    for (let i = 0; i < image.length; i++) {
        resultBottomHat[i] = resultbinaryClosing[i] - image[i];
    }

    return resultBottomHat;
}
