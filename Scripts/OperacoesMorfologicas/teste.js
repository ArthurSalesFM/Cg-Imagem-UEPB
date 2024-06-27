import * as op from './operadores-morfologicos.js';

export function binaryErosion(image, mascara) {

    let newImage;

    const n = image.length;
    const m = image[0].length;

    image = op.pegarMediaImagem(image);

    const result = Array.from({ length: n }, () => Array(m).fill(255));

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            let coincide = true;

            for (let k = 0; k < mascara.length; k++) {
                for (let l = 0; l < mascara[k].length; l++) {
                    const row = i + k - 1;
                    const col = j + l - 1;

                    if (
                        mascara[k][l] === 0 &&
                        (row < 0 || row >= n || col < 0 || col >= m || mascara[k][l] !== image[row][col])
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
                for (let k = 0; k < mascara.length; k++) {
                    for (let l = 0; l < mascara[k].length; l++) {
                        const row = i + k - 1;
                        const col = j + l - 1;

                        if (
                            mascara[k][l] === 0 &&
                            row >= 0 && row < n && col >= 0 && col < m
                        ) {
                            result[row][col] = 0;
                        }
                    }
                }
            }
        }
    }

    console.log("result", result);

    return result;
}
