
const state = { 
  //view comandos visuais.
  // document.querySelector serve para puxar as variaveis do codigo html
   view: { 
     squares: document.querySelectorAll(".square"), // square são os quadrados do jogo.
     enemy: document.querySelector(".enemy"), // enemy inimigo do jogo"Ralph".
     timeLeft: document.querySelector("#time-left"), // time-left tempo do jogo.
     score: document.querySelector("#score"), // score pontuação do jogo
   }, 
  // values comandos de calculos não visuais na tela 
   values: { 
     gameVelocity: 1000, //velocidade do jogo.
     hitPosition: 0, // posição de click inicial.
     result: 0, // quantidade de pontos inicial.
     curretTime: 60, // tempo de duração do jogo.
   }, 
   actions: { 
     timerId: setInterval(randomSquare, 700), 
     countDownTimerId: setInterval(countDown, 1000), 
   }, 
 }; 
  //função para diminuir o tempo 
 function countDown() { 
   state.values.curretTime--; 
   state.view.timeLeft.textContent = state.values.curretTime; 
  
   if (state.values.curretTime <= 0) { 
     clearInterval(state.actions.countDownTimerId); 
     clearInterval(state.actions.timerId); 
     alert("Game Over! O seu resultado foi: " + state.values.result); 
   } 
 } 
  //função para acionar o som.
 function playSound(audioName) { 
   let audio = new Audio(`${audioName}.m4a`); 
   audio.volume = 0.1; 
   audio.play(); 
 } 
  //função para gerar um numero aleatório 
 function randomSquare() { 
   state.view.squares.forEach((square) => { 
     square.classList.remove("enemy"); 
   }); 
  
   let randomNumber = Math.floor(Math.random() * 9); 
   let randomSquare = state.view.squares[randomNumber]; 
   randomSquare.classList.add("enemy"); 
   state.values.hitPosition = randomSquare.id; 
 } 
  // função que confere se o usuário clicou no lugar certo, caso tenha clicado soma o ponto, caso não tenha não soma 
 function addListenerHitBox() { 
   state.view.squares.forEach((square) => { 
     square.addEventListener("mousedown", () => { 
       if (square.id === state.values.hitPosition) { 
         state.values.result++; 
         state.view.score.textContent = state.values.result; 
         state.values.hitPosition = null; 
         playSound("hit"); 
       } 
     }); 
   }); 
 } 
  //função inicial 
 function initialize() { 
   addListenerHitBox(); 
 } 
  
 initialize();
