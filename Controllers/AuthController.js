import {createToken} from "../util/Token.js";
import User from "../Models/User.js";
import bcrypt from "bcrypt";


export const SignUp = async (req, res, next) => {
    try {
        const {email, password, first_name, last_name, createdAt} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.json({ message: "User already exists" });
        }
        const user = await User.create({email, password, first_name, last_name, createdAt});
        const token = createToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false
        });
        res
            .status(201)
            .json({ message: "User signed in successfully", success: true, user });
        next();
    } catch (err) {
        console.error(err);
    }
}

export const LogIn = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.json({message: "All fields required!"})
        }
        const user = await User.findOne({email});
        if (!user) {
            return res.json({message: "Incorrect email or password!"});
        }
        const auth = await bcrypt.compare(password, user.password);
        if (!auth) {
            return res.json({message: "Incorrect email or password!"});
        }
        const token = createToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false
        });
        res
            .status(201)
            .json({message: "User logged in successfully", success: true, id: user._id});
        next();
    } catch (err) {
        console.error(err);
    }
}