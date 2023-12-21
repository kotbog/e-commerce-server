import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";

dotenv.config();

export const createToken = (payload, expiration) => {
    return jsonwebtoken.sign(payload, process.env.TOKEN_KEY, {
        expiresIn: expiration,
    })
}

