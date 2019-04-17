$(document).ready(function() {
  // // Create two variable with the names of the months and days in an array
  // var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]; 
  // var dayNames= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  
  // // Create a newDate() object
  // var newDate = new Date();
  // // Extract the current date from Date object
  // newDate.setDate(newDate.getDate());
  // // Output the day, date, month and year   
  // $('#Date').html(dayNames[newDate.getDay()] + " " + newDate.getDate() + ' ' + monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear());
  
  setInterval( function() {
    // Create a newDate() object and extract the seconds of the current time on the visitor's
    var seconds = new Date().getSeconds();
    // Add a leading zero to seconds value
    $("#sec").html(( seconds < 10 ? "0" : "" ) + seconds);
    },1000);
    
  setInterval( function() {
    // Create a newDate() object and extract the minutes of the current time on the visitor's
    var minutes = new Date().getMinutes();
    // Add a leading zero to the minutes value
    $("#min").html(( minutes < 10 ? "0" : "" ) + minutes);
      },1000);
    
  setInterval( function() {
    // Create a newDate() object and extract the hours of the current time on the visitor's
    var hours = new Date().getHours();
    // Add a leading zero to the hours value
    $("#hours").html(( hours < 10 ? "0" : "" ) + hours);
      }, 1000);	
  });

  var seedInfo = [{
  "trainName": "Hogwarts Express",
  "trainDestination": "Hogwarts",
  "trainTime": "09:00",
  "trainFrequency": "20",
}, {
  "trainName": "Rainbow",
  "trainDestination": "Rainbow Road",
  "trainTime": "08:00",
  "trainFrequency": "10",
},
{
  "trainName": "ChristropherR",
  "trainDestination": "100 Acre Wood",
  "trainTime": "09:30",
  "trainFrequency": "30"
}];

var config = {
    apiKey: "AIzaSyDP9gMSt9dwxl9m17-5-Ggq_SyIw7O-4io",
    authDomain: "trainshomework-c66df.firebaseapp.com",
    databaseURL: "https://trainshomework-c66df.firebaseio.com",
    projectId: "trainshomework-c66df",
    storageBucket: "trainshomework-c66df.appspot.com",
    messagingSenderId: "836267274826"
  };

firebase.initializeApp(config);


var database = firebase.database().ref();
database.remove();
for (var i = 0; i < seedInfo.length; i++){
  let traininfo = {
    name: seedInfo[i].trainName,
    destination: seedInfo[i].trainDestination,
    frequency: seedInfo[i].trainFrequency,
    time: seedInfo[i].trainTime
}
database.push(traininfo);

}

var traininfo = {
  name: trainName,
  destination: trainDestination,
  frequency: trainFrequency,
  time: trainTime
  
};
var trainName = "";
var trainDestination = "";
var trainTime = "HH:mm";
var trainFrequency = 0;

// Capture Button Click
$(".btn").on("click", function(event) {
    event.preventDefault();

    // Grabbed values from text-boxes
    trainName = $("#trainName-input").val().trim();
    //console.log(trainName);
    trainDestination = $("#trainDestination-input").val()
    trainTime = moment($("#firstTrainTime-input").val(), "HH:mm").format('LT');
  
    trainFrequency = $("#trainFrequency-input").val()


    var traininfo = {
      name: trainName,
      destination: trainDestination,
      frequency: trainFrequency,
      time: trainTime
      
    };

    // Code for "Setting values in the database"
    database.push(traininfo);
    
    //console.log(traininfo.name);

    $("#trainName-input").val("");
    $("#trainDestination-input").val("");
    $("#trainFrequency-input").val("");
    $("#firstTrainTime-input").val("");


  });

  //we took the current time and evaluated against the initial train time.
  //if the current time was greater than the train time, we made the train time = train time + frequency.
  //once the current time is less than or equal to train time, subtract the time that the train leaves from the time that it is.  that gives you time remaining.
  
  //current time
  // if CT < TT 
  // then TT = TT + File
  // else if CT >= TT 
  // then TL - CT

  // var currentTime = moment().format('LT');


  database.on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainFrequency = childSnapshot.val().frequency;
    var firstTrainTime = childSnapshot.val().time;
    console.log(trainFrequency, firstTrainTime);

    var firstArrivalConverted = moment(firstTrainTime, "HH:mm").subtract(trainFrequency, "days");
    var diffTime = moment().diff(moment(firstArrivalConverted), "minutes");
    var mintuesAway = diffTime % trainFrequency;
    console.log(mintuesAway);
    var newRow = $("<tr>").append(
      $("<th>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainFrequency),
      $("<td>").text(firstTrainTime),
      $("<td>").text(mintuesAway)
    );
    $(".trains").append(newRow);
  });
  
