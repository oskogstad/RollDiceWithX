const path = window.location.pathname.split("/");
const roomname = path[path.length - 1];
const username = "tempuser";
const rollinput = document.getElementById("roll-input");
const rolllist = document.getElementById("roll-list");

document.title = "Roll Dice With " + roomname;

const connection = new signalR.HubConnectionBuilder()
    .withUrl("/roomhub")
    .configureLogging(signalR.LogLevel.Information)
    .withAutomaticReconnect()
    .build();

async function start_signalr() {
    try {
        await connection.start();
        await connection.invoke("JoinRoom", roomname);
    }
    catch(err) {
        console.error(err);
    }
}

connection.on("RoomJoined", () => {
    console.log("Joined", roomname);
});

connection.on("PublishRoll", (message) => {
    console.log("PublishRoll", message);
    const li = document.createElement("li");
    li.textContent = "PublishRoll " + " " + message;
    rolllist.appendChild(li);
});

start_signalr()
    .then(() => console.log("SignalR connected"));

async function roll(expr) {
    try {
        await connection.invoke("Roll", roomname, username, expr);
    }
    catch(err) {
        console.error(err);
    }
}

async function submit_roll() {
    const expr = rollinput.value;
    await roll(expr);
}

