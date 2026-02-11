import Kart from "./kart.js";
import Coin from "./coin.js";
import { loadAssets } from "./assets.js";
import { drawCapsule, checkCollision } from "./utils.js";


window.onload = init;

const keys = {};
let canvas, 
    ctx, 
    canvasLargeur, 
    canvasHauteur, 
    redScore, 
    blueScore, 
    winner,
    redScoreDisplay,
    blueScoreDisplay,
    startGameDiv,
    redKart, 
    blueKart, 
    coin,
    lastTime,
    gameOverPopup,
    replayButton,
    bgMusic,
    winSoundEffect;

function init(){
    console.log("OK")

    loadAssets((assetsLoaded) => {

        bgMusic = assetsLoaded.bgMusic;
        winSoundEffect = assetsLoaded.win;

        canvas = document.getElementById("game");
        canvasLargeur = canvas.width;
        canvasHauteur = canvas.height;
        ctx = canvas.getContext("2d");
        lastTime = 0;
        redScore = 0;
        blueScore = 0;

        redScoreDisplay = document.getElementById("red-score");
        blueScoreDisplay = document.getElementById("blue-score");
        gameOverPopup = document.getElementById("game-over");
        replayButton = document.getElementById("replay");


        window.addEventListener("keydown", e => keys[e.key] = true);
        window.addEventListener("keyup", e => keys[e.key] = false); 

        startGameDiv = document.getElementById("start");

        redKart = new Kart(200, 300, "red", canvasHauteur, canvasLargeur, 0, assetsLoaded, {
            up: "z",
            down: "s",
            left: "q",
            right: "d"
        });

        blueKart = new Kart(600, 300, "blue", canvasHauteur, canvasLargeur, Math.PI, assetsLoaded, {
            up: "ArrowUp",
            down: "ArrowDown",
            left: "ArrowLeft",
            right: "ArrowRight"
        });

        coin = new Coin(canvasLargeur, canvasHauteur, assetsLoaded);
        window.addEventListener("click", startGame, { once: true });
        replayButton.addEventListener("click", restartGame);
    });
}

function startGame() {
    startGameDiv.style.display = "none"
    unlockAudio();
    bgMusic.play();
    coin.respawn();
    requestAnimationFrame(loop);
}

function loop(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const dt = (time - lastTime) / 1000;
    lastTime = time;

    coin.update(dt);
    redKart.update(keys);
    blueKart.update(keys);

    for (let i = redKart.trails.length - 1; i >= 0; i--) {
        redKart.trails[i].update(dt);

        if (redKart.trails[i].life <= 0) {
            redKart.trails.splice(i, 1);
        }
    }

    for (let i = blueKart.trails.length - 1; i >= 0; i--) {
        blueKart.trails[i].update(dt);

        if (blueKart.trails[i].life <= 0) {
            blueKart.trails.splice(i, 1);
        }
    }

    // Verification collision entre les 2 karts
    if (checkCollision(redKart, blueKart)) {
        redKart.resolveCollision(blueKart);
    }

    // Verification collision & logique de recuperation de la piece
    if(coin.state === "DEFAULT"){
        if (checkCollision(redKart, coin)) {
            coin.collect()
            redScore++;
            redScoreDisplay.textContent = redScore;
        }

        if (checkCollision(blueKart, coin)) {
            coin.collect()
            blueScore++;
            blueScoreDisplay.textContent = blueScore;
        }
    }

    //drawCapsule(ctx, 450, 300, 900, 580)
    blueKart.trails.forEach(t => t.draw(ctx));
    redKart.trails.forEach(t => t.draw(ctx));
    coin.drawShadow(ctx);
    redKart.draw(ctx);
    blueKart.draw(ctx);
    coin.draw(ctx);

    
    if(redScore == 10 || blueScore == 10) {
        winner = redScore == 10 ? 'Rouge' : 'Bleu';
        finishGame();
    }else{
        requestAnimationFrame(loop);
    }
}

function finishGame(){
    //ctx.clearRect(0, 0, canvas.width, canvas.height);

    gameOverPopup.style.display = "flex";

    const endRedScore = document.getElementById("red-end-score");
    endRedScore.textContent = redScore;
    const endBlueScore = document.getElementById("blue-end-score");
    endBlueScore.textContent = blueScore;

    const winnerSpan = document.getElementById("winner");
    winnerSpan.textContent = winner;

    Howler.stop();
    winSoundEffect.play()
}

function restartGame(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    redKart.x = 200;
    redKart.y = 300;
    redKart.angle = 0;
    redKart.speed = 0;

    blueKart.x = 600;
    blueKart.y = 300;
    blueKart.angle = Math.PI;
    blueKart.speed = 0;

    redScore = 0;
    blueScore = 0;
    redScoreDisplay.textContent = redScore;
    blueScoreDisplay.textContent = blueScore;

    gameOverPopup.style.display = "none";

    startGame()
}

function unlockAudio() {
  Howler.ctx.resume();
}