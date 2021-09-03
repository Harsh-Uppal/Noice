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
  valInps.push(createInput(".03"));
  valInps.push(createInput("false"));

  for (let i = 0; i < valInps.length; i++) {
    valInps[i].position(window.innerWidth / valInps.length * i, height);
    valInps[i].size(window.innerWidth / valInps.length - 9, window.innerHeight * .06);
  }

  pauseBtn.position(width / 2 - 50, window.innerHeight * .88);

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
  for (let x = frameCount / 100; x < frameCount / 100 + TWO_PI * 10; x += Math.max(parseFloat(valInps[6].value()), .001)) {
    vertex(width / 2 + Math.sin(x / parseInt(valInps[5].value())) * circleRad + Math.sin(x * parseInt(valInps[0].value())) * parseInt(valInps[4].value()),
      height / 2 - Math.cos(x / parseInt(valInps[1].value())) * circleRad + Math.cos(x * parseInt(valInps[2].value())) * parseInt(valInps[3].value()));
  }
  if (valInps[7].value == "true")
    endShape(CLOSE);
  else
    endShape();
}