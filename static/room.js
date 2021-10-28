const path = window.location.pathname.split("/");
const roomname = path[path.length - 1];
const nameinput = document.getElementById("nameinput");
const rollinput = document.getElementById("roll-input");
const rolllist = document.getElementById("roll-list");

document.title = "Roll Dice With " + roomname;

/* Username */
let username = null;
if(window.localStorage) {
    username = window.localStorage.getItem("username");
}

if(!username) {
    username = "Default Danny";
}
nameinput.value = username;

nameinput.addEventListener("input", (event) => {
    username = event.target.value;
    if(window.localStorage) {
        window.localStorage.setItem("username", username);
    }
});


const connection = new signalR.HubConnectionBuilder()
    .withUrl("/roomhub")
    .configureLogging(signalR.LogLevel.Information)
    .withAutomaticReconnect()
    .build();

connection.on("RoomJoined", () => {
    console.log("Joined", roomname);
});

connection.on("PublishRoll", (userRoll) => {
    console.log("PublishRoll", userRoll);

    const resultHTML =
        `<span class="username">Username: ${userRoll.username}</span>` +
        `<span class="timestamp">, UTC: ${userRoll.utcTimestamp}</span>` +
        `<span class="rollresult">, Total: ${userRoll.result.total}</span>` +
        `<span class="rollmod">, Modifier: ${userRoll.result.modifier}</span>` +
        `<span class="rolldescription">, Rolls: (${userRoll.result.rolls})</span>`;

    const li = document.createElement("li");
    li.innerHTML = resultHTML;
    rolllist.appendChild(li);
});

connection.on("InvalidExpression", () => {
    const errorLabel = document.getElementById("invalid-expression");
    errorLabel.hidden = false;
    setTimeout(() => { errorLabel.hidden = true;}, 2000)
});

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

document.getElementById("rollform").addEventListener("submit", async (event) => {
    event.preventDefault();
    const expr = rollinput.value;
    await roll(expr);
    clear_input();
    return false;
});

async function start_signalr() {
    try {
        await connection.start();
        await connection.invoke("JoinRoom", roomname);
    }
    catch(err) {
        console.error(err);
    }
}

start_signalr()
    .then(() => console.log("SignalR connected"));
