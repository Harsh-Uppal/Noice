let pauseBtn, nextFrameBtn, lastFrameBtn, slowDownBtn, speedUpBtn;
let valInps = [];
let paused = false;
let frameRateNow = 60;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight * .8);
  pauseBtn = createButton("Play/Pause");
  pauseBtn.size(100, window.innerHeight * .08);

  valInps.push(createInput("9"));
  valInps.push(createInput("1"));
  valInps.push(createInput("33"));
  valInps.push(createInput("21"));
  valInps.push(createInput("213"));
  valInps.push(createInput("1"));
  valInps.push(createInput("false"));

  for (let i = 0; i < valInps.length; i++) {
    valInps[i].position(window.innerWidth / valInps.length * i, height);
    valInps[i].size(window.innerWidth / valInps.length - 9, window.innerHeight * .06);
  }

  pauseBtn.position(width / 2 - 50, window.innerHeight * .88);

  /*lastFrameBtn = createButton("< Last ");
  nextFrameBtn = createButton(" Next >");
  slowDownBtn = createButton("<< Slow Down");
  speedUpBtn = createButton("Speed Up >>");
  
  lastFrameBtn.mousePressed(() => {
    frameCount-=2;
    paused = false;
    draw();
    paused = true;
  });
  nextFrameBtn.mousePressed(() => {
    paused = false;
    draw();
    paused = true;
  });
  slowDownBtn.mousePressed(() => {
    frameRateNow /= 2;
    frameRate(frameRateNow);
  });
  speedUpBtn.mousePressed(() => {
    frameRateNow *= 2;
        frameRate(frameRateNow);

  });*/
  pauseBtn.mousePressed(() => {
    paused = !paused;
    stroke("red");
    fill("red");
    rect(10, 10, 20, 20);
  });
}

function draw() {
  if (paused)
    return;

  background(0);

  stroke("lime");
  fill("lime");
  rect(10, 10, 20, 20);

  fill(0);
  stroke(255, 200, 120);

  beginShape();
  let circleRad = 150;
  for (let x = frameCount / 100; x < frameCount / 100 + TWO_PI * 10; x += .03) {
    vertex(width / 2 + Math.sin(x / parseInt(valInps[5].value())) * circleRad + Math.sin(x * parseInt(valInps[0].value())) * parseInt(valInps[4].value()),
      height / 2 - Math.cos(x / parseInt(valInps[1].value())) * circleRad + Math.cos(x * parseInt(valInps[2].value())) * parseInt(valInps[3].value()));
  }
  if (valInps[6].value == "true")
    endShape(CLOSE);
  else
    endShape();


  stroke(120, 200, 255);

  beginShape();
  circleRad = 90;
  //for(let x = frameCount / 1000; x < frameCount / 1000 + TWO_PI;x += 1/10)
  //{
  //   vertex(width / 2 + sin(x * 10) * circleRad + sin(x * 10) * 10, height / 2 + cos(x * 10) * circleRad + cos(x * 10) * 10);
  //}
  endShape(CLOSE);

  fill("lime");
  stroke("lime");
  textAlign(CENTER, CENTER);
  textSize(75);
  textFont("Algerian");
  //text("H", width / 2, height / 2);
}