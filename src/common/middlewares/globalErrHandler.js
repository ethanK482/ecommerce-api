export const globalErrhandler = (err,req,res,next)=>{
    const stack = err?.stack;
    const message = err?.message;
    const status = err?.statusCode ? err?.statusCode : 500;
   return res.status(status).json({
        stack,
        message
    })
}
