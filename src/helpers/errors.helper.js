
const throwError = (code, message) => {
    throw {
        message : message,
        code : code
    }
}

module.exports = {
    throwError
}