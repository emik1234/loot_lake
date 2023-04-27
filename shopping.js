let money = 0;

const price = {
  vimba: 1,
  negis: 1,
  asaris: 2,
  lasis: 3,
  lidaka: 4,
};

const bonusPrice = {
  bread: 1,
  hooks: 1,
  worms: 2,
  graudnieks: 3,
};

const mapPrice = {
  pils: 10,
  saulriets: 7,
  cits_krasts: 4,
};

function allTest() {
  money = 999;
  console.log(money);
}

function sellFish(fish) {
  let data1 = decodeURIComponent(document.cookie.split("=")[1]);
  console.log(data1);
  data = JSON.parse(data1);

  if (data.fishes[fish] > 0) {
    data.fishes[fish] -= 1;
    data.money += price[fish];
    setCookie("myData", data, 365);
  }
}

function buyBonus(bonus) {
  let data1 = decodeURIComponent(document.cookie.split("=")[1]);
  console.log("bonusprice ", bonusPrice[bonus]);
  data = JSON.parse(data1);
  console.log(bonusPrice[bonus]);
  if (data.money >= bonusPrice[bonus]) {
    console.log("BUYING");
    console.log(data.bonus[bonus]);
    data.bonus[bonus] += 1;
    data.money -= bonusPrice[bonus];
    setCookie("myData", data, 365);
  }
}

function buyMap(map) {
  if (money <= mapPrice[map]) {
    let data1 = decodeURIComponent(document.cookie.split("=")[1]);
    console.log(data1);
    data = JSON.parse(data1);

    data.backgrounds[map] = true;
    data.money -= mapPrice[map];
    setCookie("myData", data, 365);
  }
}

let music = new Howl({
  src: ["Assets/Sounds/Shop/Bacground.mp3"],
  html5: true,
  autoplay: true,
  format: ["mp3"],
  volume: 0.04,
  echo: 0.7,
  loop: true,
});
music.play();

function setCookie(name, value, days) {
  var expires = "";

  if (days) {
    var date = new Date();
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
