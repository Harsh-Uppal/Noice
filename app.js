const webURL = 'https://harsh-uppal.github.io/Wave-Manipulator';
let pauseBtn, nextFrameBtn, lastFrameBtn, slowDownBtn, speedUpBtn;
let paused = false, pauseFrame;
let presets = [
  [1, 1, 15, 10, 5, 10, 4, 100],
  [1, 1, 2, 2, 50, 50, 6, 100],
  [2, 2, 5, 5, 10, 10, 5, 100],
  [1, 1, 10, 0, 10, 10, 7, 150],
  [10, 1, 20, 1, 1, 20, 7, 150],
  [1, 1, 3, 25, 10, 20, 8, 150],
  [10, 1, 15, 20, 20, 11, 10, 150],
  [1, 2, 20, 21, 2, 1, 9, 150],
  [1, 1, 2, 12, 5, 5, 9, 180],
  [1, 4, 110, 40, 2, 10, 10, 150],
  [1, 1, 100, 5, 5, 50, 6, 100],
  [1, 1, Math.round(Math.random() * 8 + 1), 40, 1, 2, 8, 80]
];
let inputs = [], link = '';

addEventListener('resize', () => {
  createCanvas(window.innerWidth * 7.5 / 10, window.innerHeight * .8);
  let wasPaused = paused;
  paused = false;
  draw();
  paused = wasPaused;
  showPauseIndicator('red');
});

function setRandomPreset() {
  let inputs = random(presets);

  for (let i = 0; i < 8; i++)
    document.querySelector('#Inp' + (i + 1)).value = inputs[i];
}

function reloadInputs() {
  for (let i = 0; i < 8; i++)
    inputs[i] = parseFloat(document.querySelector('#Inp' + (i + 1)).value);
}

function checkUrl() {
  let urlStr = window.location.href;
  let url = new URL(urlStr);

  let extractedInputs = [];

  for (let i = 0; i < 8; i++) {
    let cUInp = url.searchParams.get('uInp' + i);
    let floatCInp = parseFloat(cUInp);

    if (isNaN(floatCInp))
      return false;
    else
    {
      extractedInputs[i] = floatCInp;
      document.querySelector('#Inp' + (i + 1)).value = floatCInp;
    }
  }

  return extractedInputs;
}

function setup() {
  createCanvas(window.innerWidth * 7.5 / 10, window.innerHeight * .8);

  textSize(20);
  textAlign(CENTER, CENTER);

  if (checkUrl() == false){
    setRandomPreset();
    reloadInputs();
  }
  else
    inputs = checkUrl();  
}

function showPauseIndicator(color) {
  stroke(color);
  fill(color);
  rect(10, 10, 20, 20);
}

function draw() {
  if (paused)
    return;

  background(22, 37, 37);

  showPauseIndicator('lime');

  fill(22, 37, 37);
  stroke('gold');

  beginShape();

  let circleRad = inputs[7];
  for (let x = frameCount / 100; x < frameCount / 100 + TWO_PI * 10; x += max(10 - inputs[6], .001))
    vertex(width / 2 + Math.sin(x / inputs[0]) * circleRad + Math.sin(x * inputs[4]) * inputs[2],
      height / 2 - Math.cos(x / inputs[1]) * circleRad + Math.cos(x * inputs[5]) * inputs[3]);

  endShape();
}

function pausePlayBtnPressed() {
  paused = !paused;

  if (paused)
    pauseFrame = frameCount;
  else
    frameCount = pauseFrame

  showPauseIndicator('red');
}

function generateShareUrl() {
  let generatedUrl = webURL;

  generatedUrl += '?';

  for (let i = 0; i < 7; i++)
    generatedUrl += `uInp${i}=${inputs[i]}&`

  generatedUrl += `uInp${7}=${inputs[7]}`

  return generatedUrl;
}

function share() {
  let shareUrl = generateShareUrl();
  
  link = shareUrl;
  document.querySelector('.share>.url').href = shareUrl;
  document.querySelector('.share>.url').innerHTML = shareUrl;

  document.querySelector('.share').style.display = '';
}

function hideShare() {
  document.querySelector('.share').style.display = 'none';
}

function copyShareUrl() {
  navigator.clipboard.writeText(link);

  alert('Link copied');
}
