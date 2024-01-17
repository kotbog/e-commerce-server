import UserToken from "../Models/UserToken.js";
import jwt from "jsonwebtoken";

const verifyRefreshToken = (token) => {
  return new Promise(async (resolve, reject) => {
    if(!token) {
     return reject({
        err: true,
        message: "Invalid refresh token"
      });
    }
    const parsedToken = JSON.parse(token) || '';
    const userToken = await UserToken.findOne({
      token: parsedToken.refreshToken,
    });
    if (!userToken) return reject({ error: true, message: "Invalid refresh token." });

    jwt.verify(
      parsedToken.refreshToken,
      process.env.TOKEN_KEY,
      (err, details) => {
        if (err) reject({ error: true, message: err });
        resolve({
          details,
          error: false,
          message: "Valid refresh token.",
        });
      }
    );
  });
};

export default verifyRefreshToken;
