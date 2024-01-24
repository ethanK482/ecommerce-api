
import AsyncHandler from "express-async-handler";
import User from "../../lib/model/User.js";
export const isAdmin = AsyncHandler(
    async( req, res, next ) => {
        const user = await User.findById(req.userAuthId);
        if(user.isAdmin) {
            next();
        }else{
            throw new Error("Access denied, Admin only");
        }
    }
);
