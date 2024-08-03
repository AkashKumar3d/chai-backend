const asyncHandler = (requestHandler) => { 
     (req, res, next) =>{
        Promise.resolve(requestHandler(req, res, next)).catch((error)=>{
            next(error);
        })
     }
}

export {asyncHandler}


//  second way to create the request handler

// const asyncHandler = (fn)=> async(req , res, next)=>{
//    try {
//        await fn(req, res, next)
//    } catch (error) {
//       res.status(error.code || 500).json({
//         Sucess: false,
//         message: error.message
//       })
//    }
// }