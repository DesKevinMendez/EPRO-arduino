var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , five = require("johnny-five"),
  board,servo,led,sensor;

var board = new five.Board();

board.on("ready", function() {


  // init a led on pin 13, strobe every 1000ms
  led = new five.Led(13).strobe(1000);

  servo = new five.Servo.Continuous({
      pin: 10,
      center:true,
      range: [0, 180]
    });

    });

// make web server listen on port 80
app.listen(80);


// handle web server
function handler (req, res) {
  console.log(req);
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}


// on a socket connection

// on a socket connection
io.sockets.on('connection', function (socket) {
  // if servo message received
  socket.on('servo', function (data) {
    console.log(data);
    if(board.isReady){ servo.to(data.pos);  }
  });
  // if led message received
  socket.on('led', function (data) {
    console.log(data);
     if(board.isReady){    led.strobe(data.delay); }
  });

});