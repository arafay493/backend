const asyncHandler = (requestHandler) => {
  (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };

//? Assync Handler Wrapper Function
// const asyncHandler = (func) => async (req , res , next) => {
//     try {
//         await func(req , res , next)
//     } catch (error) {
//         res.status(error.statusCode || 500).json({
//             success: false,
//             message: error.message,
//             // stack: process.env.NODE_ENV === 'development'? error.stack : null,
//         })
//     }
// }
