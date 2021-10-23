const path = window.location.pathname.split("/");
const roomname = path[path.length - 1];

document.title = "Roll Dice With " + roomname;

