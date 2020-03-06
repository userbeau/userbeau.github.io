let faceapi;
let video;
let detections;



// by default all options are set to true
const detection_options = {
    withLandmarks: true,
    withDescriptors: false,
}

let img;
let img2
let img3;
function preload() {
  img = loadImage('img/eyeball.png');
  img2 = loadImage('img/nose.png');
  img3 = loadImage('img/mouth.png');
}


function setup() {
    createCanvas(1000, 1000);

    // load up your video
    video = createCapture(VIDEO);
    video.size(width, height);
    // video.hide(); // Hide the video element, and just show the canvas
    faceapi = ml5.faceApi(video, detection_options, modelReady)
    textAlign(RIGHT);
}

function modelReady() {
    console.log('ready!')
    console.log(faceapi)
    faceapi.detect(gotResults)

}

function gotResults(err, result) {
    if (err) {
        console.log(err)
        return
    }
    // console.log(result)
    detections = result;

    // background(220);
    background(255);
    image(video, 0,0, width, height)
    if (detections) {
        if (detections.length > 0) {
            // console.log(detections)
            drawBox(detections)
            drawLandmarks(detections)
            // drawEyes(detections)
        }

    }
    faceapi.detect(gotResults)
}

function drawBox(detections){
    for(let i = 0; i < detections.length; i++){
        const alignedRect = detections[i].alignedRect;
        const x = alignedRect._box._x
        const y = alignedRect._box._y
        const boxWidth = alignedRect._box._width
        const boxHeight  = alignedRect._box._height

        noFill();
        stroke(9, 150, 251);
        strokeWeight(20);
        rect(x, y, boxWidth, boxHeight);
    }

}

function drawLandmarks(detections){
    noFill();
    stroke(161, 95, 251)
    strokeWeight(20)

    for(let i = 0; i < detections.length; i++){
        const mouth = detections[i].parts.mouth;
        const nose = detections[i].parts.nose;
        const leftEye = detections[i].parts.leftEye;
        const rightEye = detections[i].parts.rightEye;
        const rightEyeBrow = detections[i].parts.rightEyeBrow;
        const leftEyeBrow = detections[i].parts.leftEyeBrow;

        drawMouth(mouth);
        // drawPart(mouth, true);
        // drawPart(nose, false);
        drawNose(nose);
        // drawPart(leftEye, true);
        drawEyes(leftEye);
        drawPart(leftEyeBrow, false);
        // drawPart(rightEye, true);
        drawEyes(rightEye);
        drawPart(rightEyeBrow, false);

    }

}

function drawPart(feature, closed){

    beginShape();
    for(let i = 0; i < feature.length; i++){
        const x = feature[i]._x
        const y = feature[i]._y
        vertex(x, y)
    }

    if(closed === true){
        endShape(CLOSE);
    } else {
        endShape();
    }

}

function drawEyes(feature){

    var x
    var y
    for(let i = 0; i < feature.length; i++){
       x = feature[i]._x
       y = feature[i]._y
    }
    image(img, x-70, y-80, img.width / 5, img.height / 5);
    // image(img2, x-80, y-80, img.width / 3, img.height / 3);
}

function drawNose(feature){

    var x
    var y
    for(let i = 0; i < feature.length; i++){
       x = feature[i]._x
       y = feature[i]._y
    }
    image(img2, x-100, y-110, img.width / 5, img.height / 5);
    // image(img2, x-80, y-80, img.width / 3, img.height / 3);
}

function drawMouth(feature){

    var x
    var y
    for(let i = 0; i < feature.length; i++){
       x = feature[i]._x
       y = feature[i]._y
    }
    image(img3, x-70, y-110, img.width / 5, img.height / 5);
    // image(img2, x-80, y-80, img.width / 3, img.height / 3);
}
