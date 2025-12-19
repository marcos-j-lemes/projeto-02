// Variáveis Globais:
const spanVidas = document.getElementById('vidas');
const gridSizeX = 10;
const gridSizeY = 10;

var posicaoX = 9;
var posicaoY = 4;

var rios = [ 1, 3, 8];
var balsa = [ 2, 4, 6, 8 ];
var direcao = [ 1, -1, 1, -1 ];

var estradas  = [6,5]; 
var carros = [1,5];
var direcaoCarros = [1, -1];

var a = false;
let vidas = 10;
let loopBalsas;


function iniciarLoop() {
    clearInterval(loopBalsas);
    loopBalsas = setInterval(movimentaBalsas, tempo);
}


function setDefaults()
{
    posicaoX = 9;
    posicaoY = 4;
    //vidas = 3;
    
    if ( vidas <= 1 ){
        vidas = 3;
    }
}


let vitorias = 0;
let tempo = 250;


// Registro de eventos:
document.addEventListener('DOMContentLoaded', inicializaJogo);
document.addEventListener('keydown', processaTecla);

// Funções:

function removeVida()
{
    vidas--;
    if (vidas == 0)
    {
        // TODO: Falta limpar o div "ambiente"
        let ambiente = document.querySelector(".ambiente");
        ambiente.innerHTML = "";
        alert("Game over");
        inicializaJogo();
    }
    else
    {
        atualizaVidas();
    }
}



function definirDirecao(elemento, direcao) {
    elemento.classList.remove(
        "dir-cima",
        "dir-direita",
        "dir-baixo",
        "dir-esquerda"
    );
    elemento.classList.add(direcao);
}

function processaTecla(evento)
{
 

    let atual = document.querySelector("#bloco"+posicaoX+posicaoY);
    atual.classList.remove("vermelho");

    if (evento.key == "ArrowDown")
    {
        definirDirecao(atual, "dir-baixo");
        let novaPosicao = document.querySelector("#bloco"+(posicaoX+1)+posicaoY);
        if (posicaoX < (gridSizeX-1) && !novaPosicao.classList.contains("azul"))
        {
            atual.classList.remove("jogador");
            novaPosicao.classList.add("jogador");
            definirDirecao(novaPosicao, "dir-baixo");
            posicaoX += 1;
           // winGame();
        }
        else
        {
            atual.classList.add("vermelho");
            removeVida();
        }
    }
    else if (evento.key == "ArrowRight")
    {
        definirDirecao(atual, "dir-direita");
        let novaPosicao = document.querySelector("#bloco"+posicaoX+(posicaoY+1));
        if (posicaoY < (gridSizeY-1) && !novaPosicao.classList.contains("azul"))
        {
            atual.classList.remove("jogador");
            novaPosicao.classList.add("jogador");
            definirDirecao(novaPosicao, "dir-direita");
            posicaoY += 1;
           //winGame();

        }
        else
        {
            atual.classList.add("vermelho");
            removeVida();
        }
    }
    else if (evento.key == "ArrowUp")
    {
        definirDirecao(atual, "dir-cima");
        let novaPosicao = document.querySelector("#bloco"+(posicaoX-1)+posicaoY);
        if (posicaoX > 0 && !novaPosicao.classList.contains("azul"))
        {
            atual.classList.remove("jogador");
            novaPosicao.classList.add("jogador");
            definirDirecao(novaPosicao, "dir-cima");
            posicaoX -= 1;
           // winGame();
        }
        else
        {
            atual.classList.add("vermelho");
            removeVida();
        }
    }
    else if (evento.key == "ArrowLeft")
    {
        definirDirecao(atual, "dir-esquerda");
        let novaPosicao = document.querySelector("#bloco"+posicaoX+(posicaoY-1));
        if (posicaoY > 0 && !novaPosicao.classList.contains("azul"))
        {
            atual.classList.remove("jogador");
            novaPosicao.classList.add("jogador");
            definirDirecao(novaPosicao, "dir-esquerda");
            posicaoY -= 1;
            //winGame();
        }
        else
        {
            atual.classList.add("vermelho");
            removeVida();
        }
    }

    
    if ( a == false ){
        sorteiaCoracao();
        a = true;
    }
    
    if (a == true){
        pegarCoracao();

    }


    if (posicaoX == 0 && posicaoY == Math.floor(gridSizeY/2)){
        winGame();
    }
}

function atualizaVidas()
{
    spanVidas.innerText = "❤️".repeat(vidas);
   // let spanVidas = document.querySelector("#vidas");
    //spanVidas.innerText = vidas;
}

function inicializaJogo()
{  

    vitoriasGame();
    let am = document.querySelector(".ambiente");
    am.innerHTML = "";

    a = false;
    setDefaults();
    criaGrid();
    
    // Criar jogador
    let jogador = document.querySelector("#bloco"+posicaoX+posicaoY);
    jogador.classList.add("jogador");
    
    // Criar rios
    rios.forEach((rio, cont_rio) => {
        for(let i = 0; i < gridSizeY; i++)
        {
            let elem = document.querySelector("#bloco"+rio+i);
            elem.classList.remove("cinza");
            if (balsa[cont_rio] == i)
                elem.classList.add("amarelo");
            else
                elem.classList.add("azul");
        }
    });

    // Criar estradas
    estradas.forEach((estrada, cont_estrada) => {
        for(let i = 0; i < gridSizeY; i++)
        {
            let elem = document.querySelector("#bloco"+estrada+i);
            elem.classList.remove("cinza");
            if (carros[cont_estrada] == i)
                elem.classList.add("carro");
            else
                elem.classList.add("preto");
        }
    });

    atualizaVidas();
    winGame();

}

function criaGrid()
{
    let ambiente = document.querySelector(".ambiente");

    for(let x = 0; x < gridSizeX; x++)
    {
        for(let y = 0; y < gridSizeY; y++)
        {
            let divNovo = document.createElement("div");
            divNovo.classList.add("bloco");
            divNovo.classList.add("cinza");
            divNovo.id = "bloco"+x+y;
            // divNovo.innerText = ""+x+y;

            if (y == 0)
            {
                divNovo.classList.add("left");
            }
            if (x == 0)
            {
                divNovo.classList.add("top");
            }
            if (y == gridSizeY-1)
            {
                divNovo.classList.add("right");
            }
            if (x == gridSizeX-1)
            {
                divNovo.classList.add("bottom");
            }

            ambiente.appendChild(divNovo);
        }
    }
}

iniciarLoop();
//setInterval(movimentaBalsas, tempo);
//setInterval(movimentaBalsas, 1000);

function movimentaBalsas()
{
    let atual = document.querySelector("#bloco"+posicaoX+posicaoY);

    rios.forEach((rio, index) => {
        let balsaAtual = document.querySelector("#bloco"+rio+balsa[index]);
        if (direcao[index] == 1)
        {
            balsa[index] += 1;
            if (balsa[index] == gridSizeY-1)
                direcao[index] = -1;
        }
        else
        {
            balsa[index] -= 1;
            if (balsa[index] == 0)
                direcao[index] = 1;
        }
        let balsaNova = document.querySelector("#bloco"+rio+(balsa[index]));

        balsaAtual.classList.remove("marrom");
        balsaAtual.classList.add("azul");

        // fixa o jogador em cima da balsa;
        if (balsaAtual.classList.contains("jogador") || atual == balsaAtual)
        {
            balsaAtual.classList.remove("jogador");
            posicaoX = rio;
            if ( atual === balsaAtual ){
                posicaoY = balsa[index];
            }
            atual = balsaNova;
            atual.classList.add("jogador");
        }

        balsaNova.classList.remove("azul");
        balsaNova.classList.add("marrom");
    });

    // Remover a lógica de movimento das balsas para as estradas
    estradas.forEach((estrada, index) => {
        let carroAtual = document.querySelector("#bloco"+estrada+carros[index]);
        if (direcaoCarros[index] == 1)
        {
            carros[index] += 1;
            if (carros[index] == gridSizeY-1)
                direcaoCarros[index] = -1;
        }
        else
        {
            carros[index] -= 1;
            if (carros[index] == 0)
                direcaoCarros[index] = 1;
        }
        let carroNovo = document.querySelector("#bloco"+estrada+(carros[index]));

        carroAtual.classList.remove("carro");
        carroAtual.classList.add("preto");

        // verifica se o jogador está na posição do carro
        if (carroAtual.classList.contains("jogador") || atual == carroAtual)
        {
            carroAtual.classList.remove("jogador");
            carroAtual.classList.add("vermelho"); // Adiciona a classe vermelha
            removeVida();
            // Volta o jogador uma casa
            if (posicaoX > 0) {
                let blocoAnterior = document.querySelector("#bloco"+(posicaoX-1)+posicaoY);
                blocoAnterior.classList.add("jogador");
                posicaoX -= 1;
            }
        }
        carroNovo.classList.remove("preto");
        carroNovo.classList.add("carro");
    });
}


function winGame()
{
    let blocoWin = document.querySelector("#bloco0"+Math.floor(gridSizeY/2));

   // console.log("Verificando vitória na posição: ", blocoWin);
   // blocoWin.classList.add("top");
    blocoWin.classList.remove("cinza");
    blocoWin.classList.add("verde");

    if (blocoWin.classList.contains("jogador"))
    {
        alert("Parabéns! Você venceu o jogo!");
        // Reinicia o jogo
        vitorias++;
        let ambiente = document.querySelector(".ambiente");
        ambiente.innerHTML = "";
        inicializaJogo();
    }

    if (vitorias % 3 == 0 && tempo > 10)
    {
        tempo -= 50; // Aumenta a velocidade do jogo a cada 3 vitórias
    }else if (vitorias == 5){
        vidas = 1
    };

    console.log("Vitórias: ", vitorias, " Tempo: ", tempo);
}


// função para sortear um coração pelo mapa:
function sorteiaCoracao()
{
    let x = Math.floor(Math.random() * gridSizeX);
    let y = Math.floor(Math.random() * gridSizeY);
    let bloco = document.querySelector("#bloco"+x+y);
    if (!bloco.classList.contains("jogador") && !bloco.classList.contains("azul") && !bloco.classList.contains("preto") && !bloco.classList.contains("marrom"))
    {
        bloco.classList.remove("cinza", "verde", "amarelo");
        bloco.classList.add("vidas", "vida-icon");
        //  setTimeout(() => {
        //     bloco.classList.remove("vidas");
        //     bloco.classList.remove("vida-icon");
        // }, 5000); // Remove o coração após 5 segundos

    }
}

function pegarCoracao()
{
    let blocoVidas = document.querySelector(".vidas");
    if (blocoVidas && blocoVidas.classList.contains("jogador"))
    {
        vidas++;   
        atualizaVidas();
        blocoVidas.classList.remove("vidas");
        console.log("Coração coletado! Vidas: ", vidas);

        // remover o coração 
        blocoVidas.classList.remove("vida-icon");
        blocoVidas.classList.add("cinza");
        a = false;
    }
}

//setInterval(sorteiaCoracao, 5000); // Sorteia um coração a cada 10 segundos

function vitoriasGame(){
    let spanVitorias = document.getElementById('vitorias');
    spanVitorias.innerText = "🏆".repeat(vitorias);

}
