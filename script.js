
const inputMsg = document.getElementById("input-message");
const chat = document.getElementById("chat");
let Username;
let Scroll = false;

function getName() {

    const aux = document.querySelector('.login-overlay');
    aux.classList.add('none');
    let inputName = document.querySelector("#input-login");
    Username = inputName.value;

    const sendname = axios.post("http://mock-api.driven.com.br/api/v6/uol/participants", Username);
    sendname.then(() => {

        setTimeout(() => {
            const aux = document.querySelector('.login-overlay');
            aux.classList.add('none');
        }, 3000)
        request();
        Scroll = true;
    });
    sendname.catch((error) => {
        if (error.response.status === 400) {
            alert("That name is already in use");
        }
        alert("catch");
    });
}

function request() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(sendMsg);
}

function sendMsg(msg) {
    chat.innerHTML = "";
    for (let i = 0; i < msg.data.length; i++) {
        if (msg.data[i].type === "status") {
            chat.innerHTML += `
                                <li class="inout">
                                <p><span class="h">(${msg.data[i].time})</span>&nbsp <strong>${msg.data[i].from}</strong>&nbsp ${msg.data[i].text}</p>
                                </li>`;

        }
        if (msg.data[i].type === "message") {
            chat.innerHTML += `
                                <li>
                                <p><span class="h">(${msg.data[i].time})</span>&nbsp <strong>${msg.data[i].from}</strong> para <strong>${msg.data[i].to}</strong>:&nbsp ${msg.data[i].text}</p>
                                </li>`;

        }
    }
    chat.lastElementChild.scrollIntoView();
}

function send() {
    const Message = {
        from: Username.name,
        to: "Todos",
        text: inputMsg.value,
        type: "message",
    };
    const promiseMessage = axios.post(
        "https://mock-api.driven.com.br/api/v6/uol/messages",
        Message
    );
    promiseMessage.then(request);
    promiseMessage.catch(() => {
        alert("Sorry, you've been disconnected")
        window.location.reload();
    });

    inputMsg.value = "";
    chat.lastElementChild.scrollIntoView();
}

inputMsg.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
        send();
    }
});

setInterval(() => {

    request();

}, 3000);

setInterval(() => {
    if (Scroll == true) {
        axios.post("https://mock-api.driven.com.br/api/v6/uol/status", Username.name);
    }

}, 3000);
