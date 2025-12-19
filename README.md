

# Frogger 

##  Descrição

Desenvolvido em **HTML, CSS e JavaScript**, utilizando **DOM e Grid** para representar o mapa.
O objetivo é atravessar o rio usando balsas e evitar carros até alcançar a área segura no topo.

---

## Estrutura do Jogo

* **Grid 10x10** representado por `divs`
* Cada célula possui um `id` no formato `blocoXY`
* O jogador, carros e balsas são controlados por **classes CSS**

---

##  Controles

* ⬆️ `ArrowUp` – mover para cima
* ⬇️ `ArrowDown` – mover para baixo
* ⬅️ `ArrowLeft` – mover para a esquerda
* ➡️ `ArrowRight` – mover para a direita

---

## Sistema de Vidas

* O jogador inicia com **3 vidas** `A primeiro vez no site começa com 10` 
* Colisão com carros ou água reduz uma vida
* Corações podem aparecer aleatoriamente no mapa para recuperar vidas
* Ao perder todas as vidas, o jogo é reiniciado

---

## Obstáculos e Elementos

* **Carros**: movem-se horizontalmente nas estradas e causam morte ao contato
* **Balsas**: movem-se no rio e transportam o jogador
* **Rio (azul)**: causa morte se o jogador não estiver sobre uma balsa
* **buracos**: Aparece aleatoriamente no mapa
* **Zona segura (verde)**: local de vitória

---

## Vitória e Dificuldade

* O jogo é vencido ao alcançar a célula central da linha superior
* A cada 3 vitórias, a velocidade dos obstáculos aumenta
* Após 5 vitórias, o número de vidas é reduzido para aumentar o desafio
