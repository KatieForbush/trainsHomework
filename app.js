var config = {
    apiKey: "AIzaSyDP9gMSt9dwxl9m17-5-Ggq_SyIw7O-4io",
    authDomain: "trainshomework-c66df.firebaseapp.com",
    databaseURL: "https://trainshomework-c66df.firebaseio.com",
    projectId: "trainshomework-c66df",
    storageBucket: "trainshomework-c66df.appspot.com",
    messagingSenderId: "836267274826"
  };

firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var trainDestination = "";
var trainTime = 0;
var frequency = 0;

// Capture Button Click
$("#button").on("click", function(event) {
    event.preventDefault();

    // Grabbed values from text-boxes
    trainName = $("#trainName-input").val().trim();
    trainDestination = $("#trainDestination-input").val().trim();
    trainTime = $("trainTime-input").val().trim();
    frequency = $("#trainFrequency-input").val().trim();

    // Code for "Setting values in the database"
    database.ref().set({
      Name: trainNAme,
      Destination: trainDestination,
      Time: trainTime,
      Frequencey: frequency,
    });

  });
  