// create a customer error class
class APIError extends Error{
    //this class will provide a more structured and consistent error responses in the API
    constructor(message, statusCode){
        //whenever you're calling a constructure you need to call the parent constructor which is super
        super(message)
        this.statusCode = statusCode
        this.name = 'APIError' //set the error type to API Error
    }


}

//the asyncHandler function takes a 'function', let's call it A, as an argument, and then returns a second function, \
// let's call it B, the function B takes the arguments req, res, next like so (req, res, next) and then passess
//  them into the function A as arguments, function A is then executed inside a Promise and since we're executing resolve
// it simply means inside function B we're awaiting the function A we passed and then if there's any error, 
// the catch functionality will then execute and it is executing next


const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next) 
}
//          ^
//          |
//          |
//  Why this is a "Lifesaver"
//  Without this asyncHandler, you would have to wrap every single async route in a try/catch block:
//  The messy way:
//
//  app.get('/user', async (req, res, next) => {
//     try {
//         const user = await User.findById(req.params.id);
//         res.json(user);
//     } catch (error) {
//         next(error); // You have to remember to do this every time
//     }
//  });

const globalErrorHandler = (err, req, res, next) => {
    console.error("error: ", err.stack); //log the error stack 
    if(err instanceof APIError){
        return res.status(error.statusCode).json({
            status: 'Error',
            message: err.message
        })
    }

    // say we want to handle mongoose validation
    else if(err.name === 'validationError'){
        return res.status(400).json({
            status: 'Error',
            message: "validationError"
        })
    }else {
        return res.status(500).json({
            status: 'Error',
            message: 'An unexpected error occured'
        })
    }
}

module.exports = { APIError, asyncHandler, globalErrorHandler}