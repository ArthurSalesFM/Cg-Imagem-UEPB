// Função para analisar o conteúdo de um arquivo PGM
export function analisarPGM(texto) {
    const linhas = texto.split('\n').map(linha => linha.trim()).filter(linha => linha && !linha.startsWith('#')); 
    // Divide o texto do arquivo em linhas, remove espaços em branco no início e fim de cada linha, 
    // e ignora linhas vazias ou que começam com '#', que são comentários.

    // Inicializa o índice para percorrer as linha
    let indice = 0; 

    const numeroMagico = linhas[indice++]; // Lê o número mágico (P2) da primeira linha e incrementa o índice
    if (numeroMagico !== 'P2') throw new Error('Apenas arquivos PGM P2 são suportados'); 
    // Verifica se o número mágico é 'P2', indicando que é um arquivo PGM no formato suportado

    const [largura, altura] = linhas[indice++].split(' ').map(Number); // Lê a largura e a altura da imagem e incrementa o índice

    const valorMaximo = parseInt(linhas[indice++], 10); // Lê o valor máximo de pixel e incrementa o índice

    const pixels = linhas.slice(indice).join(' ').split(/\s+/).map(Number); // Lê todos os valores de pixel
    // Junta as linhas restantes em uma única string, divide por espaços em branco e converte para números

    return { largura, altura, valorMaximo, pixels }; // Retorna os dados da imagem PGM em um objeto
}