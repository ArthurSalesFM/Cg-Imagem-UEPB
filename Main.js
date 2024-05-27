import { analisarPGM } from "./Scripts/AnalisaPGM/analisaPGM.js";
import { criarMatriz } from "./Scripts/CriacaoDeMatrizes/criarMatriz.js";
import { renderizarPGMNoCanvas } from "./Scripts/RenderizarImagem/renderizarNoCanvas.js";
import * as filtro from "./Scripts/Filtros/filtros.js";
import * as aplicar from "./Scripts/Filtros/aplicarFiltros.js";
import {normalizarValores, truncarValores} from "./Scripts/AjustesPixels/AjustaPixel.js";
import { criacaoDasTabelas } from "./Scripts/Histograma/ExtracaoDeDados.js";
import { exibirInformacoesHistograma } from "./Scripts/Histograma/exibicaoDeDados.js";

// sections/div 
const divOpcaoDeProcesso = document.querySelector('.opcaoDeProcesso');
const divOpcaoFiltro = document.querySelector('.opcaoFiltro');
const divInfoFiltro = document.querySelector('.infoFiltro');
const divValorParaFiltroHB = document.querySelector('.valorParaFiltroHB');
const divImagemImportadaFiltro = document.querySelector('.imagemImportadaFiltro');
const divBotaoAplicar = document.querySelector('.botaoAplicar');
const divImagemFiltradaFiltro = document.querySelector(".imagemFiltradaFiltro");
const divMatriz2 = document.querySelector(".matriz2");

//Constantes
const opcaoDeProcessamento = document.getElementById('opcaoDePr'); // escolha do tipo de processamento (filtro/histograma/etc...)
const selectOpcoesFiltro = document.getElementById('opcoes'); // Obtém o select de opções
const btnSetarHBNaMatriz = document.getElementById('setarHBNaMatriz');//botão para setar o valor na matriz
const EntradaValorHB = document.getElementById('valorHB'); // Campo onde usuário passa o valor para a Matriz HB
const btnAplicarFlitro = document.getElementById('aplicarFlitro');// Botão para aplicar os filtros
const radioTruncamento = document.getElementById('radio1');

// Células das duas matrizes
const celula00 = document.getElementById('celula00');
const celula01 = document.getElementById('celula01');
const celula02 = document.getElementById('celula02');
const celula10 = document.getElementById('celula10');
const celula11 = document.getElementById('celula11');
const celula12 = document.getElementById('celula12');
const celula20 = document.getElementById('celula20');
const celula21 = document.getElementById('celula21');
const celula22 = document.getElementById('celula22');
const _celula00 = document.getElementById('2celula00');
const _celula01 = document.getElementById('2celula01');
const _celula02 = document.getElementById('2celula02');
const _celula10 = document.getElementById('2celula10');
const _celula11 = document.getElementById('2celula11');
const _celula12 = document.getElementById('2celula12');
const _celula20 = document.getElementById('2celula20');
const _celula21 = document.getElementById('2celula21');
const _celula22 = document.getElementById('2celula22');

const aplicarFlitro = document.getElementById('aplicarFlitro');
const tituloMatriz1 = document.getElementById('matriz1');
const tituloMatriz2 = document.getElementById('matriz2');
const btnMostrarHistograma = document.getElementById('mostrarHistograma');
const btnFecharHistograma = document.getElementById('fecharHistograma');

//Canvas
const canvaDaImagemPrincipalFiltros = document.getElementById('canvasImgImport');//Canvas que recebe a imagem importada
var canvasCtx = canvaDaImagemPrincipalFiltros.getContext('2d');
const canvasImgFiltrada = document.getElementById('canvasImgFiltrada'); // Canvas onde será mostrado a nova imagem após filtro
var canvasFiltro = canvasImgFiltrada.getContext('2d');

//Variáveis
var opcaoDeFiltro; // Variável criada para armazenar o tipo de filtro escolhido, para não precisar criar outra função do select
var dadosPGM; // Responsável por receber os dados ma imagem tratados.
var matrizBase; // Matriz criada para ter apenas os valores que serão processados

//Função para habilitar e desabilitar os componentes da tela
function habilitaDesabilitaInputeAplicacaoDoFiltro( valor){
    celula00.disabled = valor;
    celula01.disabled = valor;
    celula02.disabled = valor;
    celula10.disabled = valor;
    celula11.disabled = valor;
    celula12.disabled = valor;
    celula20.disabled = valor;
    celula21.disabled = valor;
    celula22.disabled = valor;
    aplicarFlitro.disabled = valor;
    _celula00.disabled = valor;
    _celula01.disabled = valor;
    _celula02.disabled = valor;
    _celula10.disabled = valor;
    _celula11.disabled = valor;
    _celula12.disabled = valor;
    _celula20.disabled = valor;
    _celula21.disabled = valor;
    _celula22.disabled = valor;
}

//Função para habilitar e desabilitar os componentes de filtros
function ativaDivsDeFiltro(mostrar){    
    divOpcaoFiltro.style.display = mostrar ? 'block' : 'none';
    divInfoFiltro.style.display = mostrar ? 'block' : 'none';
    divImagemImportadaFiltro.style.display = mostrar  ? 'block' : 'none';
    divImagemFiltradaFiltro.style.display = mostrar  ? 'block' : 'none';
    divBotaoAplicar.style.display = mostrar ? "block" : "none";
}

//Seta os valores dos filtros nos input, para visualização do usuário na matriz 1
function setValoresDosFiltrosNosInputsM1(matriz){
    celula00.value = matriz[0][0];
    celula01.value = matriz[0][1];
    celula02.value = matriz[0][2];
    celula10.value = matriz[1][0];
    celula11.value = matriz[1][1];
    celula12.value = matriz[1][2];
    celula20.value = matriz[2][0];
    celula21.value = matriz[2][1];
    celula22.value = matriz[2][2];
}

//Seta os valores dos filtros nos input, para visualização do usuário na matriz 2
function setValoresDosFiltrosNosInputsM2(matriz){
    _celula00.value = matriz[0][0];
    _celula01.value = matriz[0][1];
    _celula02.value = matriz[0][2];
    _celula10.value = matriz[1][0];
    _celula11.value = matriz[1][1];
    _celula12.value = matriz[1][2];
    _celula20.value = matriz[2][0];
    _celula21.value = matriz[2][1];
    _celula22.value = matriz[2][2];
}

// Função principal para inicializar o processo de upload e renderização
function iniciar() {
    document.getElementById('imagemInput').addEventListener('change', lidarComUploadDeArquivo);
}

// Função para lidar com o upload do arquivo
function lidarComUploadDeArquivo(evento) {
    const arquivo = evento.target.files[0]; // Obtém o primeiro arquivo selecionado     

    if(arquivo){
        divOpcaoDeProcesso.style.display = "block";
        ativaDivsDeFiltro(true);
        habilitaDesabilitaInputeAplicacaoDoFiltro(true);
        let largura1 = canvasImgFiltrada.width;
        let altura1 = canvasImgFiltrada.height;
        canvasFiltro.clearRect(0, 0, largura1, altura1);

        let largura2 = canvaDaImagemPrincipalFiltros.width;
        let altura2 = canvaDaImagemPrincipalFiltros.height;
        canvasCtx.clearRect(0, 0, largura2, altura2);

        const leitor = new FileReader(); // Cria uma nova instância do FileReader para ler o arquivo
        leitor.onload = function(e) { // Define uma função que será chamada quando a leitura do arquivo estiver completa
            const texto = e.target.result; // Obtém o conteúdo do arquivo como texto
            dadosPGM = analisarPGM(texto); // Analisa o conteúdo do arquivo PGM e extrai os dados da imagem            
            matrizBase = criarMatriz(dadosPGM); // Cria a matriz de 256x256 com os valores dos pixels
            canvasCtx.clearRect(0, 0, largura2, altura2);
            renderizarPGMNoCanvas(dadosPGM, matrizBase, canvaDaImagemPrincipalFiltros); // Renderiza a imagem PGM no canvas usando a matriz
        };
        leitor.readAsText(arquivo); // Inicia a leitura do conteúdo do arquivo como texto
    }
}

// Inicializa o script ao carregar a página
document.addEventListener('DOMContentLoaded', iniciar);

// Ouvinte para verificar mudanças de opção no processamento
opcaoDeProcessamento.addEventListener('change', function(){
    
    if(opcaoDeProcessamento.value === "opcaoP1"){
        ativaDivsDeFiltro(true);
        habilitaDesabilitaInputeAplicacaoDoFiltro(true);
    }
    else {
        ativaDivsDeFiltro(false);
        habilitaDesabilitaInputeAplicacaoDoFiltro(false);
        alert('Falta IMPLEMENTAR....');
    }
});

// Ouvinte para verificar mudanças de opção dos filtros
selectOpcoesFiltro.addEventListener('change', function(){

    if(selectOpcoesFiltro.value === "opcao1"){
        habilitaDesabilitaInputeAplicacaoDoFiltro(true);
        opcaoDeFiltro = "";
        tituloMatriz1.innerText = "Filtro"
        divMatriz2.style.display = 'none';
    }
    else{
        habilitaDesabilitaInputeAplicacaoDoFiltro(false);
        opcaoDeFiltro = selectOpcoesFiltro.value;
        divValorParaFiltroHB.style.display = 'none';
        divMatriz2.style.display = 'none';

        if(selectOpcoesFiltro.value === "opcao2"){
            tituloMatriz1.innerText = "Média";
            setValoresDosFiltrosNosInputsM1(filtro.Media);
        }
        else if(selectOpcoesFiltro.value === "opcao3"){
            tituloMatriz1.innerText = "Mediana";
            celula00.value = 1;
            celula01.value = 1;
            celula02.value = 1;
            celula10.value = 1;
            celula11.value = 1;
            celula12.value = 1;
            celula20.value = 1;
            celula21.value = 1;
            celula22.value = 1;
        }
        else if(selectOpcoesFiltro.value === "opcao4"){
            tituloMatriz1.innerText = "Passa Alta Básica";
            setValoresDosFiltrosNosInputsM1(filtro.PassaAlta);
        }
        else if(selectOpcoesFiltro.value === "opcao5"){
            tituloMatriz1.innerText = "Roberts em X";
            setValoresDosFiltrosNosInputsM1(filtro.OpRobertsX);
        }
        else if(selectOpcoesFiltro.value === "opcao6"){
            tituloMatriz1.innerText = "Roberts em Y";
            setValoresDosFiltrosNosInputsM1(filtro.OpRobertsY);
        }
        else if(selectOpcoesFiltro.value === "opcao7"){
            divMatriz2.style.display = 'block';
            tituloMatriz1.innerText = "Roberts em X";
            setValoresDosFiltrosNosInputsM1(filtro.OpRobertsX);

            tituloMatriz2.innerText = "Roberts em Y";
            setValoresDosFiltrosNosInputsM2(filtro.OpRobertsY);
        }
        else if(selectOpcoesFiltro.value === "opcao8"){
            tituloMatriz1.innerText = "Roberts Cruzado em X";
            setValoresDosFiltrosNosInputsM1(filtro.OpRobertsCruzadoX);
        }
        else if(selectOpcoesFiltro.value === "opcao9"){
            tituloMatriz1.innerText = "Roberts Cruzado em Y";
            setValoresDosFiltrosNosInputsM1(filtro.OpRobertsCruzadoY);
        }
        else if(selectOpcoesFiltro.value === "opcao10"){
            divMatriz2.style.display = 'block';
            tituloMatriz1.innerText = "Roberts Cruzado em X";
            setValoresDosFiltrosNosInputsM1(filtro.OpRobertsCruzadoX);

            tituloMatriz2.innerText = "Roberts Cruzado em Y";
            setValoresDosFiltrosNosInputsM2(filtro.OpRobertsCruzadoY);
        }
        else if(selectOpcoesFiltro.value === "opcao11"){
            tituloMatriz1.innerText = "Prewitt em X";
            setValoresDosFiltrosNosInputsM1(filtro.PrewittX);
        }
        else if(selectOpcoesFiltro.value === "opcao12"){
            tituloMatriz1.innerText = "Prewitt em Y";
            setValoresDosFiltrosNosInputsM1(filtro.PrewittY);
        }
        else if(selectOpcoesFiltro.value === "opcao13"){
            divMatriz2.style.display = 'block';
            tituloMatriz1.innerText = "Prewitt em X";
            setValoresDosFiltrosNosInputsM1(filtro.PrewittX);

            tituloMatriz2.innerText = "Prewitt em Y";
            setValoresDosFiltrosNosInputsM2(filtro.PrewittY);
        }
        else if(selectOpcoesFiltro.value === "opcao14"){
            divValorParaFiltroHB.style.display = 'block';
            tituloMatriz1.innerText = "Auto Reforço HB";
            celula00.value = -1;
            celula01.value = -1;
            celula02.value = -1;
            celula10.value = -1;
            celula11.value = 0;
            celula12.value = -1;
            celula20.value = -1;
            celula21.value = -1;
            celula22.value = -1;
        }
        else if(selectOpcoesFiltro.value === "opcao15"){
            tituloMatriz1.innerText = "Sobel em X";
            setValoresDosFiltrosNosInputsM1(filtro.SobelX);
        }
        else if(selectOpcoesFiltro.value === "opcao16"){
            tituloMatriz1.innerText = "Sobel em Y";
            setValoresDosFiltrosNosInputsM1(filtro.SobelY);
        }
        else if(selectOpcoesFiltro.value === "opcao17"){
            divMatriz2.style.display = 'block';
            tituloMatriz1.innerText = "Sobel em X";
            setValoresDosFiltrosNosInputsM1(filtro.SobelX);

            tituloMatriz2.innerText = "Sobel em Y";
            setValoresDosFiltrosNosInputsM2(filtro.SobelY);
        }
    }

});

// ouvinte para quando o botão for clicado, o valor seja setado na matriz
btnSetarHBNaMatriz.addEventListener('click', function(){
    celula11.value = EntradaValorHB.value;
});

// Ouvinte para aplicar os filtros
btnAplicarFlitro.addEventListener('click', function(){
    //Como pode haver modificações feitas pelo o usuário, então é mais prudente pegar os valores que foi mostrado para o usuário
    //Se pegar diretamente do filtro pode não ser o resultado esperado pelo o usuário, uma vez que possa ter mudado o valor do filtro.
    let filtroAtualizado = [
        [celula00.value, celula01.value, celula02.value],
        [celula10.value, celula11.value, celula12.value],
        [celula20.value, celula21.value, celula22.value]
    ];

    let matrizModificada = [];
    let largura = canvasImgFiltrada.width;
    let altura = canvasImgFiltrada.height;
    canvasFiltro.clearRect(0, 0, largura, altura);

    if(opcaoDeFiltro === "opcao2" || 
       opcaoDeFiltro === "opcao4" || 
       opcaoDeFiltro === "opcao5" ||
       opcaoDeFiltro === "opcao6" || 
       opcaoDeFiltro === "opcao8" ||
       opcaoDeFiltro === "opcao9" ||
       opcaoDeFiltro === "opcao11" ||
       opcaoDeFiltro === "opcao12" ||
       opcaoDeFiltro === "opcao14" ||
       opcaoDeFiltro === "opcao15" ||
       opcaoDeFiltro === "opcao16"){
        matrizModificada = aplicar.matrizesComFiltros(matrizBase, filtroAtualizado);        
    }    
    else if(opcaoDeFiltro === "opcao3"){
        matrizModificada = aplicar.filtroMediana(matrizBase);
    }
    else if(opcaoDeFiltro === "opcao7" ||
            opcaoDeFiltro === "opcao10" ||
            opcaoDeFiltro === "opcao13" ||
            opcaoDeFiltro === "opcao17"){
        matrizModificada = aplicar.matrizesComFiltros(matrizBase, filtroAtualizado);

        let filtroAtualizadoY = [
            [_celula00.value, _celula01.value, _celula02.value],
            [_celula10.value, _celula11.value, _celula12.value],
            [_celula20.value, _celula21.value, _celula22.value]
        ];
        var matrizY = aplicar.matrizesComFiltros(matrizBase, filtroAtualizadoY);

        matrizModificada = aplicar.somaDeMatrizes(matrizModificada, matrizY);
    }   
    canvasFiltro.clearRect(0, 0, largura, altura);

    //Aplicar o truncamento ou normalização
    if(radioTruncamento.checked){
        matrizModificada = truncarValores(matrizModificada);
    }
    else{
        matrizModificada = normalizarValores(matrizModificada);
    }
    renderizarPGMNoCanvas(dadosPGM, matrizModificada, canvasImgFiltrada);
});

//Botão para mostrar a parte do histograma
btnMostrarHistograma.addEventListener('click', function(){
    document.getElementById('divParteHistrograma').style.display = 'flex';
    
    //criacaoDasTabelas(matrizBase, dadosPGM.valorMaximo);

    exibirInformacoesHistograma();


});





//
btnFecharHistograma.addEventListener('click', function(){
    document.getElementById('divParteHistrograma').style.display = 'none';
});