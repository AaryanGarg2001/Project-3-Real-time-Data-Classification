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
    fastify.get('/',(req:any,res:any)=>{
        console.log("hitting home base")
    })
    
    fastify.post('/register',registerUser)
    fastify.post('/login',loginUser)
}

