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
    // frequency = moment($("#trainFrequency-input").val(), "mm");
    trainTime = moment($("#firstTrainTime-input").val(), "HH:mm").format('LT');
    console.log(trainTime);
    var xyz = $("#trainFrequency-input").val()
    console.log(xyz);

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
    $("#trainDesination-input").val("");
    $("#trainFrequency-input").val("");
    $("#firstTrainTime-input").val("");


  });

  database.on("child_added", function(childSnapshot) {
    // console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainFrequency = childSnapshot.val().frequency;
    var firstTrainTime = childSnapshot.val().time;

    var newRow = $("<tr>").append(
      $("<th>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainFrequency),
      $("<td>").text(firstTrainTime)
    );

    $(".trains").append(newRow);
  });
