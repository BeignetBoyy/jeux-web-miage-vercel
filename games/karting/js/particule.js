export default class Particule {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.life = 1; // 1 → 0
        this.size = 4 + Math.random() * 3;
    }

    update(dt) {
        this.life -= dt/10; // vitesse disparition
    }

    draw(ctx) {

        ctx.save();

        ctx.globalAlpha = this.life;

        ctx.fillStyle = "#775235"; // couleur terre
        ctx.beginPath();
        
        // On dessine 2 rectangles legerement offset pour que ça fasse une trainée par roue
        ctx.fillRect(
            this.x - this.size,
            this.y - this.size,
            this.size,
            this.size
        );

        ctx.fillRect(
            this.x + this.size,
            this.y + this.size,
            this.size,
            this.size
        );

        ctx.fill();

        ctx.globalAlpha = 1;

        ctx.restore();
    }
}