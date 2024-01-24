import jwt from "jsonwebtoken";
import envGetter from "../common/env/envGetter.js";
export const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_KEY,{expiresIn:envGetter.getTokenExpiresTime()})
}
