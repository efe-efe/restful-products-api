const serverError = {
    code: 500,
    status: "FAILED",
    data: { error: "Internal server error." }
}

const badRequest = {
    code: 400,
    status: "FAILED",
    data: (error) => { error }
}

module.exports = {
    serverError,
    badRequest
}