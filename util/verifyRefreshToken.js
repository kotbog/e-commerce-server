import UserToken from "../Models/UserToken.js"
import jwt from "jsonwebtoken"


const verifyRefreshToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
        UserToken.findOne({token: refreshToken}, (err, doc) => {
            if(!doc) reject({error: true, message: 'Invalid refresh token.'})
            
            jwt.verify(refreshToken, process.env.TOKEN_KEY, (err, details) => {
                if(err) reject({error: true, message: 'Invalid refresh token.'})
            })
            resolve({
                details,
                error: false,
                message: 'Valid refresh token.'
            })
        })
    })
}

export default verifyRefreshToken;