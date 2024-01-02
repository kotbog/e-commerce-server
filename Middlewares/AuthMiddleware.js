import jwt from "jsonwebtoken";
import User from "../Models/User.js";
export const userVerification = (req, res, next) => {
    try {
        console.log(req.cookies);
        const token = "";
        console.log(token);
        if (!token) {
            return res.json({
                error: true,
                message: "invalid access token. There is no token in cookies.",
            });
        }
        jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
            if (err) {
                return res.json({
                    error: true,
                    message: "invalid access token. Not verified.",
                });
            }
            const user = await User.findOne({ _id: data.id });
            if (user) {
                req.userId = user._id;
                return next();
            }
            return res.json({
                error: true,
                message: "invalid access token.",
            });
        });
    } catch (err) {
        console.error(err);
        res.json({ error: true, message: err.message });
    }
};

export const isAdmin = async (req, res, next) => {
    try {
        const email = req.body.email;
        const user = await User.find({ email }, "Admin");
        if (admin && user.admin) {
            next();
        } else {
            return res.status(401).send("Access Denied. Not admin.");
        }
    } catch (e) {
        console.error(e);
    }
};
