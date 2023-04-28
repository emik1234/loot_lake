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

let purches_sell = new Howl({
  src: ["Assets/Sounds/Shop/purches.mp3"],
  html5: true,
  format: ["mp3"],
  volume: 1,
  loop: false,
});

function sellFish(fish) {
  purches_sell.play();
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
  purches_sell.play();
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
  purches_sell.play();
  if (money >= mapPrice[map]) {
    let data1 = decodeURIComponent(document.cookie.split("=")[1]);
    console.log(data1);
    data = JSON.parse(data1);

    data.backgrounds[map] = true;
    data.money -= mapPrice[map];
    setCookie("myData", data, 365);
  }
}

function displayCount() {
  let data1 = decodeURIComponent(document.cookie.split("=")[1]);
  data = JSON.parse(data1);

  let items = document.getElementsByClassName("item-count");

  for (let i = 0; i < items.length; i++) {
    let id = items[i].id;
    console.log(id);
    let asset = items[i].getAttribute("asset");

    items[i].innerHTML = data[id][asset];
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

function displayMoney() {
  let data1 = decodeURIComponent(document.cookie.split("=")[1]);
  data = JSON.parse(data1);
  console.log(data.money);

  document.getElementById("moneyCount").innerHTML = `Money: ${data.money}`;
}

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

  displayMoney();
  displayCount();
}
displayCount();
displayMoney();
