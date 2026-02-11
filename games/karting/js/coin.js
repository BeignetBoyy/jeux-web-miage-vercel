import { terrainCollision } from "./utils.js";

export default class Coin {
    constructor(width, height, assets) {
        this.radius = 10;
        this.width = width;
        this.height = height;

        this.assets = assets;
        this.sprite = assets.coin;
        this.coinPickupSound = assets.coinPickup;
        this.coinSpawnSound =  assets.coinSpawn;

        this.frame = 0;
        this.frameCount = 6;
        this.animSpeed = 1;

        this.state = "DEFAULT"; // 3 etats possibles DEFAULT -> DISSOLVING -> HIDDEN
    }

    respawn() {
        // On evite que la piece apparaissent en dehors du terrain
        do {
            this.x = Math.random() * this.width;
            this.y = Math.random() * this.height;
        } while (!terrainCollision(this.x, this.y, 450, 300, 850, 550)); // On soustrait 50 a la largeur/hauteur de la collision pour la piece pour eviter qu'elle apparaissent trop proche des bords du terrain

        this.state = "DEFAULT";
        this.frame = 0;
        this.coinSpawnSound.play();
    }

    draw(ctx) {

        if (this.state === "HIDDEN") return;

        ctx.save();

        ctx.imageSmoothingEnabled = false; // pixel art net

        this.frame = Math.floor(Date.now() / 120) % 6;

        let currentSprite;
        if(this.state === "DEFAULT") currentSprite = this.assets.coin;
        if(this.state === "DISSOLVING") currentSprite = this.assets.coinDissolve;

        ctx.drawImage(
            currentSprite,
            this.frame * 16,
            0,
            16,
            32,
            this.x - 16,
            this.y - 16,
            16 * 2.5,
            32 * 2.5
        );

        ctx.restore();
    }

    drawShadow(ctx){
        if(this.state === "DEFAULT"){
            ctx.save()

            ctx.globalAlpha = 0.5
            ctx.fillStyle = "#000000"; // couleur terre

            // utilisation des transformations geometriques
            ctx.translate(this.x + 4, this.y + 36)
            ctx.beginPath();
            
            // On dessine 2 rectangles legerement offset pour que ça fasse une trainée par roue
            ctx.ellipse(0, 0, 10, 4, 0, 0, Math.PI * 2);

            ctx.fill();

            ctx.globalAlpha = 1;

            ctx.restore()
        }
    }

    collect() {
        if (this.state !== "DEFAULT") return;

        this.state = "DISSOLVING";
        this.frame = 0;
        this.coinPickupSound.play();
    }

    update(dt) {
        if (this.state === "DISSOLVING") {
            this.frame += this.animSpeed;

            if (this.frame >= this.frameCount) {
                this.state = "HIDDEN";
                this.timer = 0;
            }
        }

        if (this.state === "HIDDEN") {
            this.timer += dt;

            if (this.timer > 1) { // 1 seconde
                this.respawn();
            }
        }
    }

}
