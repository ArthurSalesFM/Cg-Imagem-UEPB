import { analisarPGM } from "./Scripts/AnalisaPGM/analisaPGM.js";
import { criarMatriz } from "./Scripts/CriacaoDeMatrizes/criarMatriz.js";
import { renderizarPGMNoCanvas } from "./Scripts/RenderizarImagem/renderizarNoCanvas.js";
import * as filtro from "./Scripts/Filtros/filtros.js";
import * as aplicar from "./Scripts/Filtros/aplicarFiltros.js";
import * as opMorfologicas from "./Scripts/OperacoesMorfologicas/operadores-morfologicos.js";
import * as teste from "./Scripts/OperacoesMorfologicas/teste.js";
import * as transformacoesImg from "./Scripts/Transformacoes/transformacoes.js";
import { normalizarValores, truncarValores } from "./Scripts/AjustesPixels/AjustaPixel.js";
import { criacaoDasTabelas, retornaMatrizEqualizada } from "./Scripts/Histograma/ExtracaoDeDados.js";
import { exibirInformacoesHistograma } from "./Scripts/Histograma/exibicaoDeDados.js";

// sections/div 
const divOpcaoDeProcesso = document.querySelector('.opcaoDeProcesso');
const divOpcaoFiltro = document.querySelector('.opcaoFiltro');
const divInfoFiltro = document.querySelector('.infoFiltro');
const divValorParaFiltroHB = document.querySelector('.valorParaFiltroHB');
const divImagemImportadaFiltro = document.querySelector('.imagemImportadaFiltro');
const divBotaoAplicar = document.querySelector('.botaoAplicar');
const divBotaoAplicarOp = document.querySelector('.botaoAplicarOp');
const divImagemFiltradaFiltro = document.querySelector(".imagemFiltradaFiltro");
const divImagemBinaria = document.querySelector('.imagemBinaria');
const divMatriz2 = document.querySelector(".matriz2");
const divMatriz1 = document.querySelector(".matriz1");

const divOpcaoOpMorfologicos = document.querySelector('.opcaoOpMorfologicos');
const divInfoOpMorfologicos = document.querySelector('.infoOpMorfologicos');
const divValorParaOpMorfologicos = document.querySelector('.valorParaOpMorfologicos');
const divImportarParaOperacao = document.querySelector('.importarParaOperacao');

const divTranformacoes = document.querySelector('.opcaoTransImagem');

//Constantes
const opcaoDeProcessamento = document.getElementById('opcaoDePr'); // escolha do tipo de processamento (filtro/histograma/etc...)
const selectOpcoesFiltro = document.getElementById('opcoes'); // Obtém o select de opções
const btnSetarHBNaMatriz = document.getElementById('setarHBNaMatriz');//botão para setar o valor na matriz
const EntradaValorHB = document.getElementById('valorHB'); // Campo onde usuário passa o valor para a Matriz HB
const btnAplicarFlitro = document.getElementById('aplicarFlitro');// Botão para aplicar os filtros
const btnAplicarOpMorfologicos = document.getElementById('aplicarOpMorfologicos');// Botão para aplicar operadores morfologicos
const btnAplicarTrans = document.getElementById('aplicarTrans');// Botão para aplicar operadores morfologicos
const radioTruncamento = document.getElementById('radio1');
const inputGama = document.getElementById('gamaInput');
const inputLog = document.getElementById('logInput');
const inputIntGeral = document.getElementById('intensidadeGeralInput');
const inputFxDin = document.getElementById('faixaDinamicaInput');
const inputLinear = document.getElementById('linearInput');
const radioIsBinary = document.getElementById('isBinary');

let ultimaImagemCarregada = null;

const selectOpcoesOpMorfologicos = document.getElementById('opcoesOp'); // Obtém o select de opções
const selectTransformacoes = document.getElementById('transformacoes'); // Obtém o select de opções

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

const celulaOp00 = document.getElementById('celulaOp00');
const celulaOp01 = document.getElementById('celulaOp01');
const celulaOp02 = document.getElementById('celulaOp02');
const celulaOp10 = document.getElementById('celulaOp10');
const celulaOp11 = document.getElementById('celulaOp11');
const celulaOp12 = document.getElementById('celulaOp12');
const celulaOp20 = document.getElementById('celulaOp20');
const celulaOp21 = document.getElementById('celulaOp21');
const celulaOp22 = document.getElementById('celulaOp22');

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

const canvasImgFiltrada2 = document.getElementById('canvasImgFiltrada2');
var canvasFiltro2 = canvasImgFiltrada2.getContext('2d');

const canvasImgFiltrada3 = document.getElementById('canvasImgFiltrada3');
var canvasFiltro3 = canvasImgFiltrada3.getContext('2d');

const canvasImgFiltrada4 = document.getElementById('canvasImgFiltrada4');
var canvasFiltro4 = canvasImgFiltrada4.getContext('2d');

const canvasImgBinaria = document.getElementById('canvasImgBinImport'); // Canvas onde será mostrado a nova imagem após filtro
var canvasBin = canvasImgBinaria.getContext('2d');

//Variáveis
var opcaoDeFiltro; // Variável criada para armazenar o tipo de filtro escolhido, para não precisar criar outra função do select
var dadosPGM; // Responsável por receber os dados ma imagem tratados.
var matrizBase; // Matriz criada para ter apenas os valores que serão processados
var matrizBase2;//Para oprações básicas dos filtros
let opcaoOpMorfologicos; // Variável criada para armazenar o tipo de mascara escolhido, para não precisar criar outra função do select
let transformacoes;
var matrizParaHistograma = [];

//Canvas do histograma
const imagemOriginalHist = document.getElementById('imagemOriginalHist');
var canvasImagemOriginalHist = imagemOriginalHist.getContext('2d');
const histogramaDaImagemOriginal = document.getElementById('histogramaDaImagemOriginal');
var canvasHistogramaDaImagemOriginal = histogramaDaImagemOriginal.getContext('2d');
//segunda parte
const imagemModificadaHist = document.getElementById('imagemModificadaHist');
var canvasImagemModificadaHist = imagemModificadaHist.getContext('2d');
const histogramaDaImagemModificada = document.getElementById('histogramaDaImagemModificada');
var canvasHistogramaDaImagemModificada = histogramaDaImagemModificada.getContext('2d');

let controleDeAberturaDeImagens2 = 0;

function gerarImagemBin(imagem) {
    const imgBin = opMorfologicas.pegarMediaImagem(imagem);
    renderizarPGMNoCanvas(dadosPGM, imgBin, canvasImgBinaria); // Renderiza a imagem PGM no canvas usando a matriz
}

//Função para habilitar e desabilitar os componentes da tela
function habilitaDesabilitaInputeAplicacaoDoFiltro(valor) {
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

function habilitaDesabilitaInputeAplicacaoDoOp(valor) {
    celulaOp00.disabled = valor;
    celulaOp01.disabled = valor;
    celulaOp02.disabled = valor;
    celulaOp10.disabled = valor;
    celulaOp11.disabled = valor;
    celulaOp12.disabled = valor;
    celulaOp20.disabled = valor;
    celulaOp21.disabled = valor;
    celulaOp22.disabled = valor;
}

function limpaCanvasSaidas() {
    canvasFiltro.clearRect(0, 0, canvasImgFiltrada.width, canvasImgFiltrada.height);
    canvasFiltro2.clearRect(0, 0, canvasImgFiltrada2.width, canvasImgFiltrada2.height);
    canvasFiltro3.clearRect(0, 0, canvasImgFiltrada3.width, canvasImgFiltrada3.height);
    canvasFiltro4.clearRect(0, 0, canvasImgFiltrada4.width, canvasImgFiltrada4.height);
}

function desativaAtivaCanvasDeSaidas(mostrar) {
    canvasImgFiltrada.style.display = mostrar ? 'block' : 'none';
    canvasImgFiltrada2.style.display = mostrar ? 'block' : 'none';
    canvasImgFiltrada3.style.display = mostrar ? 'block' : 'none';
    canvasImgFiltrada4.style.display = mostrar ? 'block' : 'none';
}

//Função para habilitar e desabilitar os componentes de filtros
function ativaDivsDeFiltro(mostrar) {
    divOpcaoFiltro.style.display = mostrar ? 'block' : 'none';
    divInfoFiltro.style.display = mostrar ? 'block' : 'none';
    divImagemImportadaFiltro.style.display = mostrar ? 'block' : 'none';
    divImagemFiltradaFiltro.style.display = mostrar ? 'block' : 'none';
    divBotaoAplicar.style.display = mostrar ? "block" : "none";
}

function ativaDesativaDivImportImagemSecundaria(mostrar) {
    divImportarParaOperacao.style.display = mostrar ? 'block' : 'none';
}

//Função para habilitar e desabilitar os componentes de filtros
function ativaDivsOpMorfologicos(mostrar) {
    divOpcaoOpMorfologicos.style.display = mostrar ? 'block' : 'none';
    divInfoOpMorfologicos.style.display = mostrar ? 'block' : 'none';
    divImagemImportadaFiltro.style.display = mostrar ? 'block' : 'none';
    divImagemFiltradaFiltro.style.display = mostrar ? 'block' : 'none';
    divBotaoAplicar.style.display = mostrar ? "block" : "none";
}

//Função para habilitar e desabilitar os componentes de filtros
function ativaDivsTransformacoes(mostrar) {
    divTranformacoes.style.display = mostrar ? 'block' : 'none';
    divImagemImportadaFiltro.style.display = mostrar ? 'block' : 'none';
    divImagemFiltradaFiltro.style.display = mostrar ? 'block' : 'none';
    divBotaoAplicar.style.display = mostrar ? "block" : "none";
}

//Seta os valores dos filtros nos input, para visualização do usuário na matriz 1
function setValoresDosFiltrosNosInputsM1(matriz) {
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

//função pra limpar canvas do histograma
function limparCanvasHistograma(){
    canvasImagemOriginalHist.clearRect(0, 0, imagemOriginalHist.width, imagemOriginalHist.height);
    canvasHistogramaDaImagemOriginal.clearRect(0, 0, histogramaDaImagemOriginal.width, histogramaDaImagemOriginal.height);
    canvasImagemModificadaHist.clearRect(0, 0, imagemModificadaHist.width, imagemModificadaHist.height);
    canvasHistogramaDaImagemModificada.clearRect(0, 0, histogramaDaImagemModificada.width, histogramaDaImagemModificada.height)
}

function setValoresDosFiltrosNosInputsOp(matriz) {
    celulaOp00.value = matriz[0][0];
    celulaOp01.value = matriz[0][1];
    celulaOp02.value = matriz[0][2];
    celulaOp10.value = matriz[1][0];
    celulaOp11.value = matriz[1][1];
    celulaOp12.value = matriz[1][2];
    celulaOp20.value = matriz[2][0];
    celulaOp21.value = matriz[2][1];
    celulaOp22.value = matriz[2][2];
}

//Seta os valores dos filtros nos input, para visualização do usuário na matriz 2
function setValoresDosFiltrosNosInputsM2(matriz) {
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

function lidarComUploadDeArquivo2(evento) {
    evento.target.files[0];
    const arquivo = evento.target.files[0]; // Obtém o primeiro arquivo selecionado
    radioTruncamento.checked = true;


    if (controleDeAberturaDeImagens2 === 0) {
        if (arquivo) {
            divOpcaoDeProcesso.style.display = "block";
            ativaDivsDeFiltro(true);
            habilitaDesabilitaInputeAplicacaoDoFiltro(true);

            if (divOpcaoOpMorfologicos.style.display === "block") {
                ativaDivsOpMorfologicos(false);
            }

            let largura2 = canvasImgBinaria.width;
            let altura2 = canvasImgBinaria.height;
            canvasBin.clearRect(0, 0, largura2, altura2);
            matrizBase2 = [];
            const leitor = new FileReader(); // Cria uma nova instância do FileReader para ler o arquivo
            leitor.onload = function (e) { // Define uma função que será chamada quando a leitura do arquivo estiver completa
                const texto = e.target.result; // Obtém o conteúdo do arquivo como texto
                dadosPGM = analisarPGM(texto); // Analisa o conteúdo do arquivo PGM e extrai os dados da imagem                       
                matrizBase2 = criarMatriz(dadosPGM); // Cria a matriz de 256x256 com os valores dos pixels
                canvasBin.clearRect(0, 0, largura2, altura2);
                renderizarPGMNoCanvas(dadosPGM, matrizBase2, canvasImgBinaria); // Renderiza a imagem PGM no canvas usando a matriz

                // Atualiza a variável global com a última imagem carregada
                ultimaImagemCarregada = matrizBase2;
            };
            leitor.readAsText(arquivo); // Inicia a leitura do conteúdo do arquivo como texto
        }
        divImagemBinaria.style.display = "block";
        divImportarParaOperacao.style.display = "none";
        btnAplicarFlitro.disabled = false;
        controleDeAberturaDeImagens2 = 1;
    }
}

// Função principal para inicializar o processo de upload e renderização
function iniciar() {
    document.getElementById('imagemInput').addEventListener('change', lidarComUploadDeArquivo);
}

function abrirOutraImagem() {
    document.getElementById('imagemInputOperacoesB').addEventListener('change', lidarComUploadDeArquivo2);
}

// Função para lidar com o upload do arquivo
function lidarComUploadDeArquivo(evento) {
    const arquivo = evento.target.files[0]; // Obtém o primeiro arquivo selecionado
    radioTruncamento.checked = true;

    if (arquivo) {
        divOpcaoDeProcesso.style.display = "block";
        ativaDivsDeFiltro(true);
        habilitaDesabilitaInputeAplicacaoDoFiltro(true);

        if (divOpcaoOpMorfologicos.style.display === "block") {
            ativaDivsOpMorfologicos(false);
        }

        let largura2 = canvaDaImagemPrincipalFiltros.width;
        let altura2 = canvaDaImagemPrincipalFiltros.height;
        canvasCtx.clearRect(0, 0, largura2, altura2);

        const leitor = new FileReader(); // Cria uma nova instância do FileReader para ler o arquivo
        leitor.onload = function (e) { // Define uma função que será chamada quando a leitura do arquivo estiver completa
            const texto = e.target.result; // Obtém o conteúdo do arquivo como texto
            dadosPGM = analisarPGM(texto); // Analisa o conteúdo do arquivo PGM e extrai os dados da imagem            
            matrizBase = criarMatriz(dadosPGM); // Cria a matriz de 256x256 com os valores dos pixels
            canvasCtx.clearRect(0, 0, largura2, altura2);
            renderizarPGMNoCanvas(dadosPGM, matrizBase, canvaDaImagemPrincipalFiltros); // Renderiza a imagem PGM no canvas usando a matriz
               
            for(var linha = 0; linha < matrizBase.length; linha++){
                var linhas = [];
                for(var coluna = 0; coluna < matrizBase[0].length; coluna++){
                    linhas.push(matrizBase[linha][coluna]);
                }
                matrizParaHistograma.push(linhas);
            }         
        };

        leitor.readAsText(arquivo); // Inicia a leitura do conteúdo do arquivo como texto
    }
}

// Inicializa o script ao carregar a página
document.addEventListener('DOMContentLoaded', iniciar);
document.addEventListener('DOMContentLoaded', abrirOutraImagem);

// Ouvinte para verificar mudanças de opção no processamento
opcaoDeProcessamento.addEventListener('change', function () {

    //Desativa tudo caso troque a opção, assim a a gente evita ficar pondo uma chamada de false em cada if
    ativaDivsDeFiltro(false);
    habilitaDesabilitaInputeAplicacaoDoFiltro(false);
    ativaDivsOpMorfologicos(false);
    habilitaDesabilitaInputeAplicacaoDoOp(false);
    limpaCanvasSaidas();
    ativaDivsTransformacoes(false);

    if (opcaoDeProcessamento.value === "opcaoP1") {
        ativaDivsDeFiltro(true);
        habilitaDesabilitaInputeAplicacaoDoFiltro(true);
        desativaAtivaCanvasDeSaidas(false);
        btnAplicarFlitro.disabled = false;

    }
    else if (opcaoDeProcessamento.value === "opcaoP2") {
        document.getElementById('divParteHistrograma').style.display = 'flex';
        limparCanvasHistograma();
        //Canvas da Imagem(Original)
        renderizarPGMNoCanvas(dadosPGM, matrizBase, imagemOriginalHist);
        
        var tb3 = criacaoDasTabelas(matrizBase, 256);
        var matrizEql = retornaMatrizEqualizada(matrizBase, tb3);
        //Canvas da Imagem do histograma(Equalizada)
        renderizarPGMNoCanvas(dadosPGM, matrizEql, imagemModificadaHist);

        //exibirInformacoesHistograma(matrizBase);
    }
    else if (opcaoDeProcessamento.value === 'opcaoP3') {
        ativaDivsOpMorfologicos(true);
        habilitaDesabilitaInputeAplicacaoDoOp(true);
        const largura = canvasImgFiltrada.width;
        const altura = canvasImgFiltrada.height;
        canvasBin.clearRect(0, 0, largura, altura);
        gerarImagemBin(matrizBase);
    }
    else if (opcaoDeProcessamento.value === 'opcaoP4') {
        ativaDivsTransformacoes(true);
        const largura = canvasImgFiltrada.width;
        const altura = canvasImgFiltrada.height;
        canvasBin.clearRect(0, 0, largura, altura);
    }
    else {
        alert('Falta IMPLEMENTAR....');
    }
});

// Ouvinte para verificar mudanças de opção dos filtros
selectOpcoesFiltro.addEventListener('change', function () {
    divMatriz1.style.display = "block";
    limpaCanvasSaidas();
    divImagemBinaria.style.display = "none";
    divImportarParaOperacao.style.display = "none";

    if (selectOpcoesFiltro.value === "opcao1") {
        habilitaDesabilitaInputeAplicacaoDoFiltro(true);
        opcaoDeFiltro = "";
        tituloMatriz1.innerText = "Filtro"
        divMatriz2.style.display = 'none';
    }
    else {
        habilitaDesabilitaInputeAplicacaoDoFiltro(false);
        opcaoDeFiltro = selectOpcoesFiltro.value;
        divValorParaFiltroHB.style.display = 'none';
        divMatriz2.style.display = 'none';
        ativaDesativaDivImportImagemSecundaria(false);
        desativaAtivaCanvasDeSaidas(false);
        canvasImgFiltrada.style.display = "block";

        if (selectOpcoesFiltro.value === "opcao2") {
            tituloMatriz1.innerText = "Média";
            setValoresDosFiltrosNosInputsM1(filtro.Media);
        }
        else if (selectOpcoesFiltro.value === "opcao3") {
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
        else if (selectOpcoesFiltro.value === "opcao4") {
            tituloMatriz1.innerText = "Passa Alta Básica";
            setValoresDosFiltrosNosInputsM1(filtro.PassaAlta);
        }
        else if (selectOpcoesFiltro.value === "opcao5") {
            tituloMatriz1.innerText = "Roberts em X";
            setValoresDosFiltrosNosInputsM1(filtro.OpRobertsX);
        }
        else if (selectOpcoesFiltro.value === "opcao6") {
            tituloMatriz1.innerText = "Roberts em Y";
            setValoresDosFiltrosNosInputsM1(filtro.OpRobertsY);
        }
        else if (selectOpcoesFiltro.value === "opcao7") {
            divMatriz2.style.display = 'block';
            canvasImgFiltrada2.style.display = "block";
            canvasImgFiltrada3.style.display = "block";

            tituloMatriz1.innerText = "Roberts em X";
            setValoresDosFiltrosNosInputsM1(filtro.OpRobertsX);

            tituloMatriz2.innerText = "Roberts em Y";
            setValoresDosFiltrosNosInputsM2(filtro.OpRobertsY);
        }
        else if (selectOpcoesFiltro.value === "opcao8") {
            tituloMatriz1.innerText = "Roberts Cruzado em X";
            setValoresDosFiltrosNosInputsM1(filtro.OpRobertsCruzadoX);
        }
        else if (selectOpcoesFiltro.value === "opcao9") {
            tituloMatriz1.innerText = "Roberts Cruzado em Y";
            setValoresDosFiltrosNosInputsM1(filtro.OpRobertsCruzadoY);
        }
        else if (selectOpcoesFiltro.value === "opcao10") {
            divMatriz2.style.display = 'block';
            canvasImgFiltrada2.style.display = "block";
            canvasImgFiltrada3.style.display = "block";
            tituloMatriz1.innerText = "Roberts Cruzado em X";
            setValoresDosFiltrosNosInputsM1(filtro.OpRobertsCruzadoX);

            tituloMatriz2.innerText = "Roberts Cruzado em Y";
            setValoresDosFiltrosNosInputsM2(filtro.OpRobertsCruzadoY);
        }
        else if (selectOpcoesFiltro.value === "opcao11") {
            tituloMatriz1.innerText = "Prewitt em X";
            setValoresDosFiltrosNosInputsM1(filtro.PrewittX);
        }
        else if (selectOpcoesFiltro.value === "opcao12") {
            tituloMatriz1.innerText = "Prewitt em Y";
            setValoresDosFiltrosNosInputsM1(filtro.PrewittY);
        }
        else if (selectOpcoesFiltro.value === "opcao13") {
            divMatriz2.style.display = 'block';
            canvasImgFiltrada2.style.display = "block";
            canvasImgFiltrada3.style.display = "block";
            tituloMatriz1.innerText = "Prewitt em X";
            setValoresDosFiltrosNosInputsM1(filtro.PrewittX);

            tituloMatriz2.innerText = "Prewitt em Y";
            setValoresDosFiltrosNosInputsM2(filtro.PrewittY);
        }
        else if (selectOpcoesFiltro.value === "opcao14") {
            divValorParaFiltroHB.style.display = 'block';
            tituloMatriz1.innerText = "Auto Reforço HB 01";
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
            divValorParaFiltroHB.style.display = "none";
            tituloMatriz1.innerText = "Auto Reforço HB 02";
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
        else if (selectOpcoesFiltro.value === "opcao16") {
            tituloMatriz1.innerText = "Sobel em X";
            setValoresDosFiltrosNosInputsM1(filtro.SobelX);
        }
        else if (selectOpcoesFiltro.value === "opcao17") {
            tituloMatriz1.innerText = "Sobel em Y";
            setValoresDosFiltrosNosInputsM1(filtro.SobelY);
        }
        else if (selectOpcoesFiltro.value === "opcao18") {
            divMatriz2.style.display = 'block';
            canvasImgFiltrada2.style.display = "block";
            canvasImgFiltrada3.style.display = "block";
            tituloMatriz1.innerText = "Sobel em X";
            setValoresDosFiltrosNosInputsM1(filtro.SobelX);

            tituloMatriz2.innerText = "Sobel em Y";
            setValoresDosFiltrosNosInputsM2(filtro.SobelY);
        }


        //Operações básicas

        else if (selectOpcoesFiltro.value === "opcao19" ||
            selectOpcoesFiltro.value === "opcao20" ||
            selectOpcoesFiltro.value === "opcao21" ||
            selectOpcoesFiltro.value === "opcao22" ||
            selectOpcoesFiltro.value === "opcao23" ||
            selectOpcoesFiltro.value === "opcao24" ||
            selectOpcoesFiltro.value === "opcao25"
        ) {
            divMatriz1.style.display = 'none';
            divMatriz2.style.display = 'none';

            if (controleDeAberturaDeImagens2 === 0) {
                divMatriz1.style.display = "none";
                divMatriz2.style.display = "none";
                ativaDesativaDivImportImagemSecundaria(false);
                btnAplicarFlitro.disabled = true;
                divImagemBinaria.style.display = "none";
                divImportarParaOperacao.style.display = "block"
            }
            else {
                ativaDesativaDivImportImagemSecundaria(true);
                btnAplicarFlitro.disabled = false;
                divImagemBinaria.style.display = "block";
                divImportarParaOperacao.style.display = "none"
            }

        }
    }

});

// Ouvinte para verificar mudanças de opção dos filtros
selectOpcoesOpMorfologicos.addEventListener('change', function () {
    desativaAtivaCanvasDeSaidas(false);
    limpaCanvasSaidas();
    if (selectOpcoesOpMorfologicos.value === "opcao1") {
        habilitaDesabilitaInputeAplicacaoDoOp(true);
        opcaoOpMorfologicos = "";
        tituloMatriz1.innerText = "Mascara"
        divMatriz2.style.display = 'none';
    }
    else {
        habilitaDesabilitaInputeAplicacaoDoOp(false);
        opcaoOpMorfologicos = selectOpcoesOpMorfologicos.value;
        divMatriz2.style.display = 'none';
        canvasImgFiltrada.style.display = "block";
        setValoresDosFiltrosNosInputsM1(opMorfologicas.matrizBase);

        if (selectOpcoesOpMorfologicos.value === "op2") {
            tituloMatriz1.innerText = "Erosão Cinza";
        } else if (selectOpcoesOpMorfologicos.value === "op3") {
            tituloMatriz1.innerText = "Dilatação Cinza";
        } else if (selectOpcoesOpMorfologicos.value === "op4") {
            tituloMatriz1.innerText = "Erosão Binária";
        } else if (selectOpcoesOpMorfologicos.value === "op5") {
            tituloMatriz1.innerText = "Dilatação Binária";
        } else if (selectOpcoesOpMorfologicos.value === "op6") {
            tituloMatriz1.innerText = "Abertura";
        } else if (selectOpcoesOpMorfologicos.value === "op7") {
            tituloMatriz1.innerText = "Fechamento";
        } else if (selectOpcoesOpMorfologicos.value === "op8") {
            tituloMatriz1.innerText = "Gradiente";
        } else if (selectOpcoesOpMorfologicos.value === "op9") {
            tituloMatriz1.innerText = "Top Hat";
            canvasImgFiltrada2.style.display = 'block';
        } else if (selectOpcoesOpMorfologicos.value === "op10") {
            tituloMatriz1.innerText = "Bottom Hat";
            canvasImgFiltrada2.style.display = 'block';
        }

        let largura = canvasImgFiltrada.width;
        let altura = canvasImgFiltrada.height;
        canvasFiltro.clearRect(0, 0, largura, altura);
    }

});

selectTransformacoes.addEventListener('change', function () {
    desativaAtivaCanvasDeSaidas(false);
    limpaCanvasSaidas();
    if (selectTransformacoes.value === "opcao1") {
        habilitaDesabilitaInputeAplicacaoDoFiltro(true);
        transformacoes = "";
        tituloMatriz1.innerText = "Mascara"
        divMatriz2.style.display = 'none';
    }
    else {
        habilitaDesabilitaInputeAplicacaoDoFiltro(false);
        transformacoes = selectTransformacoes.value;
        divMatriz2.style.display = 'none';
        canvasImgFiltrada.style.display = "block";
        setValoresDosFiltrosNosInputsM1(opMorfologicas.matrizBase);

        setSeeInput();

        if (selectTransformacoes.value === "trans1") {
            tituloMatriz1.innerText = "Negativo";
        } else if (selectTransformacoes.value === "trans2") {
            tituloMatriz1.innerText = "Gama";
            inputGama.style.display = 'block';
        } else if (selectTransformacoes.value === "trans3") {
            tituloMatriz1.innerText = "Logaritmo";
            inputLog.style.display = 'block';
        } else if (selectTransformacoes.value === "trans4") {
            tituloMatriz1.innerText = "Intensidade Geral";
            inputIntGeral.style.display = 'block';
        } else if (selectTransformacoes.value === "trans5") {
            tituloMatriz1.innerText = "Faixa Dinãmica";
            inputFxDin.style.display = 'block';
        } else if (selectTransformacoes.value === "trans6") {
            tituloMatriz1.innerText = "Linear";
            inputLinear.style.display = 'block';
        }

        let largura = canvasImgFiltrada.width;
        let altura = canvasImgFiltrada.height;
        canvasFiltro.clearRect(0, 0, largura, altura);
    }

});

function setSeeInput(){
    inputGama.style.display = 'none';
    inputLog.style.display = 'none';
    inputIntGeral.style.display = 'none';
    inputFxDin.style.display = 'none';
    inputLinear.style.display = 'none';
}

// ouvinte para quando o botão for clicado, o valor seja setado na matriz
btnSetarHBNaMatriz.addEventListener('click', function () {
    if(opcaoDeFiltro === "opcao14"){
        let valor = 9 * EntradaValorHB.value - 1;
        celula11.value = valor;
    }
    else if(opcaoDeFiltro === "opcao15"){
        celula11.value = EntradaValorHB.value
    }
    
});

// Ouvinte para aplicar os filtros
btnAplicarFlitro.addEventListener('click', function () {
    //Como pode haver modificações feitas pelo o usuário, então é mais prudente pegar os valores que foi mostrado para o usuário
    //Se pegar diretamente do filtro pode não ser o resultado esperado pelo o usuário, uma vez que possa ter mudado o valor do filtro.
    let filtroAtualizado = [
        [celula00.value, celula01.value, celula02.value],
        [celula10.value, celula11.value, celula12.value],
        [celula20.value, celula21.value, celula22.value]
    ];

    let matrizModificada = [];
    limpaCanvasSaidas();

    if (opcaoDeFiltro === "opcao2" ||
        opcaoDeFiltro === "opcao4" ||
        opcaoDeFiltro === "opcao5" ||
        opcaoDeFiltro === "opcao6" ||
        opcaoDeFiltro === "opcao8" ||
        opcaoDeFiltro === "opcao9" ||
        opcaoDeFiltro === "opcao11" ||
        opcaoDeFiltro === "opcao12" ||
        opcaoDeFiltro === "opcao14" ||
        opcaoDeFiltro === "opcao15" ||
        opcaoDeFiltro === "opcao16" ) {

        ativaDesativaDivImportImagemSecundaria(false);
        matrizModificada = aplicar.matrizesComFiltros(matrizBase, filtroAtualizado);
    }
    else if(opcaoDeFiltro === "opcao17"){
        ativaDesativaDivImportImagemSecundaria(false);
        matrizModificada = aplicar.autoReforco2(matrizBase);
    }
    else if (opcaoDeFiltro === "opcao3") {
        matrizModificada = aplicar.filtroMediana(matrizBase);
    }    
    else if (opcaoDeFiltro === "opcao7" ||
        opcaoDeFiltro === "opcao10" ||
        opcaoDeFiltro === "opcao13" ||
        opcaoDeFiltro === "opcao18") {

        matrizModificada = aplicar.matrizesComFiltros(matrizBase, filtroAtualizado);
        ativaDesativaDivImportImagemSecundaria(false);

        let filtroAtualizadoY = [
            [_celula00.value, _celula01.value, _celula02.value],
            [_celula10.value, _celula11.value, _celula12.value],
            [_celula20.value, _celula21.value, _celula22.value]
        ];

        var matrizY = aplicar.matrizesComFiltros(matrizBase, filtroAtualizadoY);
        var matrizC = aplicar.somaDeMatrizes(matrizModificada, matrizY);

        if (radioTruncamento.checked) {
            matrizModificada = truncarValores(matrizModificada);
            matrizY = truncarValores(matrizY);
            matrizC = truncarValores(matrizC);
        }
        else {
            matrizModificada = normalizarValores(matrizModificada);
            matrizY = normalizarValores(matrizY);
            matrizC = normalizarValores(matrizC);
        }
        renderizarPGMNoCanvas(dadosPGM, matrizModificada, canvasImgFiltrada);
        renderizarPGMNoCanvas(dadosPGM, matrizY, canvasImgFiltrada2);
        renderizarPGMNoCanvas(dadosPGM, matrizC, canvasImgFiltrada3);

        return;

    }

    else if (opcaoDeFiltro === "opcao19") {
        ativaDesativaDivImportImagemSecundaria(false);
        matrizModificada = aplicar.somaDeMatrizes(matrizBase, matrizBase2);
    }
    else if (opcaoDeFiltro === "opcao20") {
        ativaDesativaDivImportImagemSecundaria(false);
        matrizModificada = aplicar.subtracaoDeMatrizes(matrizBase, matrizBase2);
    }
    else if (opcaoDeFiltro === "opcao21") {
        ativaDesativaDivImportImagemSecundaria(false);
        matrizModificada = aplicar.multiplicacaoDeMatrizes(matrizBase, matrizBase2);
    }
    else if (opcaoDeFiltro === "opcao22") {
        ativaDesativaDivImportImagemSecundaria(false);
        matrizModificada = aplicar.divisaoDeMatrizes(matrizBase, matrizBase2);
    }
    else if (opcaoDeFiltro === "opcao23") {
        ativaDesativaDivImportImagemSecundaria(false);
        matrizModificada = aplicar.combinacaoBinariaOR(matrizBase, matrizBase2);
    }
    else if (opcaoDeFiltro === "opcao24") {
        ativaDesativaDivImportImagemSecundaria(false);
        matrizModificada = aplicar.combinacaoBinariaAND(matrizBase, matrizBase2);
    }
    else if (opcaoDeFiltro === "opcao25") {
        ativaDesativaDivImportImagemSecundaria(false);
        matrizModificada = aplicar.combinacaoBinariaXOR(matrizBase, matrizBase2);
    }

    //Aplicar o truncamento ou normalização
    if (radioTruncamento.checked) {
        matrizModificada = truncarValores(matrizModificada);
    }
    else {
        matrizModificada = normalizarValores(matrizModificada);
    }
    renderizarPGMNoCanvas(dadosPGM, matrizModificada, canvasImgFiltrada);
});

//
btnFecharHistograma.addEventListener('click', function () {
    document.getElementById('divParteHistrograma').style.display = 'none';
    canvasImgBinaria.style.display = 'none';
});

// Ouvinte para aplicar os filtros
btnAplicarOpMorfologicos.addEventListener('click', function () {
    //Como pode haver modificações feitas pelo o usuário, então é mais prudente pegar os valores que foi mostrado para o usuário
    //Se pegar diretamente do filtro pode não ser o resultado esperado pelo o usuário, uma vez que possa ter mudado o valor do filtro.
    canvasImgFiltrada.style.display = "none";
    let filtroAtualizado = [
        [celulaOp00.value, celulaOp01.value, celulaOp02.value],
        [celulaOp10.value, celulaOp11.value, celulaOp12.value],
        [celulaOp20.value, celulaOp21.value, celulaOp22.value]
    ];
    let seeBin = false;
    let abertura = 0;
    let fechadura = 0;
    let gradiente = 0;
    let topHat = 0;
    let bottomHat = 0;
    let matrizModificada = [];
    let largura = canvasImgFiltrada4.width;
    let altura = canvasImgFiltrada4.height;
    limpaCanvasSaidas();

    if (opcaoOpMorfologicos === "op2") {
        matrizModificada = opMorfologicas.grayErosion(matrizBase, filtroAtualizado);
    } else if (opcaoOpMorfologicos === "op3") {
        matrizModificada = opMorfologicas.grayDilation(matrizBase, filtroAtualizado);
    } else if (opcaoOpMorfologicos === "op4") {
        seeBin = true;
        matrizModificada = teste.binaryErosion(matrizBase, filtroAtualizado);
    } else if (opcaoOpMorfologicos === "op5") {
        seeBin = true;
        matrizModificada = opMorfologicas.binaryDilation(matrizBase, filtroAtualizado);
    } else if (opcaoOpMorfologicos === "op6") {
        if(radioIsBinary.checked){
            abertura = 2;
        }
        else{ 
            abertura = 1;
        }
        matrizModificada = opMorfologicas.binaryOpening(matrizBase, filtroAtualizado, radioIsBinary.checked);
    } else if (opcaoOpMorfologicos === "op7") {
        if(radioIsBinary.checked){
            fechadura = 2;
        }
        else{ 
            fechadura = 1;
        }
        matrizModificada = opMorfologicas.binaryClosing(matrizBase, filtroAtualizado, radioIsBinary.checked);
    } else if (opcaoOpMorfologicos === "op8") {
        if(radioIsBinary.checked){
            gradiente = 2;
        }
        else{ 
            gradiente = 1;
        }
        matrizModificada = opMorfologicas.binaryGradient(matrizBase, filtroAtualizado, radioIsBinary.checked);
    } else if (opcaoOpMorfologicos === "op9") {
        if(radioIsBinary.checked){
            topHat = 2;
        }
        else{ 
            topHat = 1;
        }
        matrizModificada = opMorfologicas.binaryTopHat(matrizBase, filtroAtualizado, radioIsBinary.checked);
    } else if (opcaoOpMorfologicos === "op10") {
        if(radioIsBinary.checked){
            bottomHat = 2;
        }
        else{ 
            bottomHat = 1;
        }
        matrizModificada = opMorfologicas.binaryBottomHat(matrizBase, filtroAtualizado);
    }

    if (seeBin){
        canvasImgFiltrada.style.display = "block";

        renderizarPGMNoCanvas(dadosPGM, opMorfologicas.pegarMediaImagem(matrizBase), canvasImgFiltrada);
    }

    if (abertura === 1){
        canvasImgFiltrada.style.display = "block";

        renderizarPGMNoCanvas(dadosPGM, opMorfologicas.imagemErodida, canvasImgFiltrada);
    }else if(abertura === 2){
        canvasImgFiltrada2.style.display = "block";
        canvasImgFiltrada.style.display = "block";

        renderizarPGMNoCanvas(dadosPGM, opMorfologicas.imagemErodida, canvasImgFiltrada2);
        renderizarPGMNoCanvas(dadosPGM, opMorfologicas.imagemBinaria, canvasImgFiltrada);
    }

    if (fechadura === 1){
        canvasImgFiltrada.style.display = "block";

        renderizarPGMNoCanvas(dadosPGM, opMorfologicas.imagemDilatada, canvasImgFiltrada);
    }else if(fechadura === 2){
        canvasImgFiltrada2.style.display = "block";
        canvasImgFiltrada.style.display = "block";

        renderizarPGMNoCanvas(dadosPGM, opMorfologicas.imagemDilatada, canvasImgFiltrada2);
        renderizarPGMNoCanvas(dadosPGM, opMorfologicas.imagemBinaria, canvasImgFiltrada);
    }

    if (gradiente === 1){
        canvasImgFiltrada2.style.display = "block";
        canvasImgFiltrada.style.display = "block";

        renderizarPGMNoCanvas(dadosPGM, opMorfologicas.imagemDilatada, canvasImgFiltrada2);
        renderizarPGMNoCanvas(dadosPGM, opMorfologicas.imagemErodida, canvasImgFiltrada);
    }else if(gradiente === 2){
        canvasImgFiltrada3.style.display = "block";
        canvasImgFiltrada2.style.display = "block";        
        canvasImgFiltrada.style.display = "block";

        renderizarPGMNoCanvas(dadosPGM, opMorfologicas.imagemDilatada, canvasImgFiltrada3);
        renderizarPGMNoCanvas(dadosPGM, opMorfologicas.imagemErodida, canvasImgFiltrada2);
        renderizarPGMNoCanvas(dadosPGM, opMorfologicas.imagemBinaria, canvasImgFiltrada);
    }

    if (topHat === 1){
        canvasImgFiltrada2.style.display = "block";
        canvasImgFiltrada.style.display = "block";

        renderizarPGMNoCanvas(dadosPGM, opMorfologicas.imagemAberta, canvasImgFiltrada2);
        renderizarPGMNoCanvas(dadosPGM, opMorfologicas.imagemErodida, canvasImgFiltrada);
    }else if(topHat === 2){
        canvasImgFiltrada3.style.display = "block";
        canvasImgFiltrada2.style.display = "block";        
        canvasImgFiltrada.style.display = "block";

        renderizarPGMNoCanvas(dadosPGM, opMorfologicas.imagemAberta, canvasImgFiltrada3);
        renderizarPGMNoCanvas(dadosPGM, opMorfologicas.imagemErodida, canvasImgFiltrada2);
        renderizarPGMNoCanvas(dadosPGM, opMorfologicas.imagemBinaria, canvasImgFiltrada);
    }

    if (bottomHat === 1){
        canvasImgFiltrada2.style.display = "block";
        canvasImgFiltrada.style.display = "block";

        renderizarPGMNoCanvas(dadosPGM, opMorfologicas.imagemFechada, canvasImgFiltrada2);
        renderizarPGMNoCanvas(dadosPGM, opMorfologicas.imagemDilatada, canvasImgFiltrada);
    }else if(bottomHat === 2){
        canvasImgFiltrada3.style.display = "block";
        canvasImgFiltrada2.style.display = "block";        
        canvasImgFiltrada.style.display = "block";

        renderizarPGMNoCanvas(dadosPGM, opMorfologicas.imagemFechada, canvasImgFiltrada3);
        renderizarPGMNoCanvas(dadosPGM, opMorfologicas.imagemDilatada, canvasImgFiltrada2);
        renderizarPGMNoCanvas(dadosPGM, opMorfologicas.imagemBinaria, canvasImgFiltrada);
    }

    canvasFiltro4.clearRect(0, 0, largura, altura);
    canvasImgFiltrada4.style.display = 'block';
    renderizarPGMNoCanvas(dadosPGM, matrizModificada, canvasImgFiltrada4);
    radioIsBinary.checked = false;
});

btnAplicarTrans.addEventListener('click', function () {
    //Como pode haver modificações feitas pelo o usuário, então é mais prudente pegar os valores que foi mostrado para o usuário
    //Se pegar diretamente do filtro pode não ser o resultado esperado pelo o usuário, uma vez que possa ter mudado o valor do filtro.

    let matrizModificada = [];
    let largura = canvasImgFiltrada.width;
    let altura = canvasImgFiltrada.height;
    canvasFiltro.clearRect(0, 0, largura, altura);

    if (transformacoes === "trans1") {
        matrizModificada = transformacoesImg.negativo(matrizBase);
    } else if (transformacoes === "trans2") {
        const gama = document.getElementById('gama').value;
        matrizModificada = transformacoesImg.gama(matrizBase, gama);
    } else if (transformacoes === "trans3") {
        const log = document.getElementById('log').value;
        matrizModificada = transformacoesImg.logaritmo(matrizBase, log);
    } else if (transformacoes === "trans4") {
        const w = document.getElementById('intGW').value;
        const a = document.getElementById('intGA').value;
        matrizModificada = transformacoesImg.TransferênciadeIntensidadeGeral(matrizBase, w, a);
    } else if (transformacoes === "trans5") {
        const min = document.getElementById('fxDiMin').value;
        const max = document.getElementById('fxDiMax').value;
        matrizModificada = transformacoesImg.TransferênciaFaixaDinâmica(matrizBase, min, max);
    } else if (transformacoes === "trans6") {
        const a = document.getElementById('linearA').value;
        const b = document.getElementById('linearB').value;
        matrizModificada = transformacoesImg.TransferênciaLinear(matrizBase, a, b);
    }
    canvasFiltro.clearRect(0, 0, largura, altura);

    renderizarPGMNoCanvas(dadosPGM, matrizModificada, canvasImgFiltrada);
});