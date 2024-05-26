import { Mediana } from "./filtros.js";

// Função para somar duas matrizes pixel a pixel
export function somaDeMatrizes(matrizA, matrizB){
    let matrizC = [];

    for(var linha = 0; linha < matrizA.length; linha++){
        var row = [];
        for(var coluna = 0; coluna < matrizA[0].length; coluna++){
            row.push(matrizA[linha][coluna] + matrizB[linha][coluna]);
        }
        matrizC.push(row);
    }
    return matrizC;
}

// Função para subtrair matrizes pixel a pixel
export function subtracaoDeMatrizes(matrizA, matrizB){
    let matrizC = [];

    for(var linha = 0; linha < matrizA.length; linha++){
        var row = [];
        for(var coluna = 0; coluna < matrizA[0].length; coluna++){
            row.push(matrizA[linha][coluna] - matrizB[linha][coluna]);
        }
        matrizC.push(row);
    }
    return matrizC;
}


//Função que aplica o filtro da mediana com base na matriz da imagem, como se trata de um filtro baseado na imagem
//o tratamento requer outra função pois os valores vem da própria imagem
export function filtroMediana(matrizBase){
    let matrizSaida = []
    
    for(var linha = 0; linha < matrizBase.length; linha++){
        var row = [];

        for(var coluna = 0; coluna < matrizBase[0].length; coluna++){
                     
            if(linha === 0 || linha === matrizBase.length -1){
                row.push(0);
            }
            else if(coluna === 0 || coluna === matrizBase[0].length -1){
                row.push(0);
            }
            else{
                row.push(Mediana(
                    matrizBase[linha-1][coluna-1],
                    matrizBase[linha-1][coluna],
                    matrizBase[linha-1][coluna+1],
                    matrizBase[linha][coluna-1],
                    matrizBase[linha][coluna],
                    matrizBase[linha][coluna+1],
                    matrizBase[linha+1][coluna-1],
                    matrizBase[linha+1][coluna],
                    matrizBase[linha+1][coluna+1]
                ));
            }            
        }
        matrizSaida.push(row);
    }
    return matrizSaida;

}

//Aplica demais filtros
export function matrizesComFiltros(matrizBase, filtro){
    let matrizFiltrada = [];

    for(var linha = 0; linha < matrizBase.length; linha++){
        var row = [];
        for(var coluna = 0; coluna < matrizBase[0].length; coluna++){
            
            if(linha === 0 || linha === matrizBase.length -1){
                row.push(0);
            }
            else if(coluna === 0 || coluna === matrizBase[0].length -1){
                row.push(0);
            }
            else{
                let valor = Math.round((matrizBase[linha-1][coluna-1] * filtro[0][0]) +
                            (matrizBase[linha-1][coluna] * filtro[0][1]) +
                            (matrizBase[linha-1][coluna+1] * filtro[0][2]) + //Primaira linha do filtro termina aqui.
                            
                            (matrizBase[linha][coluna-1] * filtro[1][0]) +
                            (matrizBase[linha][coluna] * filtro[1][1]) + // Pixel centralizado(linha _ Coluna).
                            (matrizBase[linha][coluna+1] * filtro[1][2]) +//Segunda linha do filtro termina aqui.
                            
                            (matrizBase[linha+1][coluna-1] * filtro[2][0]) +
                            (matrizBase[linha+1][coluna] * filtro[2][1]) +
                            (matrizBase[linha+1][coluna+1] * filtro[2][2] ));

                row.push(valor);
            }
        }
        matrizFiltrada.push(row);
    }
    return matrizFiltrada;
}

