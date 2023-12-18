window.addEventListener("resize", resizeCanvas, false);
window.addEventListener("DOMContentLoaded", onLoad, false);

window.requestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };

var canvas,
  ctx,
  w,
  h,
  particles = [],
  probability = 0.04,
  xPoint,
  yPoint;

function onLoad() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  resizeCanvas();

  window.requestAnimationFrame(updateWorld);
}

function resizeCanvas() {
  if (!!canvas) {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
}

function updateWorld() {
  update();
  paint();
  window.requestAnimationFrame(updateWorld);
}

function update() {
  if (particles.length < 500 && Math.random() < probability) {
    createFirework();
  }
  var alive = [];
  for (var i = 0; i < particles.length; i++) {
    if (particles[i].move()) {
      alive.push(particles[i]);
    }
  }
  particles = alive;
}

function paint() {
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0, 0, w, h);
  ctx.globalCompositeOperation = "lighter";
  for (var i = 0; i < particles.length; i++) {
    particles[i].draw(ctx);
  }
}

function createFirework() {
  xPoint = Math.random() * (w - 200) + 100;
  yPoint = Math.random() * (h - 200) + 100;
  var nFire = Math.random() * 50 + 100;
  var c =
    "rgb(" +
    ~~(Math.random() * 200 + 55) +
    "," +
    ~~(Math.random() * 200 + 55) +
    "," +
    ~~(Math.random() * 200 + 55) +
    ")";
  for (var i = 0; i < nFire; i++) {
    var particle = new Particle();
    particle.color = c;
    var vy = Math.sqrt(25 - particle.vx * particle.vx);
    if (Math.abs(particle.vy) > vy) {
      particle.vy = particle.vy > 0 ? vy : -vy;
    }
    particles.push(particle);
  }
}

function Particle() {
  this.w = this.h = Math.random() * 4 + 1;

  this.x = xPoint - this.w / 2;
  this.y = yPoint - this.h / 2;

  this.vx = (Math.random() - 0.5) * 10;
  this.vy = (Math.random() - 0.5) * 10;

  this.alpha = Math.random() * 0.5 + 0.5;

  this.color;
}

Particle.prototype = {
  gravity: 0.05,
  move: function () {
    this.x += this.vx;
    this.vy += this.gravity;
    this.y += this.vy;
    this.alpha -= 0.01;
    if (
      this.x <= -this.w ||
      this.x >= screen.width ||
      this.y >= screen.height ||
      this.alpha <= 0
    ) {
      return false;
    }
    return true;
  },
  draw: function (c) {
    c.save();
    c.beginPath();

    c.translate(this.x + this.w / 2, this.y + this.h / 2);
    c.arc(0, 0, this.w, 0, Math.PI * 2);
    c.fillStyle = this.color;
    c.globalAlpha = this.alpha;

    c.closePath();
    c.fill();
    c.restore();
  },
};

const questions = [
  {
    que: "MOST RUNS IN ICC FINALS",
    answers: [
      { text: "sachin", correct: "false" },
      { text: "abd", correct: "false" },
      { text: "virat", correct: "true" },
      { text: "ricky ponting", correct: "false" },
    ],
  },
  {
    que: "MOST TIMES PTTM IN ICC EVENTS",
    answers: [
      { text: "sachin", correct: "false" },
      { text: "abd", correct: "false" },

      { text: "kallis", correct: "false" },
      { text: "virat", correct: "true" },
    ],
  },
  {
    que: "WHO IS GOAT",
    answers: [
      { text: "sachin", correct: "false" },
      { text: "virat", correct: "true" },
      { text: "abd", correct: "false" },

      { text: "kallis", correct: "false" },
    ],
  },
];

const quest = document.querySelector(".quest");
const ans = document.querySelector(".ans-buttons");
const next = document.querySelector(".next");
let sh = document.querySelector(".main");
let can = document.querySelector("canvas");

let index = 0;
let point = 0;
let stud = "VIRAT KOHLI 👑 is GOAT❤️";
function startquiz() {
  index = 0;
  point = 0;
  showquest();
}
function showquest() {
  reset();
  let qstn = questions[index];
  let questno = index + 1;
  quest.innerHTML = questno + ": " + qstn.que;

  qstn.answers.forEach((anse) => {
    let but = document.createElement("button");
    but.innerHTML = anse.text;
    but.classList.add("btn");
    ans.appendChild(but);
    but.dataset.text = anse.correct;
    but.addEventListener("click", function (dets) {
      //console.log(ans.childNodes);
      if (dets.target.dataset.text === "true") {
        dets.target.classList.add("gren");
        dets.target.classList.remove(".btn:hover");
        point += 5;
        if (index === 2) {
          console.log(index);
          
        }

        //next.classList.remove("hide");
      } else {
        dets.target.classList.add("red");
      }

      //making answer visible and disable click
      ans.childNodes.forEach((child) => {
        if (child.dataset.text === "true") {
          child.classList.add("gren");
        }
        child.disabled = true;
      });

      next.style.display = "block";
    });
  });
}

function reset() {
  next.style.display = "none";
  //index = 0;
  while (ans.firstChild) {
    ans.removeChild(ans.firstChild);
  }
}
next.addEventListener("click", function () {
  can.style.display = "none";
  sh.style.opacity = "0.9";
  //console.log(point);
  if (index < 2) {
    index++;
    showquest();
  } else {
    reset();

    can.style.display = "block";
    sh.style.opacity = "0.6";
    // show();

    quest.innerHTML = `Your Score is:${point} out of ${ questions.length * 5}..${stud}! `;

    next.textContent = "Play Again"; //here inner html overides text in next button so use textcontent
    next.style.display = "block";
    index = -1;
    point = 0;
    //startquiz();
  }
  //console.log(index);
});
startquiz();
