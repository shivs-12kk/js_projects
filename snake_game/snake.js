let direc = { x: 0, y: 0 };

const foodsound = new Audio("food.mp3");
const oversound = new Audio("gameover.mp3");
const movesound = new Audio("move.mp3");
const musicsound = new Audio("music.mp3");
const board = document.querySelector(".cont");
let period = 10;
let lasttime = 0;
let hasEaten = false;

console.log(board);

let snakear = [{ x: 13, y: 15 }];
let food = { x: 10, y: 10 };

//game function

function iscollide(k) {
  for (let i = 1; i < snakear.length; i++) {
    if (snakear[0].x === snakear[i].x && snakear[0].y === snakear[i].y) {
      return true;
    }
  }

  if (
    snakear[0].x >= 28 ||
    snakear[0].x < 0 ||
    snakear[0].y >= 28 ||
    snakear[0].y < 0
  ) {
    return true;
  }

  return false;
}
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lasttime) / 1000 < 1 / period)
   return;
  lasttime = ctime;
   musicsound.play();
  gamengine();
}
function gamengine() {
  //update snake position
  if (iscollide(snakear)) {
    movesound.pause();
    oversound.play();
    direc = { x: 0, y: 0 };
    // alert("Game Over. Press any key to play again!");
    snakear = [{ x: 13, y: 15 }];
    score = 0;
    period = 10;
  }
  // if snake eat the fruit
  if (snakear[0].y === food.y && snakear[0].x === food.x) {
    foodsound.play();
    let a = 2;
    let b = 16;
    snakear.unshift({ x: snakear[0].x + direc.x, y: snakear[0].y + direc.y });
    food = {
      x: Math.floor(Math.random() * (b - a + 1)) + a,
      y: Math.floor(Math.random() * (b - a + 1)) + a,
    };
    period+=1;
    hasEaten = true;

  }
  // Moving the snake
  for (let i = snakear.length - 2; i >= 0; i--) {
    snakear[i + 1] = { ...snakear[i] };
  }

  snakear[0].x += direc.x;
  snakear[0].y += direc.y;

  //display snake
  board.innerHTML = "";
  snakear.forEach((ele, index) => {
    var ele2 = document.createElement("div");
    ele2.style.gridRowStart = ele.y;
    ele2.style.gridColumnStart = ele.x;
    if (index === 0) 
    {
        ele2.classList.add("head");
        if (hasEaten) {
            ele2.classList.add("grow");
            hasEaten = false;
          }
    }
    else ele2.classList.add("snk");

    board.append(ele2);
  });

  //display food
  var ele3 = document.createElement("div");
  ele3.style.gridRowStart = food.y;
  ele3.style.gridColumnStart = food.x;
  ele3.classList.add("food");
  board.append(ele3);
}

//main logic
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  direc = { x: 0, y: 1 };
  movesound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("as");
      direc.x = 0;
      direc.y = -1;
      break;
    case "ArrowDown":
      console.log("as");
      direc.x = 0;
      direc.y = 1;
      break;
    case "ArrowRight":
      console.log("a");
      direc.x = 1;
      direc.y = 0;
      break;
    case "ArrowLeft":
      console.log("as");
      direc.x = -1;
      direc.y = 0;
      break;
    default:
      break;
  }
});
