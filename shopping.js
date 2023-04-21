let money = 0;

const asaris = new Object();
const lidaka = new Object();
const lasis = new Object();

function setUp(obj, price, rarity, img) {
  obj.price = price;
  obj.rarity = rarity;
}

setUp(asaris, 1.5, 0);
setUp(lidaka, 2, 0);
setUp(lasis, 3, 0);
console.log(lasis);
