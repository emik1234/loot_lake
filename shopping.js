let money = 0;

// const asaris = new Object();
// const lidaka = new Object();
// const lasis = new Object();

function allTest() {
  money = 999;
  console.log(money);
}

let music = new Howl({
  src: ["Assets/Sounds/Shop/Bacground.mp3"],
  html5: true,
  autoplay: true,
  format: ["mp3"],
  volume: 0.7,
  loop: true,
});
music.play();

// function setUp(obj, price, rarity, img) {
//   obj.price = price;
//   obj.rarity = rarity;
// }

// setUp(asaris, 1.5, 0);
// setUp(lidaka, 2, 0);
// setUp(lasis, 3, 0);
// console.log(lasis);
