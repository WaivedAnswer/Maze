// open connection
let websocketURL = process.env.NODE_ENV === 'development' ? 'ws://127.0.0.1:3001' : 'wss://' + window.location.host
var connection = new WebSocket(websocketURL)


connection.onopen = function () {
    console.log('Opened!')
}

let handlers = []
let allowedMovements = []

connection.onerror = function (error) {
    console.log('Sorry, but there\'s some problem with your '
        + 'connection or the server is down.')
}

// most important part - incoming messages
connection.onmessage = function (message) {
    try {
        var json = JSON.parse(message.data);
    } catch (e) {
        console.log('Invalid JSON: ', message.data);
        return
    }

    for (let handler of handlers) {
        handler.handle(json)
    }
}


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

const setMovements = (movements) => {
    allowedMovements = movements
}

const sendBasicCommand = (command) => {
    connection.send(JSON.stringify(
        {
            type: command
        }
    ))
}

const sendMovement = (command) => {
    if (!allowedMovements.includes(command)) {
        return
    }
    sendBasicCommand(command)
}

const reset = () => {
    sendBasicCommand('RESET')
}

const moveRight = () => {
    sendMovement('RIGHT')
}

const moveLeft = () => {
    sendMovement('LEFT')
}

const moveDown = () => {
    sendMovement('DOWN')
}

const moveUp = () => {
    sendMovement('UP')
}

export default {
    send,
    moveRight,
    moveLeft,
    moveDown,
    moveUp,
    setMovements,
    reset,
    addHandler
}