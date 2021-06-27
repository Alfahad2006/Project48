var PLAY = 1;
var END = 0;
var gameState = PLAY;

var backgroundImg,obstacleImg,particleImg,playerImg;
var player,obstacle,particle;

var score=0;

var gameOver, restart;

var particlesGroup,obstaclesGroup;

localStorage["HighestScore"] = 0;


function preload(){
  
  obstacleImg = loadImage("images/Obstacle.png");
  playerImg = loadImage("images/Player.png");
  backgroundImg = loadImage("images/Background.png");
  particleImg = loadImage("images/Particle.png");

}

function setup() {
  createCanvas(600, 400);

 
  
  player = createSprite(150,180,20,50);
  player.addImage(playerImg);
  player.scale = 0.1;

  particlesGroup = new Group();
  obstaclesGroup = new Group();


  
 
  
  
}

function draw() {
    background(backgroundImg);
    text("Score: "+ score, 500,50);

    if (gameState===PLAY){
      score = score + Math.round(getFrameRate()/30);
    
      if(keyDown(UP_ARROW)) {
        player.y = player.y-10;
      }
      if(keyDown(DOWN_ARROW)) {
        player.y = player.y+10;
      }

      spawnObstacles();
      spawnPartiles();
    
      if(obstaclesGroup.isTouching(player)){
          gameState = END;
      }

      if (background.x < 0){
        background.x = background.width/2;
      }
    }
    else if (gameState === END) {

       //set velcity of each game object to 0
      player.velocityY = 0;
      obstaclesGroup.setVelocityXEach(0);
      particlesGroup.setVelocityXEach(0);
      
      //set lifetime of the game objects so that they are never destroyed
      obstaclesGroup.setLifetimeEach(-1);
      particlesGroup.setLifetimeEach(-1);

      textSize(40);
      text("Game Over",200,200);
      textSize(12)
      text("Press Space To Restart",240,220);
      textSize(12)
      text("Wear a mask when going outside",260,240);
      textSize(12)
      text("Maintain social distancing",270,270);
      textSize(12)
      text("Use Sanitizer",280,300);
      textSize(15)
      text("At last Stay Safe",300,330);
      
      if(keyDown("space")) {
        reset();
      }
    }
  drawSprites();
}

function spawnPartiles() {
  if (frameCount % 40 === 0) {
    var particle = createSprite(600,120,10,10);
    particle.y = Math.round(random(80,520));
    particle.addImage(particleImg);
    particle.scale = 0.01;
    particle.velocityX = -3;

    particle.lifetime = 300;

    particlesGroup.add(particle);

   
  } 
}

function spawnObstacles() {
  if (frameCount % 100 === 0) {
    var obstacle = createSprite(600,120,40,10);
    obstacle.y = Math.round(random(80,420));
    obstacle.addImage(obstacleImg);
    obstacle.scale = 0.15;
    obstacle.velocityX = -3;

    obstacle.lifetime = 300;

    obstaclesGroup.add(obstacle);

   obstacle.setCollider("circle",60,0,40);

  } 
}

function reset(){
  gameState = PLAY;
  
  obstaclesGroup.destroyEach();
  particlesGroup.destroyEach();
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
}

