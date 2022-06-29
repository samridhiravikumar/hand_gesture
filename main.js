var prediction = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });
}
console.log("ml5.Version:", ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/U4xvKeHvo/model.json', modelLoaded);

function modelLoaded() {
    console.log("Model Loaded!");
    speak();
}

function speak() {
    var synth = window.speechSynthesis;
    var speak_data = "Prediction - " + prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        prediction = results[0].label;
        console.log("In gotResults gesturename");
        speak();
        if (results[0].label == "Victory") {
            document.getElementById("result_emoji").innerHTML = "&#9996;";
        }
        else if (results[0].label == "Power to") {
            document.getElementById("result_emoji").innerHTML = "&#9994;";
        }
        else if (results[0].label == "Super") {
            document.getElementById("result_emoji").innerHTML = "&#128076;";
        }
    }
}