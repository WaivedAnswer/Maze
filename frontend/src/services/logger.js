const debug = (...params) => {
    console.log(...params)
}

const info = (...params) => {
    console.log(...params)
}

const warn = (...params) => {
    console.log(...params)
}
const error = (...params) => {
    console.error(...params)
}

export default {
    debug,
    info,
    warn,
    error
}