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

let buttons=[]
let links=[]
let objects = []
let tiltTh = 0;
let panTh = 0;
let tilting = 0;
let panning = 0;
let obj;
let img;

let propCam = {
  position: [0, 0, 350],
  panning: panning,
  tilting: tilting,
}

function preload() { 
  obj = loadModel('111.obj', true);
  img = loadImage('img1.jpg')
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  cam = createCamera();
  cam.setPosition(0, 0, 350)
  console.log(cam.eyeZ)
  //angleMode(DEGREES);
  
  objects.push(slct(0, 0, 0, "#31D2B0"))
  objects.push(slct(80, 0, 100, "#FF9800"))
  objects.push(slct(-100, -50, -50, "#2196F3"))
  objects.push(slct(0, -75, 100, "#4CAF50"))

  links.push('https://tonejs.github.io/')
  links.push('https://www.hhha.online/')
  links.push('https://shaderific.com/glsl.html')
  links.push('https://p5js.org/reference/#/p5/createA')

  console.log(windowWidth);
  console.log(windowHeight);
  // for(let k=0;k<objects.length;k++){
  //   button.position(objects[k].x,objects[k].y,objects[k].z);
  //   button.mousePressed(openEmail[k]);  
  // }
}

function draw() {
  background(220);
  perspective(PI/3, width/height, 350/10, 350*10)
  
  
  //orbitControl(3)
  
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

  //background

    push()
      noStroke()
      let backgroundRotate=map(mouseX,0,width,0,0.1)
      translate(objects[0].x, objects[0].y, objects[0].z)  
      rotateY(backgroundRotate);
      if(objects[0].selected ) {
        texture(img);
        img.filter(INVERT)
      }else {
         texture(img);   
      }
        scale(0.5)
        box(windowWidth,windowHeight,1)
        
     pop()
  
  
  //door1_3D
      push()
      noStroke()
      let door1Rotate=map(mouseX,0,width,0,0.2)
      translate(objects[1].x, objects[1].y, objects[1].z)
      rotateZ(door1Rotate)
      if(objects[1].selected) {
        fill(objects[1].color)
      } else {
        fill(100,100, 100)
      } 
        scale(0.6)
        model(obj)   
     pop()

  
  
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

    strokeWeight(1)
    drawLine(0, 0, 350, (mouseX-width/2)/10 * d/xMag, (mouseY-height/2)/10 * d/xMag, 350 - 35 * d/xMag)
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

// function mouseP{
//   window.open("https://mail.google.com");
// }
function mousePressed() {

    if(objects[0].selected==true){
    window.open(links[0]);
    }
    
    if(objects[1].selected==true){
      window.open(links[1]);
      }
}


