let pauseBtn, nextFrameBtn, lastFrameBtn, slowDownBtn, speedUpBtn;
let valInps = [];
let paused = false, pauseFrame;
let presets = [
  [9, 1, 33, 21, 213, 1, .03, false, 150],
  [1, 1, Math.round(Math.random() * 19 + 1), 21, 213, 11, 1, false, 150],
  [1, 5, 1, 1, 2, 1, .1, false, 150],
  [4, 1, 4, 53, 34, 1, 1, false, 150],
  [1, 1, Math.round(Math.random() * 8 + 1), 40, 2, 1, .6, false, 150],
  [1, 2, 20, 21, 213, .1, false, 150],
  [Math.round(Math.random() * 9 + 1), 1, 12, 21, 213, 11, .01, false, 150],
  [10, 1, 12, 21, 213, 11, 10, false, 150],
  [1, 4, 110, 40, 10, 2, .001, false, 150],
  [1, 2, 12, 2, 2, 3, .1, false, 180]
];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight * .8);

  textSize(20);
  textAlign(CENTER, CENTER);

  let randPreset = random(presets);

  pauseBtn = createButton("Play/Pause");
  pauseBtn.size(100, window.innerHeight * .08);

  valInps.push(createInput(randPreset[0]));
  valInps.push(createInput(randPreset[1]));
  valInps.push(createInput(randPreset[2]));
  valInps.push(createInput(randPreset[3]));
  valInps.push(createInput(randPreset[4]));
  valInps.push(createInput(randPreset[5]));
  valInps.push(createInput(randPreset[6]));
  valInps.push(createInput(randPreset[7]));
  valInps.push(createInput(randPreset[8]));

  for (let i = 0; i < valInps.length; i++) {
    valInps[i].position(window.innerWidth / valInps.length * i, height);
    valInps[i].size(window.innerWidth / valInps.length - 9, window.innerHeight * .06);
  }

  pauseBtn.position(width / 2 - 50, window.innerHeight * .88);

  pauseBtn.mousePressed(() => {
    paused = !paused;
    if (paused)
      pauseFrame = frameCount;
    else
      frameCount = pauseFrame
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
  let circleRad = parseInt(valInps[8].value());
  for (let x = frameCount / 100; x < frameCount / 100 + TWO_PI * 10; x += Math.max(parseFloat(valInps[6].value()), .001)) {
    vertex(width / 2 + Math.sin(x / parseInt(valInps[5].value())) * circleRad + Math.sin(x * parseInt(valInps[0].value())) * parseInt(valInps[4].value()),
      height / 2 - Math.cos(x / parseInt(valInps[1].value())) * circleRad + Math.cos(x * parseInt(valInps[2].value())) * parseInt(valInps[3].value()));
  }

  if (valInps[7].value == "true")
    endShape(CLOSE);
  else
    endShape();

  stroke("lime");
  fill("cyan");
  text("Made By : Harsh Uppal", width - 120, height * .9);
}