export { terrainCollision, drawCapsule, checkCollision }

/**
 * Teste si un objet est oui ou non à l'interieur de la boite de collision
 * 
 * @param {*} x : position x de l'objet dont on veut tester la collision 
 * @param {*} y : position y de l'objet dont on veut tester la collision 
 * @param {*} cx : position x du centre de la boite de collision
 * @param {*} cy : position y du centre de la boite de collision
 * @param {*} width : largeur de la boite de collision 
 * @param {*} height : hauteur de la boite de collision
 * @returns true si l'objet est dans la boite de collision, false sinon
 */
function terrainCollision(x, y, cx, cy, width, height) {
  const r = height / 2;

  // rectangle central horizontal
  const left = cx - width/2 + r;
  const right = cx + width/2 - r;

  if (x >= left && x <= right) {
    return Math.abs(y - cy) <= r;
  }

  // demi-cercles gauche/droite
  const circleX = x < left ? left : right;

  const dx = x - circleX;
  const dy = y - cy;

  return dx*dx + dy*dy <= r*r;
}

/**
 * Fonction de debug qui permet d'afficher la boite de collision
 * 
 * @param {*} ctx : Context du canvas
 * @param {*} cx : position x du centre de la boite de collision
 * @param {*} cy : position y du centre de la boite de collision
 * @param {*} w : largeur de la boite de collision 
 * @param {*} h : hauteur de la boite de collision 
 */
function drawCapsule(ctx, cx, cy, w, h) {
  const r = h / 2;

  ctx.save()

  ctx.beginPath();

  ctx.moveTo(cx - w/2 + r, cy - r);

  ctx.lineTo(cx + w/2 - r, cy - r);
  ctx.arc(cx + w/2 - r, cy, r, -Math.PI/2, Math.PI/2);

  ctx.lineTo(cx - w/2 + r, cy + r);
  ctx.arc(cx - w/2 + r, cy, r, Math.PI/2, -Math.PI/2);

  ctx.stroke();

  ctx.restore();
}

/**
 * Teste si 2 objets a et b sont en collisions
 * 
 * @param {*} a : un objet ayant des coordonées x et y
 * @param {*} b : un objet ayant des coordonées x et y
 * @returns true si les 2 objets sont en collisions, false sinon
 */
function checkCollision(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const distance = Math.hypot(dx, dy);

  return distance < a.radius + b.radius;
}