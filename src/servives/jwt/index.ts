import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config()

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "defaultJwtSecretKey";
const JWT_IAT = Number(process.env.JWT_IAT) || 60;


const genAccessToken = (payload: object) => {
    return jwt.sign({ ...payload, iat: Math.floor(Date.now() / 1000) - JWT_IAT }, JWT_SECRET_KEY)
}


const vertifyAccessToken = (accessToken: string) => {
    try {
        const data = jwt.verify(accessToken, JWT_SECRET_KEY);
        return typeof data === 'string' ? JSON.parse(data) : data;
    } catch (error) {
        return false;
    }
}


export { genAccessToken, vertifyAccessToken }