let floater = new Image(100, 200);

let floaterX = 0;
let floaterY = 400;

const ct = document.getElementById("stringCanvas");
const ctx = ct.getContext("2d");

function drawString() {
  ctx.beginPath();
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 2;
  ctx.moveTo(490, 40);
  ctx.lineTo(floaterX, floaterY);
  ctx.stroke();
  ctx.drawImage(floater, floaterX, floaterY, 50, 50);
}
drawString();

floater.onload = function () {
  ctx.drawImage(floater, 260, 80, 100, 100);
};

floater.src = "plunds.png";
