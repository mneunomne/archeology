const socket = io.connect('http://localhost:3000');

let video;

let camWidth
let camHeight

let outputHeight
let outputWidth

let captureWidth = 1280/2
let captureHeight = 720/2

const canvasSize = 500;

var lastDetections = []

// set this to 10 on https://editor.p5js.org/ and you'll see the problem
const DELAY = 5000

function setup() {
  canvas_w = window.innerWidth;
   // calculate canvas height
  canvas_h = window.innerHeight
   // create canvas
  createCanvas(canvas_w, canvas_h);
  // createCanvas(1200, 800);
  strokeWeight(5);
  colorMode(HSB, 255, 255, 255, 255)
  //initCapture()
}

function initCapture () {
  video = createCapture(VIDEO, onVideoLoaded);
  video.size(captureWidth, captureHeight);
  console.log(video.width, video.height)
  var ratio = canvas_h / video.width;
  var video_h = video.height * ratio;
  outputHeight = canvas_h
  outputWidth = video_h
}

var videoLoaded = false
function onVideoLoaded (data) {
  console.log("video loaded", data)
  videoLoaded = true
}
let start = Date.now()
function draw () {
  background(255, 0, 0)
  noFill()
  stroke(0, 255, 255)
  translate(width/2 - captureWidth/2, height/2 - captureWidth/2)
  rect(0, 0, captureWidth, captureHeight)
  if (lastDetections.length > 0) {
    drawDetections(lastDetections)
  }
}

function displayVideo () {
  let delay = Date.now() - start
  push();
    translate(width / 2, height / 2);
    rotate(PI / 180 * 270);
    imageMode(CENTER);
    if (video && video.loadedmetadata && videoLoaded && delay > DELAY) {
      // the quality of this image is much lower than what is shown inside p5's <video>
      image(video.get(), 0, 0, outputHeight, outputWidth, 0, 0, outputHeight, outputWidth)
    }
    translate(-width / 2, -height / 2);
  pop();
}

function onDetection (detections) {
  // console.log("onDetection", detections)
  lastDetections = detections
}

function drawDetections (detections) {
  for (var i in detections) {
    drawChar(detections[i])
  }
}

function drawChar (detection) {
  let x = detection.x * captureWidth
  let y = detection.y * captureHeight
  let w = detection.w * captureWidth
  let h = detection.h * captureHeight
  console.log("detection", detection)
  // console.log(x, y, w, h)
  let char = detection.char
  var fontSize = h 
  strokeWeight(1);
  fill(color('white'))
  stroke(color('white'))
  textSize(fontSize)
  text(char, x, y, w, h)
  
  noFill();
  strokeWeight(2)
  stroke(detection.id, 255, 255, 255)
  rect(x, y, w, h);
}

// listen to events coming broadcasted from server 
socket.on("detections", onDetection);