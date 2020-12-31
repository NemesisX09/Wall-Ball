var canvas = document.createElement("CANVAS");
document.body.appendChild(canvas);
var ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight - 30;
setInterval(1);
var homepage = true;
var x = getRndInteger(0, window.innerWidth);
var y = getRndInteger(20, window.innerHeight);
var dx = -3;
var dy = 3;
var ball = {
  x: x,
  y: y,
  width: 20,
  height: 20,
}
//helllo
var px = window.innerWidth / 2 - 10;
var py = window.innerHeight / 2 - 10;
var pdx = 0;
var pdy = 0;
var play = {
  x: px,
  y: py,
  width: 40,
  height: 40,
}
var pcolo = "black"
var right = false;
var left = false;
var up = false;
var down = false;
var space = false;
var sp = 0;
var e = 0;
var prx = x;
var pry = y;
var prdx = dx;
var prdy = dy;
var score = localStorage.getItem("thing");
var ballthrow = false;
var ex = window.innerWidth / 2 - 10;
var ey = window.innerHeight / 2 - 10;
var edx = 0;
var edy = 0;
var enem = {
  x: ex,
  y: ey,
  width: 40,
  width: 40,
}
var ecolo = "yellow";
var s = true;
var yew = 0;
var shot = false;
var mouse = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
}
var block = {
  x: window.innerWidth / 2 - 50,
  y: window.innerHeight / 2 - 100,
  width: 100,
  height: 40,
}
function draw() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
  if (score == null) {
    score = "a";
  }
  ctx.fillStyle = "black";
  ctx.fillText(score.length - 1, 10, 30);
  x += dx;
  y += dy;
  px += pdx;
  py += pdy;
  play.x = px;
  play.y = py;
  ball.x = x;
  ball.y = y;
  ex += edx;
  ey += edy;
  enem.x = ex;
  enem.y = ey;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, window.innerWidth, 20);
  ctx.fillRect(enem.x, 30, enem.width, enem.height);
  ctx.fillRect(x, y, 20, 20);
  ctx.fillStyle = pcolo;
  //Player
  ctx.fillRect(px, py, play.width, play.height);
  bounce();
  ctx.fillStyle = ecolo;
  ctx.fillRect(ex, ey, 40, 40);
  if (overlap(play, ball) && space) {
    dx = 0;
    dy = 0;
    x = px + 10;
    y = py + 10;
    ballthrow = true;
  }
  follow(s);
  requestAnimationFrame(draw);
  localStorage.setItem("thing", score);
}
function overlap(actor1, actor2) {
  return actor1.x + actor1.width > actor2.x && actor1.x < actor2.x + actor2.width && actor1.y + actor1.height > actor2.y && actor1.y < actor2.x + actor2.height;
}
function follow(torf) {
  if (overlap(ball, enem)) {
    dx = getRndInteger(-5, 5);
    dy = -10;
    edx = 0;
    edy = 0;
  }
  if (torf) {
    if (ball.x > enem.x) {
      edx = 3;
    } else {
      edx = -3;
    }
    if (ball.y > enem.y) {
      edy = 3;
    } else {
      edy = -3;
    }
  }
}
function home() {
  if (homepage) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.fillStyle = "white";
    ctx.fillRect(window.innerWidth / 2 - 50, window.innerHeight / 2 - 100, 100, 40)
    ctx.fillStyle = "black";
    ctx.fillText("Play", window.innerWidth / 2 - 40, window.innerHeight / 2 - 80)
  }
}
function bounce() {
  if (x < 0) {
    dx *= -1;
    ballthrow = false;
  }
  if (x > window.innerWidth - 20) {
    dx *= -1;
    ballthrow = false
  }
  if (y < 20) {
    dy *= -1
    score += ("a");
  }
  if (y > window.innerHeight - 20) {
    dy *= -1;
    ballthrow = false;
  }
}
function toLeft(a1, a2) {
  return a1.x + a1.width < a2.x;
}
function toRight(a1, a2) {
  return a1.x > a2.x + a2.width;
}
function toUp(a1, a2) {
  return a1.y + a1.height < a2.x;
}
function toDown(a1, a2) {
  return a1.y > a2.y + a2.height;
}
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    pdx = 4;
    right = true;
  }
  else if (e.key == "Left" || e.key == "ArrowLeft") {
    pdx = -4;
    left = true;
  }
  else if (e.key == "Up" || e.key == "ArrowUp") {
    pdy = -4;
    up = true;
  }
  else if (e.key == "Down" || e.key == "ArrowDown") {
    pdy = 4;
    down = true;
  }
  else if (e.keyCode == 32) {
    space = true;
    pcolo = "blue";
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    pdx = 0;
    right = false;
  }
  else if (e.key == "Left" || e.key == "ArrowLeft") {
    pdx = 0;
    left = false;
  }
  else if (e.key == "Up" || e.key == "ArrowUp") {
    pdy = 0;
    up = false;
  }
  else if (e.key == "Down" || e.key == "ArrowDown") {
    pdy = 0;
    down = false;
  }
  else if (e.keyCode == 32) {
    space = false;
    pcolo = "black";
    if (x == px + 10 && y == py + 10 && dx == 0 && dy == 0 && overlap(play, ball)) {
      dx = getRndInteger(-5, 5);
      dy = -5;
    }
  }
}
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
draw();