import jwt from "jsonwebtoken";

export const generateToken = (data, expiredIn='1d') =>{
    console.log('data token', data)
    return jwt.sign(data,
        process.env.NEXTAUTH_SECRET ?? 'Training@2023',
        {expiresIn: expiredIn})
}

export const decodeToken = (token) => {
    try {
        return jwt.verify(token, process.env.NEXTAUTH_SECRET ?? 'Training@2023');
    } catch (err) {
        return null;
    }
}