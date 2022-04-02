const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var rope, rope2, rope3;
var fruit;
var fruitcon, fruitcon2, fruitcon3;
var backgroundImage, melonImage, rabbitImage;
var rabbit;
var button, button2, button3, buttonmute;
var sadbunny, eatingbunny, idlebunny;
var eatingbunnysound, ropecut, sadbunnysound, backgroundsound, balloonsound;
var balloon;
var canW, canH;
function preload(){
  backgroundImage = loadImage("./images/background.png");
  melonImage = loadImage("./images/melon.png");
  rabbitImage = loadImage("./images/Rabbit-01.png");
  sadbunny = loadAnimation("./images/sad_1.png","./images/sad_2.png","./images/sad_3.png");
  eatingbunny = loadAnimation("./images/eat_0.png","./images/eat_1.png","./images/eat_2.png","./images/eat_3.png","./images/eat_4.png");
  idlebunny = loadAnimation("./images/blink_1.png", "./images/blink_2.png", "./images/blink_3.png");
  eatingbunnysound = loadSound("./sound/eating_sound.mp3");
  ropecut = loadSound("./sound/rope_cut.mp3");
  backgroundsound = loadSound("./sound/sound1.mp3");
  sadbunnysound = loadSound("./sound/sad.wav");
  balloonsound = loadSound("./sound/air.wav");
  sadbunny.playing = true;
  sadbunny.frameDelay = 10;
  sadbunny.looping = false;
  eatingbunny.playing = true;
  eatingbunny.looping = false;
  eatingbunny.frameDelay = 10;
  idlebunny.playing = true;
  idlebunny.frameDelay = 10;
  
}

function setup() 
{
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW = displayWidth;
    canH = displayHeight;
    createCanvas(canW,canH);
  }else{
    canW = 500;
    canH = 800;
    createCanvas(canW,canH);
  }
  
  backgroundsound.play();
  backgroundsound.setVolume(0.2);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(canW / 2,canH - 10,canW,20);

  rabbit = createSprite(canW - 100,canH - 90,20,60);
  rabbit.addAnimation("bunnyparado", idlebunny);
  rabbit.addAnimation("sad", sadbunny);
  rabbit.addAnimation("eating", eatingbunny);
  
  rabbit.scale = 0.25

  rectMode(CENTER);
  ellipseMode(RADIUS);

  textSize(50)
  rope = new Rope(8, {x:40, y:30});
  fruit = Bodies.circle(300,300,20);
  Composite.add(rope.body, fruit);
  fruitcon = new Link(rope, fruit);

  rope2 = new Rope(7, {x:canW - 130, y:40});
  fruitcon2 = new Link(rope2, fruit);

  rope3 = new Rope(4, {x:canW - 100, y:225});
  fruitcon3 = new Link(rope3, fruit);

  //button
  button = createImg("./images/cut_btn.png");
  button.position(20,10);
  button.size(50,50);
  button.mouseClicked(drop);

  button2 = createImg("./images/cut_btn.png");
  button2.position(canW - 150,30);
  button2.size(50,50);
  button2.mouseClicked(drop2);
  
  button3 = createImg("./images/cut_btn.png");
  button3.position(canW - 120,200);
  button3.size(50,50);
  button3.mouseClicked(drop3);

  
  buttonmute = createImg("./images/mute.png");
  buttonmute.position(canW - 50,5);
  buttonmute.size(50,50);
  buttonmute.mouseClicked(mute);

  /*balloon = createImg("./images/balloon.png");
  balloon.position(10,290);
  balloon.size(150,100);
  balloon.mouseClicked(ballonforce);*/
}

function draw() 
{
  background(51);
  image(backgroundImage, 0, 0, width, height);
  ground.show();
  rope.show();
  rope2.show();
  rope3.show();
  if(fruit != null){
    push();
    imageMode(CENTER);
    image(melonImage ,fruit.position.x, fruit.position.y, 85, 85);
    pop();
  }

  
  Engine.update(engine);
  drawSprites();
  if(collide(fruit, rabbit)){
    rabbit.changeAnimation("eating");
    eatingbunnysound.play();
  }
  
  if(fruit) {
    if(fruit.position.y > canH - 40){
      rabbit.changeAnimation("sad");
      sadbunnysound.play();
      World.remove(world, fruit);
      fruit = null;
    }
  }
  
}

function drop () {
  rope.break();
  fruitcon.detach();
}
function drop2 () {
  rope2.break();
  fruitcon2.detach();
}
function drop3 () {
  rope3.break();
  fruitcon3.detach();
}

function collide(bodyA, bodyB) {
  if(bodyA != null && bodyB != null) {
    var diff = dist(bodyA.position.x,bodyA.position.y, bodyB.position.x, bodyB.position.y);
    if(diff < 80) {
      World.remove(world, fruit);
      fruit = null;
      return true;
    } else {
      return false;
    }
  }
}

function mute() {
  if(backgroundsound.isPlaying()){
    backgroundsound.stop();
  }else{
    backgroundsound.play();
  }
}

function ballonforce() {
  Body.applyForce(fruit, {x:0, y:0}, {x:0.01, y:0})
}