//Criar o canvas 
const canvas = document.createElement("canvas"); //pode criar qualquer elemeno, div, p, etc.
const ctx = canvas.getContext("2d");

canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas); 

//add imagem de fundo
let bgReady = false; //bg -> backgroud
const bgImage = new Image();
//quando carregar a imagem de fundo
bgImage.onload = function(){
	bgReady = true; 
};
bgImage.src = "images/arena.png";

//add imagem do heroi
let heroReady = false; 
const heroImage = new Image(); 
heroImage.onload = function (){
	heroReady = true;
};
heroImage.src = "images/mario.png";

//add imagem do monstro
let monsterReady = false; 
const monsterImage = new Image(); 
monsterImage.onload = function (){
	monsterReady = true;
};
monsterImage.src = "images/star.png";

//criando objetos
const hero = {
	speed: 200 //px/s
};
const monster = {};
let monstersCaught = 0; //cont monstros pegos

//controle teclado 
const keysDown = {}; 

//qualquer tecla pressionada dispara evento
window.addEventListener("keydown", function (e) {
	console.log(e);
	keysDown[e.keyCode] = true;
}, false);

window.addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

//reset game quando jogador pega o monstro

const reset = function(){
	hero.x = canvas.width / 2 ; 
	hero.y = canvas.height / 2 ; //posicionamento hero
	//posiciona monstro randomicamente na tela 
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};

//atualiza objetos do jogo
const update = function (modfier){
	if(38 in keysDown){ //seta pra cima(Pressionar)
		hero.y -= hero.speed * modfier;
	}
	if(40 in keysDown){ //seta para baixo
		hero.y += hero.speed * modfier;
	}
	if(37 in keysDown){ //seta para esquerda
		hero.x -= hero.speed * modfier; 
	}
	if(39 in keysDown){ //seta para direita
		hero.x += hero.speed * modfier; 
	}
	//tamanho dos personagens = 32x32
	// Os pesonagens se enconstam ?
	if (
	hero.x <= (monster.x + 32) && 
	monster.x <= (hero.x + 32) &&
	hero.y <= (monster.y + 32) && 
	monster.y <= (hero.y + 32)
	) {
	++monstersCaught;
	reset(); 
	}
};

//renderizar tudo

const render = function(){
	if(bgReady){
		ctx.drawImage(bgImage, 0, 0); 
	}
	if(heroReady){
		ctx.drawImage(heroImage, hero.x, hero.y);
	}
	if (monsterReady){
    ctx.drawImage(monsterImage, monster.x, monster.y);
  	}

	//pontuação
	ctx.fillStyle = 'rgb(250, 250, 250)'
	ctx.font = '24px Helvetica';
	ctx.textAlign = 'left';
	ctx.tectBaseline = 'top'; 
	ctx.fillText("Monstros pegos: " + monstersCaught, 32, 32);
};

//constrole o loop do jogo
const main = function(){
	const now = Date.now();
	const delta = now - then; //cria valor para vel baseado em msegundos

	update(delta/1000);

	render(); 

	then = now; 

	//loop da função main a cada frame
	requestAnimationFrame(main);
};

//suporte do request para varios browsers
const w = window; 
const requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

//inicio do jogo
let then = Date.now(); 
reset();
main();