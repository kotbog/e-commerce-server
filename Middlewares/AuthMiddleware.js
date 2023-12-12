import jwt from "jsonwebtoken";
import User from "../Models/User.js";
export const userVerification = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token) {
            res.json({status: false});
        }
        jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
            if(err) {
                return res.json({status: false});
            }
            const user = await User.findOne(data.id);
            if(user) {
                return res.json({status: true, id: user._id});
            }
            return res.json({status: false});
        })
    } catch (err) {
        console.error(err);
    }
}