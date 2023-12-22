import UserToken from "../Models/UserToken.js";
import { createToken } from "./Token.js";

const generateTokens = async (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            const payload = { id: user._id };

            const accessToken = createToken(payload, "14m");
            const refreshToken = createToken(payload, "30d");

            await UserToken.findOneAndRemove({ userId: user._id });

            await new UserToken({
                userId: user._id,
                token: refreshToken,
            }).save();

            return resolve({ accessToken, refreshToken });
        } catch (e) {
            return reject(e);
        }
    });
};

export default generateTokens;
