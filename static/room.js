const path = window.location.pathname.split("/");
const roomname = path[path.length - 1];
const nameinput = document.getElementById("nameinput");
const rollinput = document.getElementById("roll-input");
const rolllist = document.getElementById("roll-list");

document.title = "Roll Dice With " + roomname;

// Load username
var username = null;
if(window.localStorage) {
    username = window.localStorage.getItem("username");
}

if(!username) {
    username = "Default Danny";
}

nameinput.value = username;

function name_update(event)
{
    username = event.target.value;
    if(window.localStorage) {
        window.localStorage.setItem("username", username);
    }
}

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

connection.on("PublishRoll", (result) => {
    console.log("PublishRoll", result);

    const resultHTML =
        `<span class="username">Username: ${result.username}</span>` +
        `<span class="timestamp">, UTC: ${result.utcTimestamp}</span>` +
        `<span class="rollresult">, Total: ${result.rollResult.total}</span>` +
        `<span class="rollmod">, Modifier: ${result.rollResult.modifier}</span>` +
        `<span class="rolldescription">, Rolls: (${result.rollResult.rolls})</span>`;

    const li = document.createElement("li");
    li.innerHTML = resultHTML;
    rolllist.appendChild(li);
});

connection.on("InvalidExpression", () => {
    const errorLabel = document.getElementById("invalid-expression");
    errorLabel.hidden = false;
    setTimeout(() => { errorLabel.hidden = true;}, 2000)
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

function clear_input() {
    rollinput.value = "";
}

async function submit_roll(event) {
    event.preventDefault();
    const expr = rollinput.value;
    await roll(expr);
    clear_input();
    return false;
}

