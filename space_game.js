let KEY_SPACE = false; //32
let KEY_UP = false; //38
let KEY_DOWN = false; // 40
let KEY_P = false; //80
let canvas;
let ctx;
let backgroundimg = new Image();
let number_explosion = 0;
let level;
let recover = false;
let live_score = 000000;
let fso;
let s;

let rocket = {
  x: 50,
  y: 200,
  width: 100,
  height: 50,
  src: "rakete.png",
};

let hearts = [
  {
    x: 10,
    y: 450,
    width: 30,
    height: 30,
    src: "herz.png",
  },
  {
    x: 45,
    y: 450,
    width: 30,
    height: 30,
    src: "herz.png",
  },
  {
    x: 80,
    y: 450,
    width: 30,
    height: 30,
    src: "herz.png",
  },
];

let ufos = [];

document.onkeydown = function (e) {
  console.log(e.keyCode);
  if (e.keyCode == 32) {
    KEY_SPACE = true;
  }

  if (e.keyCode == 38) {
    KEY_UP = true;
  }

  if (e.keyCode == 40) {
    KEY_DOWN = true;
  }

  if (e.keyCode == 80) {
    KEY_P = true;
  }
};

document.onkeyup = function (e) {
  if (e.keyCode == 32) {
    KEY_SPACE = false;
  }

  if (e.keyCode == 38) {
    KEY_UP = false;
  }

  if (e.keyCode == 40) {
    KEY_DOWN = false;
  }

  if (e.keyCode == 80) {
    KEY_P = false;
  }
};

function startApp(lvl) {
  level = lvl;

  clearMenu();

  startGame();
}

function clearMenu() {
  document.getElementById("menu").style.visibility = "hidden";
}

function startGame() {
  if (level == "easy") {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    loadimg();
    setInterval(update, 1000 / 25);
    setInterval(createUfos_easy, 5000);
    setInterval(checkCollisionUfo, 1000 / 25);
    setInterval(checkWall, 2000);
    setInterval(score_display, 500);
    draw();
  } else if ((level = "hard")) {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    loadimg();
    setInterval(update_hard, 1000 / 25);
    setInterval(createUfos_hard, 1000);
    setInterval(checkCollisionUfo, 1000 / 25);
    setInterval(checkWall, 500);
    setInterval(score_display, 500);
    draw();
  }
}

function score_display() {
  document.getElementById("score").style.visibility = "visible";
  document.getElementById("score").innerHTML = parseInt(live_score);
}

function newRound() {
  if (number_explosion == 1) {
    console.log("New Round");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

function checkCollisionUfo() {
  ufos.forEach(function (ufo) {
    if (
      rocket.x + rocket.width > ufo.x &&
      rocket.x < ufo.x + ufo.width &&
      rocket.y < ufo.y + ufo.height &&
      rocket.y + rocket.height > ufo.y
    ) {
      console.log("Ufo Collision!!!");
      ufos = ufos.filter((u) => u != ufo);
      live_score += 50;

      if (recover === false) {
        rocket.img.src = "Explosion.png";
        number_explosion += 1;
        console.log("Hits: " + number_explosion);
        recover = true;
        setTimeout(function () {
          recovery();
        }, 300);
        if (number_explosion >= 3) {
          finish_round();
        } else {
          hearts.length = hearts.length - 1;
        }
      }
    }
  });
}

function recovery() {
  rocket.img.src = "schild.png";
  setTimeout(function () {
    afterCollision();
  }, 3000);
}

function afterCollision() {
  rocket.img.src = "rakete.png";
  recover = false;
}

function checkWall() {
  if (rocket.y > 420 || rocket.y < 0) {
    rocket.img.src = "Explosion.png";
    console.log("Wall Collision!!!");
    hearts.length = hearts.length - 1;
    setTimeout(function () {
      afterCollision();
    }, 300);
  }
}

function finish_round() {
  let ending_score = parseInt(live_score);

  document.getElementById("finish").style.visibility = "visible";
  document.getElementById("endingScore").innerHTML += ending_score;

  setTimeout(function () {
    location.reload();
  }, 5000);
}

//Gute Methode momentan keine Auswirkung auf den Code
function display_menu() {
  document.getElementById("menu").style.visibility = "visible";
}

function ufostart() {
  zufall = Math.floor(Math.random() * 10);
  console.log(zufall);

  if (zufall == 1) {
    return 10;
  } else if (zufall == 2) {
    return 50;
  } else if (zufall == 3) {
    return 100;
  } else if (zufall == 4) {
    return 150;
  } else if (zufall == 5) {
    return 200;
  } else if (zufall == 6) {
    return 250;
  } else if (zufall == 7) {
    return 300;
  } else if (zufall == 8) {
    return 350;
  } else if (zufall == 9) {
    return rocket.x;
  }

  return 400;
}

function createUfos_easy() {
  let ufo = {
    x: 800,
    y: ufostart(),
    width: 100,
    height: 40,
    src: "ufo.png",
    img: new Image(),
  };
  ufo.img.src = ufo.src;
  ufos.push(ufo);
}

function createUfos_hard() {
  let ufo = {
    x: 800,
    y: ufostart(),
    width: 100,
    height: 40,
    src: "ufo.png",
    img: new Image(),
  };
  ufo.img.src = ufo.src;
  ufos.push(ufo);
}

function update() {
  if (KEY_UP) {
    rocket.y -= 4;
  }

  if (KEY_DOWN) {
    rocket.y += 4;
  }

  live_score += 0.1;

  ufos.forEach(function (ufo) {
    ufo.x -= 5;
  });
}

function update_hard() {
  if (KEY_UP) {
    rocket.y -= 7;
  }

  if (KEY_DOWN) {
    rocket.y += 7;
  }

  live_score += 0.3;

  ufos.forEach(function (ufo) {
    ufo.x -= 10;
  });
}

function loadimg() {
  backgroundimg.src = "hintergrund.png";

  rocket.img = new Image();
  rocket.img.src = rocket.src;

  hearts.forEach(function (heart) {
    heart.img = new Image();
    heart.img.src = heart.src;
  });
}

function addScore(score) {}

("D:ProgrammierenYoutubeWebsiteSpace_Game");

function draw() {
  ctx.drawImage(backgroundimg, 0, 0);
  ctx.drawImage(rocket.img, rocket.x, rocket.y, rocket.width, rocket.height);

  hearts.forEach(function (heart) {
    ctx.drawImage(heart.img, heart.x, heart.y, heart.width, heart.height);
  });

  ufos.forEach(function (ufo) {
    ctx.drawImage(ufo.img, ufo.x, ufo.y, ufo.width, ufo.height);
  });

  requestAnimationFrame(draw);
}
