import { createToken } from "../util/Token.js";
import User from "../Models/User.js";
import bcrypt from "bcrypt";
import {
    logInBodyValidation,
    signUpBodyValidation,
} from "../util/validationAuthSchema.js";
import generateTokens from "../util/GenerateTokens.js";
import verifyRefreshToken from "../util/verifyRefreshToken.js";
import UserToken from "../Models/UserToken.js";
import { log } from "util";

export const SignUp = async (req, res, next) => {
    try {
        const { error } = signUpBodyValidation(req.body);
        if (error)
            return res
                .status(400)
                .json({ error: true, message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        if (user)
            return res
                .status(400)
                .json({ error: true, message: "User already exists." });

        await new User({ ...req.body }).save();

        res.status(201).json({
            error: false,
            message: "Account created successfully.",
        });
    } catch (e) {
        console.log(e);
        return res
            .status(500)
            .json({ error: true, message: "Internal server error." });
    }
};

export const LogIn = async (req, res, next) => {
    try {
        const { error } = logInBodyValidation(req.body);

        if (error)
            return res
                .status(400)
                .json({ error: true, message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });

        if (!user)
            return res
                .status(400)
                .json({ error: true, message: "Invalid email or password." });

        const verifiedPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!verifiedPassword)
            return res
                .status(400)
                .json({ error: true, message: "Invalid email or password." });

        const { accessToken, refreshToken } = await generateTokens(user);

        res.cookie("refreshToken", JSON.stringify({ refreshToken }), {
            httpOnly: true,
            //secure: true,
            sameSite: true,
            maxAge: 604800000, // 7 days
        });
        return res.status(200).json({
            error: false,
            token: accessToken,
            message: "Logged In successfully.",
        });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ error: true, message: "Internal server error." });
    }
};

export const refreshToken = async (req, res) => {
    try {
        verifyRefreshToken(req.cookies.refreshToken)
            .then(({ details }) => {
                console.log(details);
                const payload = { _id: details.id };
                const accessToken = createToken(payload, "14m");
                return res.status(200).json({
                    error: false,
                    accessToken,
                    message: "Access token created successfully",
                });
            })
            .catch((e) => {
                return res
                    .status(400)
                    .json({ error: true, message: e.message });
            });
    } catch (e) {
        return res.status(500).json({ error: true, message: e.message });
    }
};

export const removeToken = async (req, res) => {
    try {
        const tokenParsed = JSON.parse(req.cookies.refreshToken).refreshToken;

        await UserToken.findOneAndRemove({ token: tokenParsed });

        res.clearCookie("refreshToken");

        return res
            .status(200)
            .json({ error: false, message: "Logged Out successfully." });
    } catch (e) {
        return res.status(500).json({ error: true, message: e.message });
    }
};
