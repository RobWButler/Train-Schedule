var name = "";
var dest = "";
var firstTime = "";
var freq = 0;
var tMinutesTillTrain = 0;
 
 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBcPe7CFxyh1lzGfKQiZ8ilY79x14qXEcQ",
    authDomain: "gtsav2019.firebaseapp.com",
    databaseURL: "https://gtsav2019.firebaseio.com",
    projectId: "gtsav2019",
    storageBucket: "gtsav2019.appspot.com",
    messagingSenderId: "1022037644586"
  };

firebase.initializeApp(config);


var database = firebase.database()

database.ref().on("child_added", function(childSnapshot) {


    name = childSnapshot.val().name
    dest = childSnapshot.val().dest
    firstTime = childSnapshot.val().firstTime
    freq = childSnapshot.val().freq

    var firstTimeConverted = moment(firstTime, "HH:mm");
    
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    var tRemainder = parseInt(diffTime % freq);

    var tMinutesTillTrain = freq - tRemainder;
  
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");


    var t = $("<tr>")
    var nt = $("<td>")
    var dt = $("<td>")
    var ft = $("<td>")
    var tt = $("<td>")
    var mt = $("<td>")

    nt.text(name)
    dt.text(dest)
    ft.text(freq)
    tt.text(moment(nextTrain).format("HH:mm"));
    mt.text(tMinutesTillTrain)


    t.append(nt)
    t.append(dt)
    t.append(ft)
    t.append(tt)
    t.append(mt)

    $("trains").empty()

    $("#trains").append(t)

  

}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});

$("#addtrain").on("click", function(){
    event.preventDefault();

    name = $("#name-input").val().trim()
    dest = $("#dest-input").val().trim()
    firstTime = $("#firstTrain").val()
    freq = $("#freq-input").val().trim()

    $(".form-control").val("")
    
    database.ref().push({
      name: name,
      dest: dest,
      firstTime: firstTime,
      freq: freq,
    });
  })

  