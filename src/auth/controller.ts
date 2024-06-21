import { comparePassword, createUser, findUserByEmail, isEmailExist, isUsernameExist } from "./service";
import jwt from "jsonwebtoken"

export async function registerUser(req:any,res:any) {
    try{
        if(await isUsernameExist(req.body.username) && await isEmailExist(req.body.email)){
            res.code(400);
            return{
                message:'username or email already exist',
            };
        }
        const user = await createUser(req.body);
        res.code(200);
        return{
            message:'user registration successful',
            data:{user}
        }
    }catch(err){
        res.code(500);
        return {
            err
        }

    }
}

export async function loginUser(req:any,res:any) {
    try{
        const user=await findUserByEmail(req.body.email)
        if(!user){
            res.code(400);
            return{
                message:'email is not registered',
            };
        }

        if(!await comparePassword(req.body.password,user.password)){
            res.code(400);
            return {
                message:"incorrect login details"
            }
        }

        const token = jwt.sign({id:user.id},'SignzyRocks')

        res.code(200)
        return{
            message:'user login successful',
            data:{
                user,
                token
            }
        }

    }catch(err){
        res.code(500);
        return {
            err
        }
    }
}