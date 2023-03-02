//Inspired by https://www.youtube.com/watch?v=0PCNSK5FuAg&t=141s
//Reference: https://editor.p5js.org/rjgilmour/full/RghSL1xxo

function slct(x, y, z, c)  {
  return(
    {
      x: x,
      y: y,
      z: z,
      selected: false,
      color: c
    }
  )
}

let sounds = []
let links=[]
let objects = []
let tiltTh = 0;
let panTh = 0;
let tilting = 0;
let panning = 0;
let obj1;
let obj5;
let backgroundImg;
let door1Textur;
let door2Texture;
let door3Texture;
let door4Texture;
let door5Texture;
let bird;
let desert;
let poem1;
let poem2;
let key;


let propCam = {
  position: [0, 0, 350],
  panning: panning,
  tilting: tilting,
}

function preload() { 
  obj1 = loadModel('door1.obj', true);
  obj5 = loadModel('door5.obj', true);
  backgroundImg = loadImage('img1.jpg')
  door1Textur = loadImage('door1_texture.png')
  door2Texture = loadImage('door2_texture.png')
  door3Texture = loadImage('door3_texture.png')
  door4Texture = loadImage('door4_texture.png')
  door5Texture = loadImage('door5_texture.jpg')
  bird = loadImage('bird01-the-biggest.png');
  desert= loadImage('desert.png')
  poem1=loadImage('poem1.png')
  poem2=loadImage('poem2.png')
  key=loadImage('key.png')

  //sound
  sounds.push(loadSound('soundEffects/door1.wav'));
  sounds.push(loadSound('soundEffects/door2.wav'));
  sounds.push(loadSound('soundEffects/door3.wav'));
  
  
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  cam = createCamera();
  //orig positionZ 350
  cam.setPosition(0, 0, 500)
  console.log(cam.eyeZ)
  //angleMode(DEGREES);
  
  objects.push(slct(0, 0, -10, "#31D2B0"))      //background_ plane+texture
  objects.push(slct(260, -40, 90, "#FF9800")) //door1_3D
  objects.push(slct(-170, -90, 80, "#2196F3")) //door2_plane+texture
  objects.push(slct(20, 80, 150, "#4CAF50"))  //door3_plane+texture
  objects.push(slct(300,  130, 170, "#2196F3"))  //door4_plane+texture
  objects.push(slct(-280, 100, 100, "#2196F3"))  //door5_3D

  links.push('https://tonejs.github.io/')
  links.push('https://www.hhha.online/')
  links.push('https://shaderific.com/glsl.html')
  links.push('https://p5js.org/reference/#/p5/createA')
  links.push('https://openhome.cc/Gossip/P5JS/TextureMapping.html')
  links.push('https://archive.org/details/specimensofgothi00mack/page/n127/mode/2up')


}

function draw() {
  background(220);
  perspective(PI/3, width/height, 350/10, 350*10)
  
  
  orbitControl(3)
 
  //need to be deleted
  // stroke('red')
  // line(0, 0, 200, 0)
  // stroke('green')
  // line(0, 0, 0, 200)
  // stroke(0, 0,255)
  // line(0, 0, 0, 0, 0, 200)
  // stroke(0)
  
  lights()
  pointLight(230, 230, 230, 300, -500, 0)
  
  // push()
  // strokeWeight(3)
  // drawLine(0, 0, 350, (mouseX-width/2)/10, (mouseY-height/2)/10, 350 - 35)
  // pop()

  //----------------------background
    push()
      noStroke()
      let backgroundRotate=map(mouseX,0,width,-0.1,0.1)
      translate(objects[0].x, objects[0].y, objects[0].z)  
      rotateY(backgroundRotate);
      if(objects[0].selected ) {
        //fill(objects[0].color)
        //sphere(20)
      }else {
        //fill(0,255,0)
        //sphere(20)
      }
      texture(backgroundImg);   
        scale(0.8)
        plane(windowWidth,windowHeight,1)
        
     pop()

  //----------------------bird
    push()
    noStroke()
    let birdRotate=map(mouseX,0,width,-0.1,0.1)
    let birdMoveY=map(mouseX,0,width,0,20)
    translate(-360, -200+birdMoveY, 90)  
    rotateY(birdRotate);
    texture(bird);   
    plane(bird.width*0.5,bird.height*0.5)
      
   pop()

  //----------------------desert
  push()
  noStroke()
  let desertRotate=map(mouseX,0,width,-0.15,0.15)
  let desertMoveY=map(mouseX,0,width,0,5)
  translate(objects[0].x, objects[0].y+desertMoveY, objects[0].z+40)  
  rotateY(desertRotate);
  texture(desert);   
  plane(desert.width*0.5,desert.height*0.5)
    
pop()
  
  
  //----------------------door1_3D
      push()
      noStroke()
      let door1Rotate=map(mouseX,0,width,-0.7,0.5)
      let door1MoveZ=map(mouseX,0,width,10,50)
      translate(objects[1].x, objects[1].y, objects[1].z+door1MoveZ)
      rotateY(door1Rotate)
      if(objects[1].selected) {
        scale(1.1)
      } else {
        
      } 
        texture(door1Textur)
        scale(1.3)
        model(obj1)   
     pop()


    //----------------------door 2, drawn on a plane
    push()
      noStroke()
      let door2Rotate=map(mouseX,0,width,-0.1,0.1)
      translate(objects[2].x, objects[2].y, objects[2].z)  
      rotateY(door2Rotate)
      let planeWidth2=150
      let planeHeight2=planeWidth2*1.3
      if(objects[2].selected ) {
        scale(1.2)
      }else {
      }
        scale(1.1)
        texture(door2Texture);
        plane(planeWidth2, planeHeight2);
     pop()
  


    //----------------------door 3, drawn on a plane
    push()
    noStroke()
    let door3Rotate=map(mouseX,0,width,-0.1,0.1)
    translate(objects[3].x, objects[3].y, objects[3].z)  
    rotateY(door3Rotate)
    let planeWidth3=200
    let planeHeight3=planeWidth3*1.3
    if(objects[3].selected ) {
      scale(1.2)
    }else {

    }
    scale(0.85)
      texture(door3Texture);
      plane(planeWidth3, planeHeight3);
   pop()


   
   //----------------------door 4, drawn on a plane
      push()
      noStroke()
      let door4Rotate=map(mouseX,0,width,-0.2,0.2)
      translate(objects[4].x, objects[4].y, objects[4].z)  
      rotateY(door4Rotate)
      let planeWidth4=80
      let planeHeight4=planeWidth4*1.2
      if(objects[4].selected ) {
        scale(1.5)
      }else {

      }
      scale(1.2)
        texture(door4Texture);
        plane(planeWidth4, planeHeight4);
    pop()


  //----------------------door5_3D
  push()
  noStroke()
  let door5Rotate=map(mouseX,0,width,-0.3,0.3)
  let door5MoveZ=map(mouseX,0,width,0,50)
  translate(objects[5].x, objects[5].y, objects[5].z+door1MoveZ)
  rotateY(door5Rotate)
  if(objects[5].selected) {
    fill(177,176,166)
    scale(1.15)
  } else {
    fill(177,176,166)
  // sphere(20)

  } 
    scale(0.8)
    model(obj5)   
 pop()

//---------------------------poem1 and poem2
// rotateX(frameCount *0.01);
// rotateY(frameCount * 0.02);

push();
noStroke()
let poemRotate=map(mouseX,0,width,-0.1,0.1)
let poemMoveY=map(mouseX,0,width,0,0.1)
translate(-300, -110+poemMoveY, 100)  
rotateY(poemMoveY)
texture(poem1);
plane(200,80);
pop();

push();
noStroke()
translate(220, 110+poemMoveY, 190) 
rotateY(poemMoveY)
texture(poem2);
plane(180,40);
pop();





  // rectMode(CENTER)
  // push()
  //   translate(0, 0, 350-35)
  //   fill('rgba(255, 255, 255, 0.5)')
  //   rect(0, 0, width, height)
  // pop()
  
  for(let i = 0; i < objects.length; i++){
    let o = objects[i]
    let d = dist(0, 0, 350, o.x, o.y, o.z)
    let xMag = dist(0, 0, 350, (mouseX-width/2)/10, (mouseY-height/2)/10, 350 - 35)

    // strokeWeight(1)
    // drawLine(0, 0, 350, (mouseX-width/2)/10 * d/xMag, (mouseY-height/2)/10 * d/xMag, 350 - 35 * d/xMag)
    push()
      translate((mouseX-width/2)/10 * d/xMag, (mouseY-height/2)/10 * d/xMag, 350 - 35 * d/xMag)
      strokeWeight(0.2)
      if(dist((mouseX-width/2)/10 * d/xMag, (mouseY-height/2)/10 * d/xMag, 350 - 35 * d/xMag, o.x, o.y, o.z) < 20){
        o.selected =  true;
      } else {
        o.selected = false;
      }
      noFill()
      stroke(o.color)
      sphere(20)
    pop()
  }
  
  strokeWeight(2)
}

function drawLine(x1, y1, z1, x2,y2, z2){
  push()
    beginShape();
    vertex(x1,y1,z1);
    vertex(x2,y2,z2);  
    endShape();
  pop()
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    tiltTh = -0.01
    tilting -= 0.01
    cam.tilt(tiltTh)
  } else if (keyCode === UP_ARROW) {
    tiltTh = 0.01
    tilting += 0.01
    cam.tilt(tiltTh)
  } else if (keyCode === LEFT_ARROW) {
    panTh = -0.01
    panning -= 0.01
    cam.pan(panTh)
  } else if (keyCode === RIGHT_ARROW) {
    panTh = 0.01
    panning += 0.01
    cam.pan(panTh)
  }
  
  console.log([panning, tilting])
}



function Rx(th) {
  return [[1, 0, 0, 0],
        [0, cos(th), -sin(th), 0],
        [0, sin(th), cos(th), 0],
        [0, 0, 0, 1]]
} 

function Ry(th) {
  return [[cos(th), 0, sin(th), 0],
        [0, 1, 0, 0],
        [-sin(th), 0, cos(th), 0],
        [0, 0, 0, 1]]
} 

function Rz(th) {
  return [[cos(th), -sin(th), 0, 0],
        [sin(th), cos(th), 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]]
} 

function matrixMult(A, B) {
  if(A[0].length !== B.length) return "A col != B row"
  l = A.length;      // Number of rows in A
  m = A[0].length;   // Number of columns in A and number of rows in B
  n = B[0].length;   // Number of columns in B
  
  // console.log("A is an :" + l + "x" + m + " Matrix ")
  // console.log("B is an :" + m + "x" + n + " Matrix ")
  
  let C = []
  for(let i = 0; i < l; i++){
    C[i] = [];
    for(let j = 0; j < n; j++){
      C[i][j] = [];
    }
  }
  
  for(let row = 0; row < l ; row++){
    for(let col = 0; col < n; col++){
      let v = [];
      let w = [];
      for(let i = 0; i < m ; i++){
         v.push(A[row][i])
         w.push(B[i][col])
      }
      C[row][col] = dot(v,w)
    }
  }
  return C;
}

function dot(v, w){
  if(v.length != w.length) return "Error, vector lengths do not match"
  let sum = 0;
  for(i = 0; i < v.length; i++){
    sum += v[i] * w[i];
  }
  return sum;
}

function vecNorm(v) {
  let vmag = sqrt(v[0][0]**2 + v[0][1]**2 + v[0][2]**2)
  return [[v[0][0] / vmag, v[0][1] / vmag, v[0][2] / vmag, 1]]
}


function mousePressed() {
  let randSound = random(sounds);


  for(let i=0;i<objects.length;i++){
    if(objects[i].selected==true){
      randSound.play();   
      window.location.href = links[i]
      //window.open(links[i])  
       
     }
}
}
