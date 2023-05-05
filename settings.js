let data1 = decodeURIComponent(document.cookie.split("=")[1]);
data = JSON.parse(data1);

if (data.sound) {
  document.getElementById("checkbox").checked = true;
} else {
  document.getElementById("checkbox").checked = false;
}

for (let i in data.backgrounds) {
  if (data.backgrounds[i] == true) {
    document.getElementById(i).style.opacity = 1;
  } else {
    document.getElementById(i).style.opacity = 0.4;
  }
}

let soundValue = true;

const maps = ["main", "saulriets", "pils", "cits_krasts"];

showSelectedMap();

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

function showSelectedMap() {
  let currentMap = data.currentMap;

  maps.forEach((map) => {
    if (currentMap != map) {
      document.getElementById(`${map}Selected`).style.visibility = "hidden";
    } else {
      document.getElementById(`${map}Selected`).style.visibility = "visible";
    }
  });

  setCookie("myData", data, 365);
}

function selectMap(id) {
  let data1 = decodeURIComponent(document.cookie.split("=")[1]);
  data = JSON.parse(data1);

  if (data.backgrounds[id] == true) {
    if (data.currentMap != id) {
      data.currentMap = id;

      showSelectedMap();
    }
  }
}

function sound() {
  if (data.sound) {
    data.sound = false;
  } else {
    data.sound = true;
  }
  setCookie("myData", data, 365);
}

function setCookie(name, value, days) {
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
}
