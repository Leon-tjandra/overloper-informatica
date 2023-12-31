class Raster {
  constructor(r,k) {
    this.aantalRijen = r;
    this.aantalKolommen = k;
    this.celGrootte = null;
  }
  
  berekenCelGrootte() {
    this.celGrootte = canvas.width / this.aantalKolommen;
  }
  
  teken() {
    push();
    noFill();
    stroke('grey');
    for (var rij = 0;rij < this.aantalRijen;rij++) {
      for (var kolom = 0;kolom < this.aantalKolommen;kolom++) {
    if (rij == 3 || kolom == 7) {
     fill('orange');
     stroke('orange');
    }
    else {
      noFill();
      stroke('grey')
    }
        rect(kolom*this.celGrootte,rij*this.celGrootte,this.celGrootte,this.celGrootte);
      }
    }
    pop();
  }
}
class Bom {
  constructor() {
    this.x = floor(random(1,raster.aantalKolommen))*raster.celGrootte;
    this.y = floor(random(0,raster.aantalRijen))*raster.celGrootte;
    this.sprite = null;
    this.stapGrootte = 1*raster.celGrootte;
  }
  beweeg() {
    this.y += floor(random(-1, 1)) * this.stapGrootte;
    this.y = constrain(this.y, 0, canvas.height - raster.celGrootte);
    if (this.y >= canvas.height-50 || this.y < 10) {
        this.stapGrootte *= -1;
    }
  
  }


  toon() {
    image(bomPlaatje,this.x,this.y,raster.celGrootte,raster.celGrootte);
  }
}

class Appel {
  constructor(x,y){
    this.x = floor(random(0,raster.aantalRijen))*raster.celGrootte;
    this.y = floor(random(0,raster.aantalRijen))*raster.celGrootte;
    this.sprite = apple;
  }

   toon() {     image(apple,this.x,this.y,raster.celGrootte,raster.celGrootte);
   }
}


class Jos {
  constructor() {
    this.x = 0;
    this.y = 300;
    this.animatie = [];
    this.frameNummer = 3;
    this.stapGrootte = null;
    this.gehaald = false;
    this.StaOpbom = false;
    this.geraaktebom=null;
  }
  beweeg() {
    if (keyIsDown(65)) {
      this.x -= this.stapGrootte;
      this.frameNummer = 2;
    }
    if (keyIsDown(68)) {
      this.x += this.stapGrootte;
      this.frameNummer = 1;
    }
    if (keyIsDown(87)) {
      this.y -= this.stapGrootte;
      this.frameNummer = 4;
    }
    if (keyIsDown(83)) {
      this.y += this.stapGrootte;
      this.frameNummer = 5;
    }
    this.x = constrain(this.x, 0, canvas.width);
    this.y = constrain(this.y, 0, canvas.height - raster.celGrootte);
    if (this.x == canvas.width) {
      this.gehaald = true;
    }
  }
  wordtGeraakt(vijand) {
    if (this.x == vijand.x && this.y == vijand.y) {
      return true;
    } else {
      return false;
    }
  }
  wordtGeraakt(Appel) {
    if (this.x == Appel.x && this.y == Appel.y) {
      return true;
    }
    else {
      return false;
    }
  }
  toon() {
    image(this.animatie[this.frameNummer], this.x, this.y, raster.celGrootte, raster.celGrootte);
  }
  staatOp(bommenArray) {
    for (var b = 0;b < bommenArray.length;b++) {
      if (bommenArray[b].x == this.x && bommenArray[b].y == this.y) {
        this.StaOpbom = true;
        this.geraaktebom = b;
      }
  }
    return this.StaOpbom;
    return this.geraaktebom;
  }  
  
  toon() {
image(this.animatie[this.frameNummer],this.x,this.y,this.stapGrootte,this.stapGrootte);
  }
}
class Vijand {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = null;
    this.stapGrootte = null;
  }
  beweeg() {
    this.x += floor(random(-1, 2)) * this.stapGrootte;
    this.y += floor(random(-1, 2)) * this.stapGrootte;
    this.x = constrain(this.x, 0, canvas.width - raster.celGrootte);
    this.y = constrain(this.y, 0, canvas.height - raster.celGrootte);
  }
  toon() {
    image(this.sprite, this.x, this.y, raster.celGrootte, raster.celGrootte);
  }
}
  


function preload() {
  brug = loadImage("images/backgrounds/dame_op_brug_1800.jpg");
  bomPlaatje = loadImage("images/sprites/bom_100px.png");
  apple = loadImage("images/sprites/appel_1.png");
}

var bommenArray = [];
var aantallevens = 3

function setup() {
  canvas = createCanvas(900,550);
  canvas.parent();
  frameRate(10);
  textFont("Verdana");
  textSize(20);
  
  raster = new Raster(12,18);
  raster.berekenCelGrootte();

  for (var b = 0;b < 5;b++) {
  bommenArray.push(new Bom());
  }

  appel = new Appel();
  
  eve = new Jos();
  eve.stapGrootte = 1*raster.celGrootte;
  for (var b = 0;b < 6;b++) {
    frameEve = loadImage("images/sprites/Eve100px/Eve_" + b + ".png");
    eve.animatie.push(frameEve);
  }

  alice = new Vijand(700,200);
  alice.stapGrootte = 1*eve.stapGrootte;
  alice.sprite = loadImage("images/sprites/Alice100px/Alice.png");

  bob = new Vijand(600,400);
  bob.stapGrootte = 1*eve.stapGrootte;
  bob.sprite = loadImage("images/sprites/Bob100px/Bob.png");
}

  

function draw() {
  background(brug);
  for (var b = 0;b < bommenArray.length;b++) {
    bommenArray[b].toon();
  }
  for (var b = 0;b < bommenArray.length;b++) {
    bommenArray[b].beweeg();
  }

  if (eve.aanDeBeurt) {
    eve.beweeg();
  }
  else {
    alice.beweeg();
    bob.beweeg();
    eve.aanDeBeurt = true;
  }

  if (alice.x == bob.x && alice == bob.y) {
    bob.beweeg();
  }
  raster.teken();
  eve.toon();
  alice.toon();
  bob.toon();
  appel.toon();
  eve.beweeg();
  alice.beweeg();
  bob.beweeg();
  
  if (eve.wordtGeraakt(alice) || eve.wordtGeraakt(bob)) {
      aantallevens--;
    }
  if (eve.staatOp(bommenArray)) {
    eve.StaOpbom = false;
    aantallevens--;
    bommenArray.splice(eve.geraaktebom, 1)
  }

  if (eve.wordtGeraakt(appel)) {
    aantallevens++;
    appel.x = 1000;
  }
  if(aantallevens > 0){
  text("Aantal Levens = " + round(aantallevens), eve.x,20 );
  }
  
  if (aantallevens==0){
    background('red');
  fill('white');
  textSize(50);
  text("Goed geprobeerd!",225,300);
  noLoop();
  }
  if (eve.gehaald) {
    background('green');
    fill('white');
    textSize(50);
    text("Goed gedaan!",225,300);
    noLoop();
  }
  
}