export const notFound = (req,res,next)=>{
    const err =  new Error(`Route ${req.originalUrl} not found`);
    next(err);
   }