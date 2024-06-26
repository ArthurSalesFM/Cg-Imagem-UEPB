

export function exibirInformacoesHistograma(matrizBase){
    //Canvas dos histogramas
//var canvasImagemImportadaHistograma = document.getElementById('imagemOriginalHist');
//var canvasImagemProcessadaHistograma = document.getElementById('imagemModificadaHist');
//var canvasDeDadosDaImagemProcessadaHistograma = document.getElementById('histogramaDaImagemModificada');

var histogramaDaImagemOriginal = document.getElementById('histogramaDaImagemOriginal');
var ctx = histogramaDaImagemOriginal.getContext('2d');

// Limpar todo o canvas
ctx.clearRect(0, 0, histogramaDaImagemOriginal.width, histogramaDaImagemOriginal.height);

// Defina a altura da linha (80% da altura do canvas)
var lineHeight = histogramaDaImagemOriginal.height * 0.8;

// Defina a posição x da linha
var x = histogramaDaImagemOriginal.width * 0.04;

// Calcule a posição y da linha para centralizá-la verticalmente
var y = (histogramaDaImagemOriginal.height - lineHeight) / 2;

// Defina a largura da linha
var lineWidth = 2;

// Defina a cor da linha
ctx.strokeStyle = "red";

// Defina a largura da linha
ctx.lineWidth = lineWidth;

// Desenhe a primeira linha vertical
ctx.beginPath();
ctx.moveTo(x, y);
ctx.lineTo(x, y + lineHeight);
ctx.stroke();

// Calcule a posição y da segunda linha a partir da base da primeira linha
var novaY = y + lineHeight;

// Defina a largura da segunda linha (80% do canvas)
var novaLargura = histogramaDaImagemOriginal.width * 0.92;

// Desenhe a segunda linha horizontal
ctx.beginPath();
ctx.moveTo(x, novaY);
ctx.lineTo(x + novaLargura, novaY); // Segunda linha vai até 80% da largura do canvas
ctx.stroke();

// Defina a margem entre a linha preta e as linhas verticais azuis
var margem = 5; // Pode ajustar conforme necessário

// Defina o número de linhas verticais desejado
var numLinhasVerticais = 256;

// Defina a cor das linhas verticais
ctx.strokeStyle = "yellow";

// Desenhe as linhas verticais aleatórias
for (var i = 0; i < numLinhasVerticais; i++) {

    //criacaoDasTabelas();

    // Tamanho aleatório para cada linha entre 0 e a altura da linha horizontal
    var tamanhoLinhaVertical = Math.random() * lineHeight;

    // Posição x aleatória dentro da área da linha vertical original
    var xPosLinhaVertical = x + Math.random() * (novaLargura - 1); // -1 para garantir que não ultrapasse a linha vertical

    // Posição y começa no topo da linha horizontal
    var yPosLinhaVertical = novaY - tamanhoLinhaVertical;

    // Desenha a linha vertical
    ctx.beginPath();
    ctx.moveTo(xPosLinhaVertical, yPosLinhaVertical);
    ctx.lineTo(xPosLinhaVertical, novaY); // Linha vai até o topo da linha horizontal
    ctx.stroke();
}
}