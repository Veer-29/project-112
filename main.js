prediction_1 = ""
prediction_2 = ""

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera=document.getElementById("camera")

Webcam.attach(camera)

function Take_snapshot(){
    Webcam.snap(function(data_uri){
     document.getElementById("result").innerHTML='<img id="captured" src="'+data_uri+'">'   
    })
}

console.log("ml5 version:",ml5.version)

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/46N4PV5_F/model.json',modelLoaded)

function modelLoaded(){
    console.log("modelLoaded")
}

function speak(){
    synth=window.speechSynthesis
    speak_data="the first prediction is"+prediction_1;
    speak_data1="the second prediction is"+prediction_2;
    utter_this=new SpeechSynthesisUtterance(speak_data+speak_data1)
    synth.speak(utter_this)
}
  
  function check() {
    img = document.getElementById("captured");
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if(results[0].label == "Victory")
        {
            document.getElementById("update_emoji").innerHTML = "&#128077;"
        }
        if(results[0].label == "Best") {
            document.getElementById("update_emoji").innerHTML = "&#128076;"
        }
        if(results[0].label == "Amazing") {
            document.getElementById("update_emoji").innerHTML = "&#9996;"           
        }
        if(results[1].label == "Victory") {
            document.getElementById("update_emoji2").innerHTML = "&#128077;"        
        }
        if(results[1].label == "Best") {
            document.getElementById("update_emoji2").innerHTML = "&#128076;"     
        }
        if(results[1].label == "Amazing") {
             document.getElementById("update_emoji2").innerHTML = "&#9996;"     
        }
    }
}