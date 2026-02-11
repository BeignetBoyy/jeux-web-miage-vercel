import { terrainCollision } from "./utils.js";
import Particule from "./particule.js";

export default class Kart {
    constructor(x, y, color, canvasHauteur, canvasLargeur, angle, assets, controls) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.controls = controls;
        this.canvasHauteur = canvasHauteur
        this.canvasLargeur = canvasLargeur
        this.angle = angle;
        this.speed = 0;

        this.maxSpeed = 4;
        this.accel = 0.2;
        this.friction = 0.05;
        this.turnSpeed = 0.08;
        this.radius = 15;

        this.assets = assets;
        this.sprite = assets[this.color + "Kart"]
        this.engineSound = assets[this.color + "Engine"];
        this.engineSound.loop = true;
        this.explosionSound = assets.explosion;

        this.trails = []
    }

    update(keys) {

        // Accélération / frein
        if (keys[this.controls.up]) this.speed += this.accel;
        if (keys[this.controls.down]) this.speed -= this.accel;

        // Clamp vitesse
        this.speed = Math.max(
            -this.maxSpeed / 2,
            Math.min(this.speed, this.maxSpeed)
        );

        // Rotation dépendante de la vitesse
        if (Math.abs(this.speed) > 0.2) {

            const speedRatio = Math.abs(this.speed) / this.maxSpeed;
            if (!this.engineSound.playing()) {
                this.engineId = this.engineSound.play();
            }

            this.engineSound.volume(speedRatio * 0.8, this.engineId);
            this.engineSound.rate(0.8 + speedRatio, this.engineId);


            if (keys[this.controls.left]) this.angle -= this.turnSpeed * (this.speed / this.maxSpeed);
            if (keys[this.controls.right]) this.angle += this.turnSpeed * (this.speed / this.maxSpeed);
        }else {
            this.engineSound.stop(this.engineId);
        }


        // Calcul du mouvement du kart
        const newX = this.x + Math.cos(this.angle) * this.speed;;
        const newY = this.y + Math.sin(this.angle) * this.speed;;

        // Calcul des collisions entre le terrain et le kart
        if (terrainCollision(newX, newY, 450, 300, 900, 590)) { //Ici la hauteur du canvas devrait etre 600 mais on la met a 590 pour eviter que les karts sortent du canvas
            
            if(this.speed > 0.5){
                this.trails.push(new Particule(this.x, this.y));
            }
            
            // Si on a l'interieur du terrain on applique la nouvelle position
            this.x = newX;
            this.y = newY;

        } else {
            // Sinon on fait rebondir et on joue le bruitage
            if(this.speed > 0.4){
                if(!this.explosionSound.playing()) this.explosionSound.play();
            }

            this.speed *= -0.3;
        }

        // On applique la friction
        this.speed *= (1 - this.friction);

        /* Inutile utilisé pour terrain rectangulaire
        // Bords de l'écran
        this.x = Math.max(0, Math.min(this.canvasLargeur, this.x));
        this.y = Math.max(0, Math.min(this.canvasHauteur, this.y));*/
    }
    
    draw(ctx) {
        const size = 16;
        const dir = this.getDirectionIndex();

        ctx.save();

        ctx.translate(this.x, this.y);

        ctx.imageSmoothingEnabled = false; // pixel art net

        ctx.drawImage(
            this.sprite,
            dir * size, 0,   // source x, y
            size, size,
            -size, -size,
            size * 2.5,
            size * 2.5
        );

        ctx.restore();
    }


    getDirectionIndex() {
        const directions = 8;
        const slice = (Math.PI * 2) / directions;

        let index = Math.round((this.angle + Math.PI/2) / slice);

        index = ((index % directions) + directions) % directions;

        return index;
    }

    /**
     * Logique de collision entre un kart et l'autre
     * 
     * @param {Kart} otherKart : le kart avec lequel on veut tester la collision
     * @returns 
     */
    resolveCollision(otherKart) {
        const dx = this.x - otherKart.x;
        const dy = this.y - otherKart.y;
        const distance = Math.hypot(dx, dy);

        if (distance === 0) return;

        const overlap = (this.radius + otherKart.radius) - distance;

        const nx = dx / distance;
        const ny = dy / distance;

        // Séparation
        this.x += nx * overlap / 2;
        this.y += ny * overlap / 2;
        otherKart.x -= nx * overlap / 2;
        otherKart.y -= ny * overlap / 2;

        // Échange de vitesse
        const tempSpeed = this.speed;
        this.speed = otherKart.speed * 0.8;
        otherKart.speed = tempSpeed * 0.8;

        if(this.speed > 0.4){
            if(!this.explosionSound.playing()) this.explosionSound.play();
        }

        if(otherKart.speed > 0.4){
            if(!otherKart.explosionSound.playing()) otherKart.explosionSound.play();
        }
    }
}