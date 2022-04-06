// dar de alta las variables 
var fantasma,fan;
var torre, tor;
var puerta, puer;
var balcon, baco;
var grupop;
var grupob;
// elementos : fondo de la torre, puerta, fantasma, climber

var invisibleBlockGroup, invisibleBlock;
var gameState = "play"


function preload(){
    fan=loadImage("ghost-standing.png");
    puer=loadImage("door.png");
    tor=loadImage("tower.png");
    baco=loadImage("climber.png");
  // cargar imagenes y sonido
}

function setup() {
  createCanvas(600,600);
  torre=createSprite(300,300);
  fantasma=createSprite(200,200,50,50);
  fantasma.scale=0.5
  fantasma.addImage("f",fan);
  torre.addImage("t",tor);
  torre.velocityY=1;

 // spookySound.loop(); //REPRODUCCIÓN EN BUCLE
   
  //crear torre 
  
  
  // crear fantasma 

   // GRUPO DE PUERTAS
   grupob=new Group();
   grupop=new Group();
  // GRUPO DE CLIMBERS 
  invisibleBlockGroup = new Group();

}


function draw() {
  background(255);
  
  if (gameState === "play") {
    if (keyDown("left_Arrow")){
        fantasma.x=fantasma.x-3;
    }
    if (keyDown("right_arrow")){
        fantasma.x=fantasma.x3;
    }
   if (keyDown("space")){
       fantasma.velocityY=-10
   }
  
      
  
  fantasma.velocityY = fantasma.velocityY + 0.8; // TE ACUERDAS PARA QUE ERA ESTA INSTRUCCIÓN?
  
   
      //escribir una condición para desplazar infinitamente la torre
     if (torre.y>400){
    torre.y=300;       //suelo infinito
     }
      // LLAMA A LA FUNCIÓN DE PUERTAS! 
    spawnDoors();
  
      //escribir el código = SI EL FANTASMA TOCA EL CLIMBERSGROUP SE DETIENE. 
    if (fantasma.isTouching(grupob)){
        fantasma.velocityY=0;
    }
      if(invisibleBlockGroup.isTouching(fantasma) || fantasma.y > 600){
        // Escribe el codigo para destruir al fantasma. 
        fantasma.destroy();
        gameState="end";
      // CAMBIA EL JUEGO A END
      }
  
  drawSprites();
}
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
   // TEXTO DE FIN DE JUEGO 
   text("FIN DEL JUGO  ^_____^",200,200)
  }
}

function spawnDoors() // PARA QUE SIRVE ESTA FUNCION? 
 {
  if (frameCount % 240 === 0) {
    var puerta = createSprite(200, -50);
    puerta.addImage(puer);
    var balcon = createSprite(200,10);
    balcon.addImage(baco);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = balcon.width;
    invisibleBlock.height = 2;
    puerta.x=Math.round(random(120,400))

    //agregar la función random para que la puerta aparezca al azar
    balcon.x = puerta.x;
    invisibleBlock.x = puerta.x;
    
    // AGREGAR DOOR AL GRUPO
    grupob.add(balcon);
    // AGREGAR CLIMBER AL GRUPO 
    grupob.add(puerta);
    
    puerta.velocityY = 1;
    balcon.velocityY = 1;
    invisibleBlock.velocityY = 1;

    ghost.depth = puerta.depth; // PARA QUE SIRVE ESTA INSTRUCCIÓN? 
    ghost.depth +=1;
    
     

    
    //asignar lifetime a la PUERTA, CIMBER E invisibleBlock = 800
   puerta.lifetime=800;
   balcon.lifetime=800;
   invisibleBlock.lifetime=800;
    //agregar cada obstáculo al grupo obstaclesGroup.add(obstacle);
    //aquí los obstáculos son la puerta y  la barandilla o CLIMBER 
        invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);
  }
}