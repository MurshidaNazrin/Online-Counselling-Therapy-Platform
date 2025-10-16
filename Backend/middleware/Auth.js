import pkg from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();
const { verify } = pkg;

// Role based authentication middleware 
export default function Auth(allowedRoles = []) {
    return function (req, res, next) {
    try{
        const key = req.headers.autherization;
        if(!key){
            return res.status(401).send("Unautherized access: No token provided");
        }

        const token = key.split(" ")[1];
        const auth = verify(token, process.env.JWT_TOKEN);
        req.user = auth;

        // Role check
        if(allowedRoles.length && !allowedRoles.includes(auth.role)){
            return res.status(403).send("Forbidden: Insufficient role");
        }
        next();
    }catch(err){
        console.error("Auth error:",err);
        return res.status(401).json({message:"Invalid token", error:err.message});
    }
    }
}