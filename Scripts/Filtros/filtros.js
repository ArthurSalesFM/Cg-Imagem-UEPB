
// Filtro da média
export const Media = [
    [0.1, 0.1, 0.1],
    [0.1, 0.1, 0.1],
    [0.1, 0.1, 0.1]
];

// Função Filtro da mediana depende dos valores dos pixels vizinho
export function Mediana(valor00, valor01, valor02, valor10, valor11, valor12, valor20, valor21, valor22 ){
    let valores = [valor00, valor01, valor02, valor10, valor11, valor12, valor20, valor21, valor22];

    // Loop para iterar sobre todos os elementos do array
    for(let i = 0; i < valores.length - 1; i++){
        // Encontrar o índice do menor elemento restante
        let indiceMenor = i;
        for(let j = i + 1; j < valores.length; j++){
            if(valores[j] < valores[indiceMenor]){
                indiceMenor = j;
            }
        }
        // Trocar o elemento atual com o menor elemento encontrado
        if(indiceMenor !== i){
            let temp = valores[indiceMenor];
            valores[indiceMenor] = valores[i];
            valores[i] = temp;
        }
    }

    return valores[4];
}

// Filtro passa Baixa
export const PassaAlta = [
    [-1, -1, -1],
    [-1, 8, -1],
    [-1, -1, -1]
];

// Filtro Operador de Roberts em X
export const OpRobertsX = [
    [0, 0, 0],
    [0, 1, 0],
    [0, -1, 0]
];

// Filtro Operador de Roberts em Y
export const OpRobertsY = [
    [0, 0, 0],
    [0, 1, -1],
    [0, 0, 0]
];

// Filtro Operador de Roberts Cruzado em X
export const OpRobertsCruzadoX = [
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, -1]
];

// Filtro Operador de Roberts Cruzado em Y
export const OpRobertsCruzadoY = [
    [0, 0, 0],
    [0, 0, 1],
    [0, -1, 0]
];

//Filtro Operador de Prewitt em X
export const PrewittX = [
    [-1, -1, -1],
    [0, 0, 0],
    [1, 1, 1]
];

//Filtro Operador de Prewitt em Y
export const PrewittY = [
    [-1, 0, 1],
    [-1, 0, 1],
    [-1, 0, 1]
];

// Função filtro do Alto reforço, precisa do valor de entrada do usuário
export function AltoReforco(valor){
    return [
        [-1, -1, -1],
        [-1, valor, -1],
        [-1, -1, -1]
    ];
}

// Filtro de Sobel em X
export const SobelX = [
    [-1, -2, -1],
    [0, 0, 0],
    [1, 2, 1]
];

// Filtro de Sobel em Y
export const SobelY = [
    [-1, 0, 1],
    [-2, 0, 2],
    [-1, 0, 1]
];