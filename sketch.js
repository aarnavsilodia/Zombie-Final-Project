var bg,bgImg;
var player, shooterImg, shooter_shooting;
var h1, h2, h3,h1i,h2i,h3i, hCt;
var zombie, zImg,zGroup;

var diff;
var ct;
var bullet;
var s;
var w, go, ex;
var h;


function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
  zImg = loadImage("assets/zombie.png")

  h1i = loadImage("assets/heart_1.png")
  h2i = loadImage("assets/heart_2.png")
  h3i = loadImage("assets/heart_3.png")
  
  w = loadSound("assets/win.mp3")
  go = loadSound("assets/lose.mp3")
  ex = loadSound("assets/explosion.mp3")
}

function setup() {
  s = 3;
  h = 3;
  
  h1 = createSprite(windowWidth/2,windowHeight/10)
  h1.addImage("h1",h1i)
  h1.scale = 0.1
  h1.visible = false

  h2 = createSprite(windowWidth/2,windowHeight/10)
  h2.addImage("h2",h2i)
  h2.scale = 0.1
  h2.visible = false

  h3 = createSprite(windowWidth/2,windowHeight/10)
  h3.addImage("h3",h3i)
  h3.scale = 0.1

  zGroup = new Group()
  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  
imageMode(CENTER)

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = false


}

function draw() {
  background(0); 




  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}

//death

for(var i = 0; i<zGroup.length;i++){
  if(zGroup[i].collide(player)){
    //lose
    hCt -= 1;
    if(hCt === 0){
      go.play()
      zGroup.destroyEach()
      player.destroy()
      fill("red")
      fontSize(30)
      text("GAME OVER!!",5(windowWidth/12),windowHeight/2)
    }else if(hCt >= 1 && ct > 40){
      // win
      w.play()
      zGroup.destroyEach()
      player.destroy()
      fill("green")
      fontSize(30)
      text("YOU DEFEATED THE ZOMBIES!!", windowWidth/3,windowHeight/2)
    }
  }
}

//life standards
h = "h"+hCt
if(h1 != h){
  h1.visible = false
}else{
  h1.visible = true;
}
if(h2 != h){
  h2.visible = false
}else{
  h2.visible = true;
}
if(h3 != h){
  h3.visible = false
}else{
  h3.visible = true;
}



//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
  ex.play()

  bullet = createImage("assets/heart_1.png")
  bullet.setPosition(player.x + 80,player.y + 10)
  bullet.scale = 0.006
  bullet.velocityX = 2

  for(var i =0; i<zGroup.length; i++){
    if(bullet.collide(zGroup[i])){
      ex.play()
      zGroup[i].destroy()
      bullet.destroy()
    }
  }
//player goes back to original standing image once we stop pressing the space bar
}else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

//keep count, increase speed, and regulate zombie spawning
setTimeout(() => {
  ct += 1;
  s += 0.25;
  if(ct % 30 === 0){
    if(ct === 0){
      diff = 1
    }else{
      diff += 1
    }
  }
  zSpawn(diff)
},2000)

drawSprites();

}

//spawn zombies
function zSpawn(num){
  for(var i = 0;i<num; i++){
    zombie = createSprite((displayWidth/8)*7, random(displayHeight/4,(displayHeight/4)*3),50,50)
    zombie.addImage("z",zImg)
    zGroup.add(zombie)
    zombie.velocityX = -s;
  } 
}


