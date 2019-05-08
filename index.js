var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  var led = new five.Led(13);
  led.blink(1000);
});

board.on('error', function(err){
    console.log(err)
});