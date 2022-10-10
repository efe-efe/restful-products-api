const serverError = {
    code: 500,
    status: "FAILED",
    data: { error: "Internal server error." }
}

const badRequest = {
    code: 400,
    status: "FAILED",
}

module.exports = {
    serverError,
    badRequest
}