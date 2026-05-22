import { loginService } from "./auth.services.js";

export const login = async (req, res)=>{
    try{
        const result = await loginService(req.body);
        
        res.json(result);
    } catch (error){
        res.status(401).json({
            message: error.message
        })
    }
}