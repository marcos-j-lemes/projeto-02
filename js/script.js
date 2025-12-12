//variáveis globais
var gridSizeX = 10;
var gridSizeY = 10;

var posicaoX = 0
var posicaoY = 0

var vidas = 5

var rio = 1;
var rios = [1, 3, 6, 8];

var victoria = [1,3,6,8];

//resgistro de eventos
document.addEventListener('DOMContentLoaded', inicializaJogo);
document.addEventListener('keydown', processaTecla)


//funções

function removeVida(){
    vidas--;

    if(vidas == 0){
        inicializaJogo();
    }else{
        atualizaVidas();
    }
}

function processaTecla(evento){
    let posicaoAtual = document.querySelector('#bloco'+posicaoX+posicaoY);

    if(evento.key == 'ArrowDown'){

        let novaPosicao = document.querySelector('#bloco'+(posicaoX + 1) + posicaoY)

        if(posicaoX < (gridSizeX -1) && !novaPosicao.classList.contains("azul")){
            posicaoAtual.classList.remove('jogador');
            novaPosicao.classList.add('jogador')
            posicaoX++
        }else{
            posicaoAtual.classList.add('vermelho')
            removeVida();
        }

    }else if(evento.key == 'ArrowRight'){

        if(posicaoY < (gridSizeX - 1)){
            let novaPosicao = document.querySelector('#bloco'+ posicaoX + (posicaoY +1))
            posicaoAtual.classList.remove('jogador');
            novaPosicao.classList.add('jogador')
            posicaoY++;
        }else{
            posicaoAtual.classList.add('vermelho')
            removeVida();
            if ( vida <= 0){
                alert("Fim de jogo");
            }
        }
        // Corrigir essa parte;
    }else if(evento.key == 'aa') {

        if(posicaoX < (gridSizeX - 1)){
            let novaPosicao = document.querySelector('#bloco' + posicaoY + (posicaoX - 1));
            posicaoAtual.classList.remove('jogador');
            novaPosicao.classList.add('jogador');
            posicaoY++
        } else {
            posicaoAtual.classList.add('vermelho')
            removeVida();
        }
        // a
    }else if(evento.key == 'ArrowLeft'){

        if(posicaoY < (gridSizeX - 1)){
            let novaPosicao = document.querySelector('#bloco'+ posicaoX + (posicaoY - 1))
            posicaoAtual.classList.remove('jogador');
            novaPosicao.classList.add('jogador')
            posicaoY--;
        }else{
            posicaoAtual.classList.add('vermelho')
            removeVida();
            if ( vida <= 0){
                alert("Fim de jogo");
            }
        }
    }else if(evento.key == 'Up'){
        if(posicaoX < (gridSizeY - 1)) {
            let novaPosicao = document.querySelector("#bloco"+posicaoX+(posicaoY));
            atualizaVidas.classList.remove("jogador");
            novaPosicao.classList.add("jogador");
            posicaoY += 1;
        }else {
            atualizaVidas.classList.add("vermelho");
            removeVida();
        }
    }

    // }else if(evento.key == 'up'){
    //     if(posicaoX < (gridSizeY - 1)) {
    //         let novaPosicao = document.querySelector("#bloco"+posicaoX+(posicaoY));
    //         atualizaVidas.classList.remove("jogador");
    //         novaPosicao.classList.add("jogador");
    //         posicaoY += 1;
    //     }else {
    //         atualizaVidas.classList.add("vermelho");
    //         removeVida();
    //     }
    // }else if (evento.key == "ArrowRight"){

    //     if (posicaoY < (gridSizeX -1)) {
    //         let novaPosicao = document.querySelector("#bloco"+posicaoX+(posicaoY+1));
    //         atualizaVidas.classList.remove("jogador");
    //         novaPosicao.classList.add("jogador");
    //     }else {
    //         posicaoAtual.classList.add('vermelho')
    //         removeVida();
    //     }
    // }else if (evento.key == "ArrowLeft"){

    //     if(posicaoX < (gridSizeY - 1)) {
    //         let novaPosicao = document.querySelector("#bloco"+posicaoX+(posicaoY+1));
    //         atualizaVidas.classList.remove("jogador");
    //         novaPosicao.classList.add("jogador");
    //         posicaoY += 1;
    //     }else {
    //         atualizaVidas.classList.add("vermelho");
    //         removeVida();
    //     }

    //}

}

function atualizaVidas(){
    let spanVidas = document.querySelector('#lifes');
    spanVidas.innerText = vidas;
}

var c = 11;
function inicializaJogo(){
    criaGrid();

    //Cria jogador
    let jogador = document.querySelector('#bloco'+posicaoX+posicaoY);
    jogador.classList.add('jogador');

    atualizaVidas();

    // criar os rio;
    rios.forEach(rio => {
        for(let i = 0; i < gridSizeY; i++){
            let elem = document.querySelector('#bloco' + rio+i);
            elem.classList.remove("cinza");
            elem.classList.add("azul");
        }
    });

// const randomIndex = Math.floor(Math.random() * arr.length);
//  const item = arr[randomIndex];

    // victoria.forEach(r => {
        //     for(let i = 0; i < rios.length; i++) {
            //         const numberRandom = Math.floor(Math.random() * rios.length);
            //         const valor = rios[numberRandom];
            
    //         let elem = document.querySelector('#bloco' + valor + i);
    //         elem.classList.remove('azul');
    //         elem.classList.add('verde');
    //     }
    // })
    
    var a = document.querySelector('#bloco' + c);
    a.classList.remove('azul');
    a.classList.add('verde');
    
    setInterval(mover, 1000, a)
}

function mover(a) {
    
    c++
    for(let i = 0; i < 1; i++){
        a.classList.remove('verde');
        a.classList.add('azul');
        
        
        a = document.querySelector('#bloco' + c)
        a.classList.remove('verde')
        a.classList.remove('azul');
        a.classList.add('verde');

    }

    return a

}


function criaGrid() {
    let ambient = document.querySelector('.ambiente');

    for( let x = 0; x < gridSizeX; x++) {
        for (let y = 0; y < gridSizeY; y++) {
            let divJogo = document.createElement('div');
            divJogo.classList.add('bloco');
            divJogo.classList.add('cinza');
            divJogo.id = "bloco"+x+y;
            divJogo.innerText = ""+x+y;

            if (y == 0){
                divJogo.classList.add('left');
            }
            if (x == 0){
                divJogo.classList.add('top');
            }
            if(y == gridSizeY-1){
                divJogo.classList.add('right');
            }
            if(x == gridSizeX-1){
                divJogo.classList.add('bottom');
            }


            ambient.appendChild(divJogo);
        }
    }
}