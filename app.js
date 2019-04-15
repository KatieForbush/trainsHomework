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
    console.log(trainTime);
    frequency = moment($("#trainFrequency-input").val(), "mm");

    var traininfo = {
      name: trainName,
      destination: trainDestination,
      time: trainTime,
      frequency: trainFrequency
    };

    // Code for "Setting values in the database"
    database.push(traininfo);
    
    console.log(traininfo.name);

    $("#trainName-input").val("");
    $("#trainDesination-input").val("");
    $("#trainTime-input").val("");
    $("#trainFrequency-input").val("");

  });

  database.on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;

    var newRow = $("<tr>").append(
      $("<th>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainTime),
      $("<td>").text(trainFrequency)
    );

    $(".trains").append(newRow);
  });
