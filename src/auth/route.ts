import { loginUser, registerUser } from "./controller";
import { FastifyInstance } from 'fastify';

export async function registerRoutes(fastify:FastifyInstance,_opts:any){
    fastify.post('/',(req:any,res:any)=>{
        res.code(200)
        return {
            message:"Successfully connected",
            data:{
                req
            }
        }
    })
    fastify.post('/register',registerUser)
    fastify.post('/login',loginUser)
}

