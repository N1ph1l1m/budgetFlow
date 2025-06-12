import axios from "axios";
import {param} from "../app/params/param"


export async function forgotPassword(email:string){
    try{

        const url = `${param.baseUser}auth/users/reset_password/`
        const response = await axios.post(url,{
            email:email
        })
        return  response
        }catch(error){
        console.error(error)
    }
}
