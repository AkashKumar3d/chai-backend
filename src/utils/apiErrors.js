
// ye create kiya hai server se api ko error handle send karane ke liye api error s
class APIError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        error = [],
        stack = ""

    ) {
        super(message)
        this.statusCode = statusCode,
            this.data = null,
            this.message = message,
            this.success = false
        this.error = error

        if (stack) {
            this.stack = statck
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { APIError }