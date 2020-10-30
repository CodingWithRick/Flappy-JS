var back, backgroundImg;
var bird, birdImg;
var gameState="PLAY";
var jumpSound, hitSound;
var pipe, pipeImg, pipe2, pipe2Img, pipeGroup, pipe2Group;
var death = 0;
function preload(){
    backgroundImg = loadImage("background.jpg");
    birdImg = loadImage("bird.png");
    pipeImg = loadImage("pipe.png");
    pipe2Img = loadImage("pipe2.png");
    jumpSound = loadSound("audio/wing.wav");
    hitSound = loadSound("audio/hit.wav");
}
function setup(){
    createCanvas(400, 400);
    back = createSprite(200, 200, 10, 10);
    back.addImage(backgroundImg);
    back.scale = 2;
    back.velocityX = -2;
    bird = createSprite(100, 200, 10, 10);
    bird.addImage(birdImg);
    pipe2Group = new Group();
    pipeGroup = new Group();
}
function draw(){
    background("black");
    if(gameState === "PLAY"){

        if(back.x < 100){
            back.x = 200;
        }
        if(keyDown("space")){
            jumpSound.play();
            bird.velocityY = -5;
        }

        if(pipeGroup.isTouching(bird) || pipe2Group.isTouching(bird) || bird.y > 400 || bird.y < 0){
            hitSound.play();
            death = death + 2;
            bird.velocityY = 0;
            bird.x = 100;
            bird.y = 200;
            pipeGroup.destroyEach();
            pipe2Group.destroyEach();
        }
        if(death === 10){
            gameState = "END"
        }
        bird.velocityY = bird.velocityY + 0.2;
        spawnPipes();
        drawSprites();
        fill("black");
        textSize(16);
        text("Death: " + death, 300, 50);
    }
    if(gameState === "END"){
        fill("yellow");
        textSize(20);
        text("Game Over!\n Death = 10", 130, 200);
        textSize(12);
        fill("white");
        text(" Press r to Restart", 134, 250);
    }
    if(keyDown("r") && gameState==="END"){
        gameState = "PLAY";
        death = 0;
    }
}
function spawnPipes(){
    if(frameCount % 100 === 0){
        pipe = createSprite(200, 400, 10, 10);
        pipe.addImage(pipeImg);
        pipe.velocityX = -2;
        pipe.scale = 0.9;
        pipe.lifetime = 200;
        pipeGroup.add(pipe);
        pipe2 = createSprite(200, 0, 10, 10);
        pipe2.addImage(pipe2Img);
        pipe2.velocityX = -2;
        pipe2.scale = 0.9;
        pipe2.lifetime = 200;
        pipe2Group.add(pipe2);
    }
}
