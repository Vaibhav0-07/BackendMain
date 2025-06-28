//Type 1

/*
    This utility function is used to handle asynchronous operations in Express.js.
    It takes an async function as an argument and returns a new function that handles errors.
    If the async function throws an error, it will be caught and passed to the next middleware.
    This is useful for avoiding repetitive try-catch blocks in route handlers.
        Example usage:
        app.get('/route', asyncHandler(async (req, res) => {
            const data = await someAsyncOperation();
            res.json(data);
        }));
*/

const asyncHandler = (functionASParameter) => {
    (req, res, next) => {
        Promise.resolve(functionASParameter(req, res, next))
        .catch((error) => next(error))
    }
}


export {asyncHandler};



//Type 2 using try catch block

/*
const asyncHandler = (functionASParameter) => {}
const asyncHandler = (functionASParameter) => {() => {}}
const asyncHandler = (functionASParameter) => () => {} //Higher order function
*/

/*
const asyncHandler = (functionASParameter) => async(req, res, next) => {
    try{
        await functionASParameter(req, res, next);
        // If the function executes successfully, it will continue to the next middleware
    }
    catch(error){
        res.status(error.code || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
            error: error,
        });
    }
}
*/