
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

    //valor de K dividido pelo nv de canda nv. EX ( 0 ; 0/255 
    //                                              1 ; 1/255
    //                                              2 ; 2/255, e etc...)
    let rK = [];

    //Armazena a quantidade(frequencia) de cada nv de cinza
    let nK = [];

    //Armazena quantidade de cada nv de cinza divido pelo total
    let pRK = [];

    //na primeira linha, será salvo os nv de cinzas
    //na segunta o valor da primeira linha / pela quantidade de nv de cinza; exe: 0/255, 1/255, 2/255 e etc...
    // Na terceira e quarta linha, inicialmente inciando tudo com 0
    for(var nvCinzas = 0; nvCinzas < quantidadeDeNvCinzas; nvCinzas++ ){
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
            nK[matrizDaImagem[linha][coluna]] += 1;
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
    for(var coluna = 0; coluna < matrizDaImagem.length; coluna++){
        linha1Tb2.push(tabela[1][coluna]);
    }
    tabela2.push(linha1Tb2);

    var linha2Tb1 = [];
    for(var coluna = 0; coluna < matrizDaImagem.length; coluna++){

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

    // Criação da 3ª tabela
    var tabela3= [];

    // valor de RK(original da outra tabela2)
    var linhaRK = [];
    for(var coluna = 0; coluna < matrizDaImagem.length; coluna++){
        linhaRK.push(tabela2[0][coluna]);
    }
    tabela3.push(linhaRK);

    // valor de RK(arredondado)
    var linhaRoundRK = [];
    for(var coluna = 0; coluna < matrizDaImagem.length; coluna++){
        linhaRoundRK.push(Math.round(linhaRK[coluna] * quantidadeDeNvCinzas));
    }

    tabela3.push(linhaRoundRK);

    // valor de SK(original da outra tabela2)
    var linhaSK = [];
    for(var coluna = 0; coluna < matrizDaImagem.length; coluna++){
        linhaSK.push(tabela2[1][coluna]);
    }        
    tabela3.push(linhaSK);

    var linhaRoundSK = [];
    for(var coluna = 0; coluna < matrizDaImagem.length; coluna++){
        linhaRoundSK.push(Math.round(linhaSK[coluna] * quantidadeDeNvCinzas));
    }
    tabela3.push(linhaRoundSK);


    /*
        *************************** CRIAÇÃO DA QUARTA TABELA ***************************
    */
    /*
    var tabela4 = [];
    var linhaNVDCTabela4 = [];
    var linhaNkTabela4 = []; 
    var linhaPSKTabela4 = [];   
    //Nv de cinzas da tabela 4
    for (var coluna = 0; coluna < matrizDaImagem.length; coluna++){
        linhaNVDCTabela4.push(coluna);
        linhaNkTabela4.push(0);
        linhaPSKTabela4.push(0);
    }
    tabela4.push(linhaNVDCTabela4);   

    for(var coluna = 0; coluna < matrizDaImagem.length; coluna++){       
        linhaNkTabela4[tabela3[3][coluna]] += tabela[2][coluna]; 
    }

    for(var coluna = 0; coluna < matrizDaImagem.length; coluna++){       
        linhaPSKTabela4[tabela3[3][coluna]] += tabela[3][coluna]; 
    }
    tabela4.push(linhaNkTabela4);
    tabela4.push(linhaPSKTabela4);

    //console.log("Tabela 3...");
    //console.log(tabela3);
    */
    return tabela3;
}

export function retornaMatrizEqualizada(matrizDaImagem, tb3){

    //console.log("Matriz recebida...\n");
    //console.log(matrizDaImagem);

    var copiaMatrizDaImagem = [];
    //console.log("Copia original...\n");
    //console.log(copiaMatrizDaImagem);
    
    //zerando a copia da matrizDaImagem = (copiaMatrizDaImagem)
    for(var linha = 0; linha < matrizDaImagem.length; linha++){     
        var lll = [];   
        for(var coluna = 0; coluna < matrizDaImagem[0].length; coluna++){
            lll.push(matrizDaImagem[linha][coluna]);
        }
        copiaMatrizDaImagem.push(lll);
    }   

    //console.log("*****....\n");
    //console.log(copiaMatrizDaImagem);

    //zerando a copia da matrizDaImagem = (copiaMatrizDaImagem)
    for(var linha = 0; linha < matrizDaImagem.length; linha++){
        
        for(var coluna = 0; coluna < matrizDaImagem[0].length; coluna++){
            copiaMatrizDaImagem[linha][coluna] = 0;
        }
    }

    //console.log("Copia Zerada...\n");
    //console.log(copiaMatrizDaImagem);

    for(var linha = 0; linha < matrizDaImagem.length; linha++){
        for(var coluna = 0; coluna < matrizDaImagem[0].length; coluna++){
            var valorAtual = matrizDaImagem[linha][coluna];
            
            for(var nvCinza = 0; nvCinza < 256; nvCinza++){

                if(tb3[1][nvCinza] === valorAtual ){
                    copiaMatrizDaImagem[linha][coluna] = tb3[3][nvCinza];
                }
            }
        }
    }
    //console.log("Copia Finalizada...\n");
    //console.log(copiaMatrizDaImagem);
    return copiaMatrizDaImagem;
}
