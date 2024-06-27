
// Função para aplicar a transformação negativo em uma imagem
export function negativo(image) {
    try {
        
        const newPixels = []
        image.forEach(pixelLine => {
            const newPixelLine = [];
            pixelLine.forEach(pixel => newPixelLine.push(255 - pixel))
            newPixels.push(newPixelLine)
        });
    
        return newPixels;
    } catch (err) {
        console.log(err)
    }

}

export function gama(image, param) {
    const newPixels = []
    image.forEach(pixelLine => {
        const newPixelLine = [];
        pixelLine.forEach(pixel => newPixelLine.push(Math.sqrt(Math.pow(pixel / 255, param) * 255)))
        newPixels.push(newPixelLine)
    });
    console.log(newPixels)
    return newPixels;
}

// Função para aplicar a transformação logaritmo em uma imagem
export function logaritmo(image, param) {
    const newPixels = []
    image.forEach(pixelLine => {
        const newPixelLine = [];
        pixelLine.forEach(pixel => newPixelLine.push(param * Math.log(pixel + 1)))
        newPixels.push(newPixelLine)
    });
    return newPixels;
}

// Função para aplicar a transferência de intensidade geral em uma imagem
export function TransferênciadeIntensidadeGeral(image, w, a) {
    let newPixels = [];
    
    image.forEach(pixelLine => {
        const newPixelLine = [];
        pixelLine.forEach(pixel => {
            w = a * pixel - 1;
            newPixelLine.push(w)
        }
        )
        newPixels.push(newPixelLine)
    });
    newPixels = func.truncarValores(newPixels);
    return newPixels;
}

// Função para aplicar a transferência de faixa dinâmica em uma imagem
export function TransferênciaFaixaDinâmica(image, min, max, c) {
    const newPixels = []
    image.forEach(pixelLine => {
        const newPixelLine = [];
        pixelLine.forEach(pixel => newPixelLine.push(((pixel - min) / (max - min)) * c))
        newPixels.push(newPixelLine)
    });
    return newPixels;
}

import * as func from './../OperacoesMorfologicas/operadores-morfologicos.js';

// Função para aplicar a transferência linear em uma imagem
export function TransferênciaLinear(image, a, b) {
    let newPixels = []
    image.forEach(pixelLine => {
        const newPixelLine = [];
        pixelLine.forEach(pixel => newPixelLine.push(a * pixel + b))
        newPixels.push(newPixelLine)
    });

    newPixels = func.normalizarValores(newPixels);
    return newPixels;
}