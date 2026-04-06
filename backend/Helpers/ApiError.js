class ApiError extends Error {
    constructor(message,status=500,success=false) {
        super(message)
        this.data = []
        this.message = message
        this.status = status
        this.success = success
        

         Error.captureStackTrace(this, this.constructor); 
    }
}

export {ApiError}