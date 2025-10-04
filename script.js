//Move the catcher with the left and right arrow keys to catch the falling objects. 

/* VARIABLES */
let catcher, fallingObject;
let score = 0; 
let screen = 0;
let catcherImg;
let fallingObjectImg;

/* PRELOAD LOADS FILES */
function preload(){
  catcherImg = loadImage("assets/cat.webp");
  fallingObjectImg = loadImage("assets/catnip.PNG");
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400,400);

  //resizing
  catcherImg.resize(120,120);
  fallingObjectImg.resize(50,50);
  
  //Create catcher 
  catcher = new Sprite(catcherImg, 200,380,100,20, 'k');
  catcher.color = color(95,158,160);
  
  //Create falling object.. the catnip 
  fallingObject = new Sprite(fallingObjectImg, 100,0,10);
  fallingObject.color = color(0,128,128);
  fallingObject.vel.y = 2;

}

/* DRAW LOOP REPEATS */
function draw() {
  background(245, 245, 220);
  // Draw directions to screen
  fill('#442e19');
  textSize(12);
  text("Move the kitty \n with the left and\n right arrow keys\n to catch the\n delicious catnip!\n Score 10 to win.", width-100, 20);

  //if fallingObject reaches bottom, move back to random position at top. 
  if (fallingObject.y >= 400) {
    fallingObject.y = 0;
    fallingObject.x = random(width);
    fallingObject.vel.y = random(1, 5);
    score = score - 1;
  }

  //moves catcher left to right 
  if (kb.pressing('left')) {
    catcher.vel.x = -3;
  }else if (kb.pressing('right')) {
    catcher.vel.x = 3; 
  } else {
    catcher.vel.x = 0;
  }
  
  // stop catcher at edges of screen
  if (catcher.x < 50) {
    catcher.x = 50;
  }else if (catcher.x > 350) {
    catcher.x = 350;
  }

  // if fallingObject collides with catcher, move back to the rnadom positon at the top. 
  if (fallingObject.collides(catcher)) {
    fallingObject.y = 0; 
    fallingObject.x = random(width); 
    fallingObject.vel.y = random(1,5);
    fallingObject.direction = 'down'; 
    score = score + 1; 
  }

  //takes you to lose screen
  if (score < 0) {
    screen = 1; 
    print(screen);
    print("This is the losing screen.");
    showloseScreen();
    fill('#FFFFFF');
    textSize(20);
    text("Score: --", 10, 20 );
  }

  //for showing the winning screen at great score of 10
  if (score == 10) {
    screen = 2;
    print("this is the winning screen!");
    showWinScreen();
  }

  //Score in the top corner
  fill('#442e19');
  textSize(20);
  if (score >= 0) {
    text('Score: ' + score, 10, 20);
  }
}

function showloseScreen() {
  background('#b55c51'); 
  fill('#ffffff');
  textSize(50);
  text("You lost!", width/4, height/2);
  textSize(16);
  text("Press or click RUN to play again.", 90, height/2 + 20);
  catcher.pos = {x: -50, y: -50};
  fallingObject.pos = {x: -100, y: -100};
  score.pos = {x: -60, y: -60};
}

function showWinScreen() {
  background('#83f28f');
  fill(0);
  textSize(50);
  text("You won!", width/4, height/2);
  textSize(16);
  text("Press or click RUN to play again.", 90, height/2 + 20);
  catcher.pos = {x: -50, y: -50};
  fallingObject.pos = {x: -100, y: -100};
}