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
function setup() 
{
  createCanvas(500,500);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,490,600,20);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  rope = new Rope(10, {x:245, y:10});
  fruit = Bodies.circle(300,300,20);
  Composite.add(rope.body, fruit);
  fruitcon = new Link(rope, fruit)
}

function draw() 
{
  background(51);
  ground.show();
  rope.show();
  ellipse(fruit.position.x, fruit.position.y, 20, 20);
  
  
  Engine.update(engine);
   
}
