class APIerror extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        error = [],
        stack = "",
    ){
        super(message); //Carry a .this pointer of the class where it it called and automatically set the (message) from Error
        // class(which was extended) to the APIerror class (current class where super keyword was called)
        this.statusCode = statusCode;
        this.errors = this.errors;
        this.data = null;
        this.message = message;
        this.Success = false;



        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export {APIerror};