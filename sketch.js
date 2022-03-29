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
var rope;
var fruit;
var fruitcon;
var backgroundImage, melonImage, rabbitImage;
var rabbit;
var button, buttonmute;
var sadbunny, eatingbunny, idlebunny;
var eatingbunnysound, ropecut, sadbunnysound, backgroundsound, balloonsound;
var balloon;

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
  createCanvas(500,800);
  backgroundsound.play();
  backgroundsound.setVolume(0.2);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,790,600,20);

  rabbit = createSprite(400,710,20,60);
  rabbit.addAnimation("bunnyparado", idlebunny);
  rabbit.addAnimation("sad", sadbunny);
  rabbit.addAnimation("eating", eatingbunny);
  
  rabbit.scale = 0.25

  rectMode(CENTER);
  ellipseMode(RADIUS);

  textSize(50)
  rope = new Rope(10, {x:245, y:10});
  fruit = Bodies.circle(300,300,20);
  Composite.add(rope.body, fruit);
  fruitcon = new Link(rope, fruit);

  //button
  button = createImg("./images/cut_btn.png");
  button.position(220,5);
  button.size(50,50);
  button.mouseClicked(drop);
  
  buttonmute = createImg("./images/mute.png");
  buttonmute.position(450,5);
  buttonmute.size(50,50);
  buttonmute.mouseClicked(mute);

  balloon = createImg("./images/balloon.png");
  balloon.position(10,290);
  balloon.size(150,100);
  balloon.mouseClicked(ballonforce);
}

function draw() 
{
  background(51);
  image(backgroundImage, 0, 0, width, height);
  ground.show();
  rope.show();
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
    if(fruit.position.y > 760){
      rabbit.changeAnimation("sad");
      sadbunnysound.play();
    }
  }
  
}

function drop () {
  rope.break();
  fruitcon.detach();
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