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
var button;

function preload(){
  backgroundImage = loadImage("./images/background.png");
  melonImage = loadImage("./images/melon.png");
  rabbitImage = loadImage("./images/Rabbit-01.png");
}

function setup() 
{
  createCanvas(500,800);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,790,600,20);

  rabbit = createSprite(250,730,20,60);
  rabbit.addImage(rabbitImage);
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
}

function draw() 
{
  background(51);
  image(backgroundImage, 0, 0, width, height);
  ground.show();
  rope.show();
  push();
  imageMode(CENTER);
  image(melonImage ,fruit.position.x, fruit.position.y, 85, 85);
  pop();
  
  Engine.update(engine);
  drawSprites();
   
}

function drop () {
  rope.break();
  fruitcon.detach();
}