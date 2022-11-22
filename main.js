var sound = "";
scoreleftwrist = 0;
scorerightwrist = 0;

function preload() {
    music = loadSound("music.mp3")

}
function play() {
    music.play();
    music.setVolume(1);
    music.rate(2)
}

function setup() {
    canvas = createCanvas(500, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelloaded);
    poseNet.on("pose", gotposes)
}

function modelloaded() {
    console.log("posenet is inisialised")
}


function draw() {
    image(video, 0, 0, 500, 500);
    fill("purple");
    if (scoreleftwrist > 0.2) {
        circle(lrx, lry, 20);
        NumberleftWristy = Number(lry)
        removedecimal = floor(NumberleftWristy);
        console.log(removedecimal);
        volume = removedecimal / 500;
        document.getElementById("volume").innerHTML = "volume" + volume;
        music.setVolume(volume);
    }
    if (scorerightwrist > 0.2) {
        circle(rrx, rry, 20);
        if (rry>0 && rry<100 ){
            music.rate(0.5);
            document.getElementById("speed").innerHTML="speed: 0.5x"
        }
        if (rry>100 && rry<200 ){
            music.rate(1);
            document.getElementById("speed").innerHTML="speed: 1x"
        }
        if (rry>200 && rry<300 ){
            music.rate(1.5);
            document.getElementById("speed").innerHTML="speed: 1.5x"
        }
        if (rry>300 && rry<400 ){
            music.rate(2);
            document.getElementById("speed").innerHTML="speed: 2x"
        }
        if (rry>400 && rry<500 ){
            music.rate(2.5);
            document.getElementById("speed").innerHTML="speed: 2.5x"
        }

        
}


}

function gotposes(results) {
    console.log(results)
    if (results.length > 0) {
        scoreleftwrist = results[0].pose.keypoints[9].score;
        scorerightwrist = results[0].pose.keypoints[10].score;
        lrx = results[0].pose.leftWrist.x;
        lry = results[0].pose.leftWrist.y;
        rrx = results[0].pose.rightWrist.x;
        rry = results[0].pose.rightWrist.y;
        console.log("leftwristx=" + lrx + " leftWristy=" + lry)

    }

}
var lrx = ""
var lry = ""
var rrx = ""
var rry = ""