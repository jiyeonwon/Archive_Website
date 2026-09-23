// ================================
// DYNAMIC BALANCE
// p5.js + Matter.js
// ================================

const {
  Engine,
  World,
  Bodies,
  Body,
  Constraint,
  Query,
  Vector
} = Matter;

let engine;
let world;

let canvas;

let ground;
let leftWall;
let rightWall;

let bar;
let pivot;

let box;
let ball;
let triangle;
let smallBall1;
let smallBall2;

let draggableBodies = [];

let dragConstraint = null;

let startTime;
let physicsStarted = false;



// ==================================
// SETUP
// ==================================

function setup() {


  canvas = createCanvas(900, 700);

  engine = Engine.create();
  world = engine.world;


  // 처음에는 중력 OFF
  engine.gravity.y = 0;



  // ==================================
  // FLOOR
  // ==================================

  ground = Bodies.rectangle(
    width / 2,
    height - 20,
    width,
    40,
    {
      isStatic: true,
      friction: 0.8
    }
  );



  // ==================================
  // WALLS
  // ==================================

  leftWall = Bodies.rectangle(
    -20,
    height / 2,
    40,
    height,
    {
      isStatic: true
    }
  );


  rightWall = Bodies.rectangle(
    width + 20,
    height / 2,
    40,
    height,
    {
      isStatic: true
    }
  );



  // ==================================
  // SEESAW BAR
  // ==================================

  bar = Bodies.rectangle(
    width / 2,
    280,
    440,
    18,
    {
      density: 0.002,

      friction: 0.4,

      frictionAir: 0.02,

      restitution: 0.2,

      angle: radians(-2)
    }
  );



  // ==================================
  // PIVOT
  // ==================================

  pivot = Constraint.create({

    pointA: {
      x: width / 2,
      y: 280
    },

    bodyB: bar,

    pointB: {
      x: 0,
      y: 0
    },

    stiffness: 1,

    length: 0
  });



  // ==================================
  // SQUARE
  // ==================================

  box = Bodies.rectangle(
    320,
    235,
    65,
    65,
    {
      density: 0.004,

      friction: 0.5,

      restitution: 0.15,

      frictionAir: 0.003
    }
  );


  Body.setMass(
    box,
    3
  );



  // ==================================
  // BIG CIRCLE
  // ==================================

  ball = Bodies.circle(
    590,
    225,
    35,
    {
      density: 0.004,

      friction: 0.02,

      restitution: 0.35,

      frictionAir: 0.0
    }
  );


  Body.setMass(
    ball,
    6
  );



  // ==================================
  // TRIANGLE
  // ==================================

  triangle = Bodies.polygon(
    610,
    570,
    3,
    55,
    {
      friction: 0.7,

      restitution: 0.25,

      density: 0.003
    }
  );



  // ==================================
  // SMALL CIRCLE 01
  // ==================================

  smallBall1 = Bodies.circle(
    500,
    600,
    22,
    {
      friction: 0.03,

      restitution: 0.8,

      density: 0.002
    }
  );



  // ==================================
  // SMALL CIRCLE 02
  // ==================================

  smallBall2 = Bodies.circle(
    690,
    620,
    28,
    {
      friction: 0.08,

      restitution: 0.5,

      density: 0.003
    }
  );



  // ==================================
  // WORLD
  // ==================================

  World.add(
    world,
    [
      ground,
      leftWall,
      rightWall,

      bar,
      pivot,

      box,
      ball,

      triangle,

      smallBall1,
      smallBall2
    ]
  );



  // ==================================
  // DRAG 가능한 물체
  // ==================================

  // 바닥 / 벽 / 얇은 중심선은 제외

  draggableBodies = [

    bar,

    box,

    ball,

    triangle,

    smallBall1,

    smallBall2

  ];



  // Safari 기본 터치/드래그 방지
  canvas.elt.style.touchAction = "none";

  startTime = millis();
}





// ==================================
// DRAW
// ==================================

function draw() {

  background(242);



  // ==================================
  // AUTOMATIC START
  // ==================================

  // 1.2초 후 중력 시작

  if (
    millis() - startTime > 1200 &&
    physicsStarted === false
  ) {

    engine.gravity.y = 1;

    physicsStarted = true;



    // 사각형을 조금 더 빠르게 떨어뜨림
    Body.setVelocity(
      box,
      {
        x: box.velocity.x,
        y: 6
      }
    );

  }



  // ==================================
  // DRAG
  // ==================================

  // 마우스로 물체를 잡고 있는 동안
  // Constraint의 목표 지점을 계속 마우스 위치로 이동

  if (dragConstraint !== null) {

    dragConstraint.pointA.x = mouseX;
    dragConstraint.pointA.y = mouseY;

  }



  Engine.update(engine);



  // ==================================
  // CENTER AXIS
  // ==================================

  // 이 선은 Matter 물체가 아니라
  // 화면에만 그려지는 그래픽
  // 따라서 드래그되지 않음

  stroke(25);
  strokeWeight(1.5);

  line(
    width / 2,
    280,
    width / 2,
    390
  );



  // 중심점

  noStroke();
  fill(20);

  circle(
    width / 2,
    280,
    12
  );



  // ==================================
  // BAR
  // ==================================

  drawRectangle(
    bar,
    440,
    18,
    20
  );



  // ==================================
  // SQUARE
  // ==================================

  drawRectangle(
    box,
    65,
    65,
    20
  );



  // ==================================
  // BIG CIRCLE
  // ==================================

  drawCircle(
    ball,
    70,
    20
  );



  // ==================================
  // TRIANGLE
  // ==================================

  drawPolygon(
    triangle,
    25
  );



  // ==================================
  // SMALL CIRCLE 01
  // ==================================

  drawCircle(
    smallBall1,
    44,
    170
  );



  // ==================================
  // SMALL CIRCLE 02
  // ==================================

  drawCircle(
    smallBall2,
    56,
    90
  );



  // ==================================
  // FLOOR
  // ==================================

  noStroke();
  fill(20);

  rect(
    0,
    height - 40,
    width,
    40
  );



  // ==================================
  // TITLE
  // ==================================

  fill(20);

  textSize(13);
  textAlign(LEFT);

  text(
    "DYNAMIC BALANCE",
    35,
    42
  );


  textSize(10);

  fill(100);

  text(
    "GRAVITY / MASS / FRICTION / BALANCE",
    35,
    60
  );

}





// ==================================
// MOUSE PRESSED
// ==================================

function mousePressed() {

  // 캔버스 바깥이면 아무것도 하지 않음

  if (
    mouseX < 0 ||
    mouseX > width ||
    mouseY < 0 ||
    mouseY > height
  ) {

    return;

  }



  // 현재 마우스 위치에 있는
  // Matter Body 검색

  let foundBodies = Query.point(
    draggableBodies,
    {
      x: mouseX,
      y: mouseY
    }
  );



  // 물체를 클릭했다면
  if (foundBodies.length > 0) {

    let selectedBody = foundBodies[0];



    // 클릭한 위치와 물체 중심 사이 거리
    let worldOffset = {

      x: mouseX - selectedBody.position.x,

      y: mouseY - selectedBody.position.y

    };



    // 물체가 회전되어 있어도
    // 정확히 클릭한 위치를 잡을 수 있도록
    // 로컬 좌표로 변환

    let localOffset = Vector.rotate(
      worldOffset,
      -selectedBody.angle
    );



    // ==================================
    // DRAG CONSTRAINT
    // ==================================

    dragConstraint = Constraint.create({

      pointA: {

        x: mouseX,

        y: mouseY

      },

      bodyB: selectedBody,

      pointB: {

        x: localOffset.x,

        y: localOffset.y

      },

      // 마우스를 따라오는 힘
      stiffness: 0.2,

      // 흔들림 완화
      damping: 0.15,

      length: 0

    });



    World.add(
      world,
      dragConstraint
    );



    // 클릭한 물체 깨우기
    Body.setSleeping(
      selectedBody,
      false
    );

  }

}





// ==================================
// MOUSE DRAGGED
// ==================================

function mouseDragged() {

  if (dragConstraint !== null) {

    dragConstraint.pointA.x = mouseX;
    dragConstraint.pointA.y = mouseY;

  }


  // Safari가 드래그를
  // 다른 동작으로 처리하지 않도록 함

  return false;

}





// ==================================
// MOUSE RELEASED
// ==================================

function mouseReleased() {

  if (dragConstraint !== null) {

    World.remove(
      world,
      dragConstraint
    );


    dragConstraint = null;

  }


  return false;

}





// ==================================
// RECTANGLE DRAW
// ==================================

function drawRectangle(
  body,
  w,
  h,
  colorValue
) {

  push();


  translate(
    body.position.x,
    body.position.y
  );


  rotate(
    body.angle
  );


  rectMode(CENTER);


  noStroke();

  fill(
    colorValue
  );


  rect(
    0,
    0,
    w,
    h
  );


  pop();

}





// ==================================
// CIRCLE DRAW
// ==================================

function drawCircle(
  body,
  diameter,
  colorValue
) {

  push();


  translate(
    body.position.x,
    body.position.y
  );


  rotate(
    body.angle
  );


  noStroke();

  fill(
    colorValue
  );


  circle(
    0,
    0,
    diameter
  );



  // 원 회전 표시

  stroke(242);

  strokeWeight(2);


  line(
    0,
    0,
    diameter / 2,
    0
  );


  pop();

}





// ==================================
// POLYGON DRAW
// ==================================

function drawPolygon(
  body,
  colorValue
) {

  push();


  noStroke();

  fill(
    colorValue
  );


  beginShape();


  for (let v of body.vertices) {

    vertex(
      v.x,
      v.y
    );

  }


  endShape(CLOSE);


  pop();

}