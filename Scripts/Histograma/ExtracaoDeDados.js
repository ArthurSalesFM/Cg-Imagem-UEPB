
//Criação da tabela inicial
export function criacaoDasTabelas(matrizDaImagem, quantidadeDeNvCinzas){
    /*
        *************************** CRIAÇÃO DA PRIMEIRA TABELA ***************************
    */
    
    let tabela = [];

    //quantidade total de pixels
    var qtdDePixel = matrizDaImagem.length * matrizDaImagem[0].length;

    // Armazenando cada nv de cinzas
    let K = [];
    let rK = [];

    //Armazena a quantidade(frequencia) de cada nv de cinza
    let nK = [];

    //Armazena quantidade de cada nv de cinza divido pelo total
    let pRK = [];

    //na primeira linha, será salvo os nv de cinzas
    //na segunta o valor da primeira linha / pela quantidade de nv de cinza; exe: 0/255, 1/255, 2/255 e etc...
    // Na terceira e quarta linha, inicialmente inciando tudo com 0
    for(var nvCinzas = 0; nvCinzas <= quantidadeDeNvCinzas; nvCinzas++ ){
        K.push(nvCinzas);
        //console.log("Valor de K: " + nvCinzas +"\nValor da quantidade: " + quantidadeDeNvCinzas +"\nNormalizado: " + (nvCinzas/quantidadeDeNvCinzas))
        rK.push((nvCinzas/quantidadeDeNvCinzas));
        nK.push(0);
        pRK.push(0);
    }
    tabela.push(K);
    tabela.push(rK);
    tabela.push(nK);
    tabela.push(pRK);

    //Fazendo a contagem de cada valor de cinza(quantificando)
    //EX: quantos zeros tem na imagem, quantos 200 tem na imagem e etc...
    for(var linha = 0; linha < matrizDaImagem.length; linha++){
        for(var coluna = 0; coluna < matrizDaImagem[0].length; coluna++){
            tabela[2][matrizDaImagem[linha][coluna]] +=1;
        }
    }

    //Dividindo a quantidade de cada nivel de pixel pelo total de pixel da imagem
    for(var coluna = 0; coluna < matrizDaImagem.length; coluna++){
        tabela[3][coluna] = tabela[2][coluna] / qtdDePixel;
    }

    /*
        *************************** CRIAÇÃO DA SEGUNDA TABELA ***************************
    */

    var tabela2 = [];
    var linha1Tb2 = [];
    for(var coluna = 0; coluna < tabela[0].length; coluna++){
        linha1Tb2.push(tabela[1][coluna]);
    }
    tabela2.push(linha1Tb2);

    var linha2Tb1 = [];
    for(var coluna = 0; coluna < tabela[0].length; coluna++){

        if(coluna === 0){
            linha2Tb1.push(tabela[3][coluna]);
        }
        else{
            linha2Tb1.push(linha2Tb1[coluna-1] + tabela[3][coluna]);
        }
    }

    tabela2.push(linha2Tb1);

    /*
        *************************** CRIAÇÃO DA TERCEIRA TABELA ***************************
    */

        var tabela3= [];
        tabela3.push(tabela2[0]);
        

        var roundK = [];
        var roundSK = [];
        quantidadeDeNvCinzas
        for(var coluna = 0; coluna < tabela[0].length; coluna++){
            roundK.push(Math.round(tabela2[0][coluna] * quantidadeDeNvCinzas));
            roundSK.push(Math.round(tabela2[1][coluna] * quantidadeDeNvCinzas))
        }
        tabela3.push(roundK);
        tabela3.push(tabela2[1]);
        tabela3.push(roundSK);

        console.log(tabela3);


        


}
