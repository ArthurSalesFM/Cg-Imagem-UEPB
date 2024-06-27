export function exibirInformacoesHistograma(matrizBase, tb, tb4) {
    var histogramaDaImagemOriginal = document.getElementById('histogramaDaImagemOriginal');
    var ctx = histogramaDaImagemOriginal.getContext('2d');    
    var histogramaDaImagemModificada = document.getElementById('histogramaDaImagemModificada');
    var ctx2 = histogramaDaImagemModificada.getContext('2d');

    // Limpar todo o canvas
    ctx.clearRect(0, 0, histogramaDaImagemOriginal.width, histogramaDaImagemOriginal.height);
    ctx2.clearRect(0, 0, histogramaDaImagemModificada.width, histogramaDaImagemModificada.height);

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
    ctx2.strokeStyle = "red";

    // Defina a largura da linha
    ctx.lineWidth = lineWidth;
    ctx2.lineWidth = lineWidth;

    // Desenhe a primeira linha vertical
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + lineHeight);
    ctx.stroke();
    //
    ctx2.beginPath();
    ctx2.moveTo(x, y);
    ctx2.lineTo(x, y + lineHeight);
    ctx2.stroke();

    // Calcule a posição y da segunda linha a partir da base da primeira linha
    var novaY = y + lineHeight;

    // Defina a largura da segunda linha (80% do canvas)
    var novaLargura = histogramaDaImagemOriginal.width * 0.92;

    // Desenhe a segunda linha horizontal
    ctx.beginPath();
    ctx.moveTo(x, novaY);
    ctx.lineTo(x + novaLargura, novaY); // Segunda linha vai até 80% da largura do canvas
    ctx.stroke();
    //
    ctx2.beginPath();
    ctx2.moveTo(x, novaY);
    ctx2.lineTo(x + novaLargura, novaY); // Segunda linha vai até 80% da largura do canvas
    ctx2.stroke();

    // Defina a cor das linhas verticais
    ctx.strokeStyle = "yellow";
    ctx2.strokeStyle = "yellow";

    // Defina o número de linhas verticais desejado
    var numLinhasVerticais = tb[3].length; // Assumindo que tb[3] é um array de valores normalizados

    // Desenhe as linhas verticais com base nos valores normalizados de tb[3]
    for (var i = 0; i < numLinhasVerticais; i++) {
        // Pega o valor normalizado da matriz tb[3]
        var valorNormalizado = tb[3][i]; 

        // Converte o valor normalizado para a altura da linha
        var tamanhoLinhaVertical = (valorNormalizado * lineHeight) * 35;

        // Posição x para cada linha vertical
        var xPosLinhaVertical = x + (i / numLinhasVerticais) * novaLargura;

        // Posição y começa no topo da linha horizontal
        var yPosLinhaVertical = novaY - tamanhoLinhaVertical;

        // Desenha a linha vertical
        ctx.beginPath();
        ctx.moveTo(xPosLinhaVertical, yPosLinhaVertical);
        ctx.lineTo(xPosLinhaVertical, novaY); // Linha vai até o topo da linha horizontal
        ctx.stroke();
    }


    //console.log("tabela 4...\n");
    //console.log(tb4);

    // Desenhe as linhas verticais com base nos valores normalizados de tb[3]
    for (var i = 0; i < numLinhasVerticais; i++) {
        // Pega o valor normalizado da matriz tb[3]
        var valorNormalizado = tb4[2][i]; 

        // Converte o valor normalizado para a altura da linha
        var tamanhoLinhaVertical = (valorNormalizado * lineHeight) * 35;

        // Posição x para cada linha vertical
        var xPosLinhaVertical = x + (i / numLinhasVerticais) * novaLargura;

        // Posição y começa no topo da linha horizontal
        var yPosLinhaVertical = novaY - tamanhoLinhaVertical;

        // Desenha a linha vertical
        ctx2.beginPath();
        ctx2.moveTo(xPosLinhaVertical, yPosLinhaVertical);
        ctx2.lineTo(xPosLinhaVertical, novaY); // Linha vai até o topo da linha horizontal
        ctx2.stroke();
    }
}
