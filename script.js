let floater = new Image(100, 200);

let floaterX = 260;
let floaterY = 180;
let greenLength = 100;
let lineWidth = 0;
let maxLength = 100;

let fishCount = 0;
let currentHour = 0;

let keyup = true;
let radio = false;
let fishCaught = false;
let newThrow = true;
let caughtPlayed = false;

let nameEntered = false;

const activeBonus = {
  hooks: false,
  bread: false,
  worms: false,
  graudnieks: false,
};

let cookies = document.cookie.split(";");
let myCookie = cookies.find((cookie) => cookie.includes("myData="));
let data = myCookie
  ? JSON.parse(decodeURIComponent(myCookie.split("=")[1]))
  : {
      name: "",
      sound: true,
      currentMap: "main",
      money: 0,
      bonus: {
        hooks: 3,
        bread: 2,
        worms: 2,
        graudnieks: 0,
      },
      fishes: {
        asaris: 0,
        lidaka: 0,
        vimba: 0,
        negis: 0,
        lasis: 0,
      },
      backgrounds: {
        main: true,
        pils: false,
        saulriets: false,
        cits_krasts: false,
      },
    };

if (data.name == "") {
  document.getElementById("nameInput").style.opacity = 1;
} else {
  namePosition.innerHTML = `Hello, ${data.name}`;
}

function showName() {
  let name = document.getElementById("yourName").value;
  document.getElementById("nameInput").style.opacity = 0;
  data.name = name;
  namePosition.innerHTML = `Hello, ${name}`;
  setCookie("myData", data, 365);
}

document.getElementById("hookCount").innerHTML = data.bonus.hooks;
document.getElementById("breadCount").innerHTML = data.bonus.bread;
document.getElementById("wormsCount").innerHTML = data.bonus.worms;
document.getElementById("degvinsCount").innerHTML = data.bonus.graudnieks;

document.getElementById(
  "bg"
).style.backgroundImage = `url(Assets/Images/Lake/${data.currentMap}.jpg)`;

checkIfZero();

if (data.name == "") {
}

function checkIfZero() {
  let items = document.querySelectorAll(".inv-item");

  items.forEach((element) => {
    let id = element.id;

    if (data.bonus[id] < 1) {
      element.style.opacity = "0.4";
    }
  });
}

function onIframeLoad(iframe) {
  if (data.sound) {
    iframe.contentWindow.postMessage(
      '{"event":"command","func":"setVolume","args":[25]}',
      "*"
    );
  } else {
    iframe.contentWindow.postMessage(
      '{"event":"command","func":"setVolume","args":[0]}',
      "*"
    );
  }
}

const ct = document.getElementById("stringCanvas");
const ctx = ct.getContext("2d");

const ct2 = document.getElementById("rectCanva");
const ctx2 = ct2.getContext("2d");

function drawString() {
  ctx.beginPath();

  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 2;
  ctx.moveTo(500, 10);
  ctx.lineTo(floaterX, floaterY - 20);
  ctx.stroke();

  floater.onload = function () {
    ctx.drawImage(floater, floaterX - 50, floaterY - 30, 100, 100);
  };

  floater.src = "Assets/Images/Lake/plunds.png";
  fishChances();
}

function rotate() {
  newThrow = false;
  let r = document.getElementById("rod");
  r.style.transition = "all 1s ease";
  r.style.transform = "rotate(30deg)";

  setTimeout(() => {
    r.style.transition = "all 0.2s ease";
    if (data.sound) {
      throwSound.play();
    }

    r.style.transform = "rotate(0deg)";

    setTimeout(() => {
      drawString();
    }, 200);
  }, 2000);
}

let throwSound = new Howl({
  src: ["Assets/Sounds/Lake/air_whoosh.mp3"],
  html5: true,
  format: ["mp3"],
  volume: 0.3,
  loop: false,
});

document.addEventListener("keydown", (event) => {
  if (newThrow && data.name != "") {
    if (event.keyCode == 32 && activeBonus.hooks == true) {
      if (activeBonus.worms == true || activeBonus.bread == true) {
        fishCount = 0;
        floaterX = 260;
        floaterY = 180;

        caughtPlayed = false;

        document.getElementById("wormsChecked").style.visibility = "hidden";
        document.getElementById("breadChecked").style.visibility = "hidden";
        document.getElementById("hooksChecked").style.visibility = "hidden";
        document.getElementById("graudnieksChecked").style.visibility =
          "hidden";

        ctx.clearRect(0, 0, ct.width, ct.height);

        rotate();
      } else {
        showError(
          "You must have a hook and some bait (bread or worms) equipped!"
        );
      }
    } else {
      showError(
        "You must have a hook and some bait (bread or worms) equipped!"
      );
    }
  }
});

function showError(text) {
  document.getElementById("mustChoose").textContent = text;
  document.getElementById("mustChoose").style.opacity = 1;
  setTimeout(() => {
    document.getElementById("mustChoose").style.opacity = 0;
  }, 3000);
}

let sinkSound = new Howl({
  src: ["Assets/Sounds/Lake/Splash.mp3"],
  html5: true,
  format: ["mp3"],
  volume: 0.5,
  loop: false,
});

function catchFish() {
  fishCaught = true;
  ctx.clearRect(0, 0, ct.width, ct.height);
  ctx.beginPath();
  ctx.drawImage(floater, floaterX - 50, floaterY - 30, 100, 100);

  floaterY += 1;

  ctx.moveTo(500, 10);
  ctx.lineTo(floaterX, floaterY - 20);
  ctx.stroke();

  if (floaterY <= 202) {
    requestAnimationFrame(catchFish);
  } else {
    slider();
    ctx2.fillStyle = "#7CFC00";
    ctx2.fillRect(0, 0, greenLength, ct2.height);
    greenLength = 100;
  }
  if (data.sound && !caughtPlayed) {
    sinkSound.play();
    caughtPlayed = true;
  }
}

async function slider() {
  ctx2.fillStyle = "#7CFC00";
  let t = 0;
  let finshReel = new Howl({
    src: ["Assets/Sounds/Lake/finishReelSound.mp3"],
    html5: true,
    format: ["mp3"],
  });

  let rizz = new Howl({
    src: ["Assets/Sounds/Lake/rizz.mp3"],
    html5: true,
    format: ["mp3"],
  });

  let s = setInterval(function () {
    greenLength--;
    ctx2.clearRect(0, 0, ct2.width, ct2.height);
    ctx2.fillRect(0, 0, greenLength, ct2.height);

    if (greenLength >= 300) {
      if (data.sound) {
        finshReel.play();
        rizz.play();
      }

      fishCaught = false;

      clearInterval(timer);
      clearInterval(s);
      congrats();
    }

    if (greenLength <= 0) {
      clearInterval(s);
      clearInterval(timer);

      stealFish();
    }

    if (t >= 2) {
      if (greenLength <= 130) {
        clearInterval(s);
        clearInterval(timer);

        stealFish();
      }
    }
  }, 25);

  let timer = setInterval(() => {
    t++;
  }, 1000);
}

function determineFish() {
  let rand = Math.floor(Math.random() * 100);
  let fish = "";
  if (rand <= 9) {
    fish = "lidaka";
  } else if (rand >= 10 && rand <= 24) {
    fish = "lasis";
  } else if (rand >= 25 && rand <= 44) {
    fish = "asaris";
  } else if (rand >= 45 && rand <= 69) {
    fish = "negis";
  } else {
    fish = "vimba";
  }

  return fish;
}

for (let key in data.fishes) {
  fishCount += data.fishes[key];
  document.getElementById("fishAmount").innerHTML = fishCount + "/10";
}

function congrats() {
  let fish = determineFish();

  ctx.clearRect(0, 0, ct.width, ct.height);
  document.getElementById("congratsBG").style.visibility = "visible";
  document.getElementById(fish).style.visibility = "visible";

  setTimeout(() => {
    document.getElementById("congratsBG").style.visibility = "hidden";
    document.getElementById(fish).style.visibility = "hidden";
    ctx2.clearRect(0, 0, ct2.width, ct2.height);
    newThrow = true;
  }, 3000);

  for (let key in data.fishes) {
    fishCount += data.fishes[key];
  }

  if (fishCount < 10) {
    data.fishes[fish]++;
  }

  subtract();
}

function subtract() {
  if (activeBonus.worms) {
    data.bonus.worms -= 1;
  } else {
    data.bonus.bread -= 1;
  }

  if (activeBonus.graudnieks) {
    data.bonus.graudnieks -= 1;
  }
  checkIfZero();
  setCookie("myData", data, 365);

  document.getElementById("hookCount").innerHTML = data.bonus.hooks;
  document.getElementById("breadCount").innerHTML = data.bonus.bread;
  document.getElementById("wormsCount").innerHTML = data.bonus.worms;
  document.getElementById("degvinsCount").innerHTML = data.bonus.graudnieks;
  document.getElementById("fishAmount").innerHTML = fishCount + "/10";

  activeBonus.bread = false;
  activeBonus.worms = false;
  activeBonus.graudnieks = false;
}

function stealFish() {
  showError("The fishe escape with da hooke");
  subtract();
  ctx.clearRect(0, 0, ct.width, ct.height);
  ctx2.clearRect(0, 0, ct2.width, ct2.height);
  data.bonus.hooks -= 1;
  setTimeout(() => {
    newThrow = true;
  }, 1000);

  fishCaught = false;
}

let reel = new Howl({
  src: ["Assets/Sounds/Lake/reelingSound.mp3"],
  html5: true,
  volume: 0.6,
  format: ["mp3"],
});
document.addEventListener("keydown", (event) => {
  if (fishCaught && keyup) {
    if (event.keyCode == 32) {
      keyup = false;
      if (data.sound) reel.play();
      greenLength += 20;
      drawRect();
    }
  }
});

document.addEventListener("keyup", (event) => {
  if (fishCaught) {
    if (event.keyCode == 32) {
      keyup = true;
    }
  }
});

function drawRect() {
  ctx2.fillStyle = "#7CFC00";
  ctx2.fillRect(0, 0, greenLength, ct2.height);
}

function fishChances() {
  let interval = 50;
  setTimeout(() => {
    let random = Math.floor(Math.random() * 100) + 1;

    if (activeBonus.worms) {
      interval -= 10;
    }

    if (activeBonus.graudnieks) {
      interval -= 15;
    }

    if (currentHour >= 5 && currentHour < 12) {
      interval -= 25;
    } else if (currentHour >= 19 && currentHour <= 24) {
      interval -= 25;
    }

    if (random >= interval) {
      catchFish();
    } else {
      fishChances();
    }
  }, 10000);
}

let acceptSound = new Howl({
  src: ["Assets/Sounds/Global/acceptSound.mp3"],
  html5: true,
  format: ["mp3"],
  volume: 1,
  loop: false,
});

function selectBonus(id) {
  if (activeBonus[id] == false && data.bonus[id] > 0) {
    if (id == "worms") {
      if (activeBonus.bread == true) {
        if (data.sound) acceptSound.play();
        return;
      }
    }
    if (id == "bread") {
      if (activeBonus.worms == true) {
        if (data.sound) acceptSound.play();
        return;
      }
    }
    document.getElementById(id + "Checked").style.visibility = "visible";
    activeBonus[id] = true;
  } else if (activeBonus[id] == true) {
    document.getElementById(id + "Checked").style.visibility = "hidden";
    activeBonus[id] = false;
  }
}

function setCookie(name, value, days) {
  var expires = "";

  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }

  document.cookie =
    name +
    "=" +
    encodeURIComponent(JSON.stringify(value)) +
    expires +
    "; path=/";
}

function irlTime() {
  let extraHour;
  let extraMinute;
  let hour = new Date();
  let min = new Date();
  currentHour = hour.getHours();
  currentMinute = min.getMinutes();
  if (currentMinute <= 9) {
    extraMinute = "0" + currentMinute;
  } else {
    extraMinute = currentMinute;
  }
  if (currentHour <= 9) {
    extraHour = "0" + currentHour;
  } else {
    extraHour = currentHour;
  }
  document.getElementById("timeOutput").innerHTML =
    extraHour + " : " + extraMinute;
}
setInterval(irlTime, 1000);

// ---------------------------

let loaded = false;

let sound = new Howl({
  src: ["http://195.13.253.51:8000/128_mp3"],
  html5: true,
  format: ["mp3"],
  volume: 0.3,

  onload: function () {
    loaded = true;
  },

  onplay: function () {
    stopStatic();
  },
});

let static = new Howl({
  src: ["Assets/Sounds/Lake/static.mp3"],
  html5: true,
  volume: 0.6,
  format: ["mp3"],
});

function playRadio() {
  if (radio) {
    sound.pause();
    radio = false;

    document.getElementById("radioLed").style.visibility = "hidden";
    static.play();
    setTimeout(function () {
      static.stop();
    }, 1000);
  } else {
    sound.play();
    radio = true;

    if (loaded == false) static.play();
    document.getElementById("radioLed").style.visibility = "visible";
  }
}

function stopStatic() {
  static.stop();
}
