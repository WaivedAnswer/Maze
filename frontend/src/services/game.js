import { scryRenderedComponentsWithType } from "react-dom/test-utils";

// open connection
var connection = new WebSocket('ws://127.0.0.1:3001');
connection.onopen = function () {
};

let handlers = []

connection.onerror = function (error) {
    console.log('Sorry, but there\'s some problem with your '
        + 'connection or the server is down.')
};

// most important part - incoming messages
connection.onmessage = function (message) {
    try {
        var json = JSON.parse(message.data);
    } catch (e) {
        console.log('Invalid JSON: ', message.data);
        return
    }

    console.log(handlers.length)
    for (let handler of handlers) {
        handler.handle(json)
    }
};


setInterval(function () {
    if (connection.readyState !== 1) {
        console.log('Error missing connection');
    }
}, 3000);

const addHandler = (newHandler) => {
    handlers = handlers.filter(handler => handler.id !== newHandler.id)
    handlers.push(newHandler)
}
const send = (message) => {
    connection.send(message)
}

export default {
    send,
    addHandler
}