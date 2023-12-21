import jwt from "jsonwebtoken";
import User from "../Models/User.js";
export const userVerification = (req, res, next) => {
    try {
        const token = req.get('Authorization');
        if(!token) {
            return res.json({status: false, message: "invalid access token. There is no token in headers."});
        }
        jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
            if(err) {
                return res.json({status: false, message: "invalid access token. Not verified."});
            }
            console.log(data);
            const user = await User.findOne({_id: data.id});
            console.log(user);
            if(user) {
               return next();
            } 
            return res.json({status: false, message: "invalid access token."});
            
            
        })
    } catch (err) {
        res.json({status: false, message: err});
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        const email = req.body.email;
        const user = await User.find({email}, 'admin');
        if(admin && user.admin) {
            next();
        } else {
            return res.status(401).send('Access Denied. Not admin.');
        }
    }catch(e) {console.error(e);}
}
