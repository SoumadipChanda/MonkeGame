var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle1, obstacleImage;
var bananaGroup, obstacleGroup;
var score,score1;

function preload(){
  
  
  monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400);
  
  monkey = createSprite(60,330,40,40)
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(300,360,600,10);
  invisibleGround = createSprite(300,360,600,5);
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = true
  
  
  score = 0;
  score1 = 0;
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
}


function draw() {
  background("lightGreen");
  stroke("black");
  text("SurvivalTime: "+ score, 500,50);
  text("score: "+ score1, 50,50);
  if (gameState === PLAY){
    score = score + Math.round(getFrameRate()/60);
    monkey.velocityY=monkey.velocityY+0.5 ;
    if(keyDown("space")&& monkey.y >=300){
        monkey.velocityY = -12;
        
    }
    if (obstacleGroup.isTouching(monkey)){
      gameState = END;
    }
    if (bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
      score1 = score1 +1;
    }
  }
  else if (gameState === END){
    
    monkey.velocityY = 0;
    
    
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);   
  }
  
  monkey.collide(invisibleGround);
  Obstacle();
  Banana();
  drawSprites();
}
function Obstacle(){
  if (frameCount % 300 === 0) {
    obstacle = createSprite(600,340,80,80);
    obstacle.addImage(obstacleImage)
    
    obstacle.scale = 0.1;
    obstacle.velocityX = -3;
    
    
     
    obstacle.lifetime = 200;
    
   obstacleGroup.add(obstacle);
    
    
  }
} 
function Banana(){
  if (frameCount % 100 === 0) {
    banana = createSprite(600,120,40,10);
    banana.y = 200;
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     
    banana.lifetime = 200;
    
   
    bananaGroup.add(banana);
    
  }
}





