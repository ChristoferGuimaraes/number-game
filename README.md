<div id="top"></div>

# Qual é o número?

Um projeto/desafio com intuito de desenvolver uma aplicação de adivinhação o qual o número aleatório é recebido através de uma API e a aplicação deve tratar os dados recebidos conforme as especificações do desafio.

![number-ex](https://user-images.githubusercontent.com/32392449/151915610-ac273a9f-8487-43af-811d-421c00d56e78.png)

### Tecnologias

- [JavaScript](https://www.javascript.com/)
- [HTML5](https://developer.mozilla.org/en-US/docs/Glossary/HTML5)
- [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS)

## O desafio

O problema consiste em receber um número através de uma requisição e implementar
um jogo para acertar este número através de palpites. Ao errar um palpite, irá ser informado se
o número obtido é maior ou menor do que o palpite feito. O palpite realizado ou status code de
erro de requisição devem ser exibidos na tela no formato de **LED de 7 segmentos**. O palpite
será obtido como entrada em um campo de texto, que deverá ser processado apenas quando o
botão **ENVIAR** for clicado.
Para solucionar o problema proposto, deverá ser implementado a solução utilizando,
`HTML`, `CSS` e `Javascript` sem o uso de **Frameworks** e **Bibliotecas**.

## Especificações

A requisição é feita através da API: https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300.

Ausência de parâmetros ou parâmetros incorretos irão causar falha na requisição. Além disso, há uma pequena chance desta
requisição retornar com **erro** mesmo com parâmetros corretos. O `status code` em casos de
falha deverá ser mostrado no LED e pode ser obtido em métodos específicos da tecnologia
utilizada ou obtido do `JSON` respondido em casos de falha, no campo.

Será informado em um texto acima do LED os resultados possíveis:
- `"Erro"`: quando houver erro na requisição
- `"É menor"`: quando o palpite enviado é maior que o número obtido
- `"É maior"`: quando o palpite enviado é menor que o número obtido
- `"Você acertou!!!"`: quando o palpite enviado é igual ao número obtido
- `"Máximo 300!"`: quando o palpite enviado é maior que 300
- `"Mínimo 1!"`: quando o palpite enviado é menor que 1

Além disso, existe na tela um botão NOVA PARTIDA, cujo clique cria uma
nova partida obtendo um novo número aleatório (o que implica em fazer uma nova requisição).
É importante mencionar que o número a ser adivinhado pelo usuário foi
impreterivelmente obtido por meio da requisição descrita anteriormente.

## Implementação 

Segmentos:

- O display contem números **não-negativos** de `1` a `3` algarismos.
- O valor numérico exibido nos segmentos representam o palpite realizado ou
o `status code` obtido quando a requisição falhar.
</br></br>

Botão NOVA PARTIDA:

- O botão fica visível apenas quando houver **erro** ao receber o número ou quando
o jogador **acertar** o palpite.

![Screenshot_3](https://user-images.githubusercontent.com/32392449/151915252-2dd29997-2b7b-44b1-a77f-b84100cd64c2.png)
</br></br>

Campo de entrada:

- O valor recebido pelo `input` vai aparecer nos segmentos assim que o botão `ENVIAR` for clicado e o
`input` será resetado para o estado inicial.
- O botão de enviar ficará **desabilitado** quando houver `erro` ao receber o
número ou quando o jogador acertar o palpite. O usuário deverá clicar em "NOVA
PARTIDA" neste caso.

![disabled-btn](https://user-images.githubusercontent.com/32392449/151915133-a331bf6e-aea7-415e-9529-b8e02a01bcd9.png)
</br></br>

## Começando

[Clique aqui](https://whatisnumber.herokuapp.com/) para utilizar o app diretamente da web.

### Como usar localmente:

1. Clone o repositório
   ```sh
   git clone https://github.com/ChristoferGuimaraes/number-game
   ```
2. Instale os pacotes NPM
   ```sh
   npm install
   ```
3. Inicialize o projeto
   ```js
   npm start
   ```
  
## Contato

Christofer Guimarães - [LinkedIn](https://www.linkedin.com/in/christofer-guimar%C3%A3es-351149218/) - christoferguima@gmail.com

Project Link: [https://github.com/ChristoferGuimaraes/number-game](https://github.com/ChristoferGuimaraes/number-game)

<p align="right">(<a href="#top">back to top</a>)</p>