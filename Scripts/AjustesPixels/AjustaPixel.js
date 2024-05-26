

// Função para normalizar os valores entre 0 e 255
export function normalizarValores(matriz){
    let menorPixel = 77777777;
    let maiorPixel = -77777777;

    for(var linha = 0; linha < matriz.length; linha++){
        for(var coluna = 0; coluna < matriz[0].length; coluna++){
            if(matriz[linha][coluna] > maiorPixel){
                maiorPixel = matriz[linha][coluna];
            }
            if(matriz[linha][coluna] < menorPixel){
                menorPixel = matriz[linha][coluna];
            }
        }
    }

    for(var linha = 0; linha < matriz.length; linha++){
        for(var coluna = 0; coluna < matriz[0].length; coluna++){
            let pixelNormalizado = ((matriz[linha][coluna] - menorPixel)/(maiorPixel - menorPixel)) * 255;
            matriz[linha][coluna] = Math.round(pixelNormalizado);
        }
    }

    return matriz;
}

//Função para trucar os valores
export function truncarValores(matriz){

    for(var linha = 0; linha < matriz.length; linha++){
        for(var coluna = 0; coluna < matriz[0].length; coluna++){
            let valorArredondado = Math.round(matriz[linha][coluna]);

            if(valorArredondado > 255){
                matriz[linha][coluna] = 255;
            }
            else if(valorArredondado < 0 ){
                matriz[linha][coluna] = 0;
            }
            else{
                matriz[linha][coluna] = valorArredondado;
            }
        }
    }
    return matriz;
}