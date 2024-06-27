export function zoom(image, factor) {
    const transformMatrix = [
        [factor, 0, 0],
        [0, factor, 0],
        [0, 0, 1]
    ];
    return affineTransformZoom(image, transformMatrix);
}

export function rotate(image, angle) {
    const rad = angle * Math.PI / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);

    const transformMatrix = [
        [cos, -sin, 0],
        [sin, cos, 0],
        [0, 0, 1]
    ];

    return affineTransformRotate(image, transformMatrix);
}

export function reflect(image, axis) {
    let transformMatrix;
    if (axis === 'horizontal') {
        transformMatrix = [
            [-1, 0, image[0].length - 1],
            [0, 1, 0],
            [0, 0, 1]
        ];
    } else if (axis === 'vertical') {
        transformMatrix = [
            [1, 0, 0],
            [0, -1, image.length - 1],
            [0, 0, 1]
        ];
    }
    return affineTransformReflect(image, transformMatrix);
}









export function warping(image, a, b, c, d, e, f, i, j) {
    return affineTransformWarping(image, a, b, c, d, e, f, i, j);
}

function affineTransformWarping(image, a, b, c, d, e, f, i, j) {
    const width = image.length;
    const height = image[0].length;
    const newImageData = Array.from({ length: width }, () => Array(height).fill(255)); // 255 para fundo branco

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const denominator = i * x + j * y + 1;
            const newX = Math.round((a * x + b * y + c) / denominator);
            const newY = Math.round((d * x + e * y + f) / denominator);

            if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
                newImageData[newY][newX] = image[y][x];
            }
        }
    }

    return newImageData;
}

function affineTransformZoom(image, transformMatrix) {
    const width = image.length;
    const height = image[0].length;

    const newWidth = Math.abs(Math.floor(width * transformMatrix[0][0])) + Math.abs(Math.floor(height * transformMatrix[1][0]));
    const newHeight = Math.abs(Math.floor(width * transformMatrix[0][1])) + Math.abs(Math.floor(height * transformMatrix[1][1]));

    const newImageData = Array.from({ length: newWidth }, () => Array(newHeight).fill(255)); // 255 para fundo branco

    const inverseMatrix = invertMatrix(transformMatrix);

    for (let y = 0; y < newHeight; y++) {
        for (let x = 0; x < newWidth; x++) {
            const newCoords = multiplyMatrixAndPoint(inverseMatrix, [x, y, 1]);
            const newX = Math.floor(newCoords[0]);
            const newY = Math.floor(newCoords[1]);

            if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
                newImageData[x][y] = image[newX][newY];
            }
        }
    }

    return newImageData;
}

function affineTransformReflect(image, transformMatrix) {
    const width = image.length;
    const height = image[0].length;
    const maxVal = pegarMax(image);
    const imageData = image;

    // Calculando novas dimensões da imagem
    const newWidth = Math.abs(Math.floor(width * transformMatrix[0][0])) + Math.abs(Math.floor(height * transformMatrix[1][0]));
    const newHeight = Math.abs(Math.floor(width * transformMatrix[0][1])) + Math.abs(Math.floor(height * transformMatrix[1][1]));

    // Ajustando para a reflexão
    const newImageData = Array.from({ length: width }, () => Array(height).fill(255)); // 255 para fundo branco

    const inverseMatrix = invertMatrix(transformMatrix);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const newCoords = multiplyMatrixAndPoint(inverseMatrix, [x, y, 1]);
            const newX = Math.round(newCoords[0]);
            const newY = Math.round(newCoords[1]);

            if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
                newImageData[newX][newY] = imageData[x][y];
            }
        }
    }

    return newImageData;
}

function affineTransformRotate(image, transformMatrix) {
    const width = image.length;
    const height = image[0].length;
    const maxVal = pegarMax(image); // Assumindo que essa função pega o valor máximo da imagem
    const imageData = image;

    // Calculando novas dimensões da imagem
    const newWidth = Math.abs(Math.floor(width * transformMatrix[0][0])) + Math.abs(Math.floor(height * transformMatrix[1][0]));
    const newHeight = Math.abs(Math.floor(width * transformMatrix[0][1])) + Math.abs(Math.floor(height * transformMatrix[1][1]));

    // Dimensão máxima para garantir que a nova imagem seja um quadrado
    const maxDimension = Math.max(newWidth, newHeight);

    const newImageData = Array.from({ length: maxDimension }, () => Array(maxDimension).fill(255)); // 255 para fundo branco

    const inverseMatrix = invertMatrixRotate(transformMatrix);

    for (let y = 0; y < maxDimension; y++) {
        for (let x = 0; x < maxDimension; x++) {
            const newCoords = multiplyMatrixAndPointRotate(inverseMatrix, [x - maxDimension / 2, y - maxDimension / 2, 1]);
            const newX = Math.round(newCoords[0] + width / 2);
            const newY = Math.round(newCoords[1] + height / 2);

            // Ajustando o ponto (0,0) para a parte inferior esquerda
            const adjustedY = height - 1 - newY;

            if (newX >= 0 && newX < width && adjustedY >= 0 && adjustedY < height) {
                newImageData[y][x] = imageData[adjustedY][newX];
            }
        }
    }

    return newImageData;
}

function multiplyMatrixAndPointRotate(matrix, point) {
    const result = [];
    for (let i = 0; i < matrix.length; i++) {
        let sum = 0;
        for (let j = 0; j < point.length; j++) {
            sum += matrix[i][j] * point[j];
        }
        result.push(sum);
    }
    return result;
}

function invertMatrixRotate(matrix) {
    // Aqui você pode implementar a inversão de matriz ou usar uma biblioteca de álgebra linear.
    // Este é um exemplo simplificado. Em um caso real, você deve usar uma implementação robusta.
    const [[a, b, c], [d, e, f], [g, h, i]] = matrix;
    const det = a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;
    if (det === 0) {
        throw new Error("Matrix is not invertible");
    }
    const invDet = 1 / det;
    const result = [
        [(e * i - f * h) * invDet, (c * h - b * i) * invDet, (b * f - c * e) * invDet],
        [(f * g - d * i) * invDet, (a * i - c * g) * invDet, (c * d - a * f) * invDet],
        [(d * h - e * g) * invDet, (b * g - a * h) * invDet, (a * e - b * d) * invDet]
    ];
    return result;
}


function multiplyMatrixAndPoint(matrix, point) {
    const [x, y, z] = point;
    const newPoint = [
        matrix[0][0] * x + matrix[0][1] * y + matrix[0][2] * z,
        matrix[1][0] * x + matrix[1][1] * y + matrix[1][2] * z,
        matrix[2][0] * x + matrix[2][1] * y + matrix[2][2] * z
    ];
    return newPoint;
}

export function pegarMax(matriz) {
    let max = 0;
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[i].length; j++) {
            if (matriz[i][j] > max) {
                max = matriz[i][j];
            }
        }
    }
    return max;
}

export function pegarMin(matriz) {
    let min = 0;
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[i].length; j++) {
            if (matriz[i][j] < min) {
                min = matriz[i][j];
            }
        }
    }
    return min;
}


function invertMatrix(matrix) {
    const [a, b, c, d, e, f, g, h, i] = matrix.flat();
    const det = a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);

    if (det === 0) throw new Error("Matrix is not invertible");

    const invDet = 1 / det;
    return [
        [
            (e * i - f * h) * invDet,
            (c * h - b * i) * invDet,
            (b * f - c * e) * invDet
        ],
        [
            (f * g - d * i) * invDet,
            (a * i - c * g) * invDet,
            (c * d - a * f) * invDet
        ],
        [
            (d * h - e * g) * invDet,
            (b * g - a * h) * invDet,
            (a * e - b * d) * invDet
        ]
    ];
}
