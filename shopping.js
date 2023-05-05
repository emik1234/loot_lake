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

let data1 = decodeURIComponent(document.cookie.split("=")[1]);
data = JSON.parse(data1);

checkMaps();

let purches_sell = new Howl({
  src: ["Assets/Sounds/Shop/purches.mp3"],
  html5: true,
  format: ["mp3"],
  volume: 1,
  loop: false,
});

function sellFish(fish) {
  let data1 = decodeURIComponent(document.cookie.split("=")[1]);

  data = JSON.parse(data1);

  if (data.fishes[fish] > 0) {
    if (data.sound) purches_sell.play();
    data.fishes[fish] -= 1;
    data.money += price[fish];
    setCookie("myData", data, 365);
  }
}

function buyBonus(bonus) {
  let data1 = decodeURIComponent(document.cookie.split("=")[1]);

  data = JSON.parse(data1);
  if (data.money >= bonusPrice[bonus]) {
    if (data.sound) purches_sell.play();

    data.bonus[bonus] += 1;
    data.money -= bonusPrice[bonus];
    setCookie("myData", data, 365);
  }
}

function buyMap(map) {
  if (data.money >= mapPrice[map]) {
    if (data.backgrounds[map] == false) {
      if (data.sound) purches_sell.play();
      let data1 = decodeURIComponent(document.cookie.split("=")[1]);

      data = JSON.parse(data1);

      data.backgrounds[map] = true;
      data.money -= mapPrice[map];
      setCookie("myData", data, 365);
    }
  }
}

function displayCount() {
  let data1 = decodeURIComponent(document.cookie.split("=")[1]);
  data = JSON.parse(data1);

  let items = document.getElementsByClassName("item-count");

  for (let i = 0; i < items.length; i++) {
    let id = items[i].id;

    let asset = items[i].getAttribute("asset");

    items[i].innerHTML = data[id][asset];
  }
}

let music = new Howl({
  src: ["Assets/Sounds/Shop/Bacground.mp3"],
  html5: true,
  autoplay: false,
  format: ["mp3"],
  volume: 0.04,
  echo: 0.7,
  loop: true,
});
if (data.sound) {
  music.play();
}

function displayMoney() {
  let data1 = decodeURIComponent(document.cookie.split("=")[1]);
  data = JSON.parse(data1);

  document.getElementById("moneyCount").innerHTML = `Money: ${data.money}`;
}

function checkMaps() {
  for (let i in mapPrice) {
    if (data.backgrounds[i] == true) {
      document.getElementById(`${i}1`).style.opacity = 1;
    } else {
      document.getElementById(`${i}1`).style.opacity = 0.5;
    }
  }
}

function setCookie(name, value, days) {
  checkMaps();
  let expires = "";

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

  displayMoney();
  displayCount();
}
displayCount();
displayMoney();
