import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import sql from "../../../db/connection.js"

export const loginService= async ({email, password})=>{

    const users= await sql `SELECT * FROM users WHERE email = ${email}`;
    const user= users[0]

    if(!user){
        throw new Error("Usuario no encontrado")
    }
    const validPassword= await bcrypt.compare(
        password, user.password
    )

    if (!validPassword){
        throw new Error("Contraseña incorrecta ")
    }

    const token =jwt.sign(
        {
            id: user.id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"1h"
        }
    )

    return {
        message: "Login exitoso",
        token,
        user :{
            id :user.id,
            email: user.email,
            role : user.role
        }
    };
}