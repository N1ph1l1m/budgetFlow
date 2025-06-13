import axios from "axios";
import {param} from "../app/params/param"
import { IUsers } from "../store/Slice/usersSlice/usersSlice";
import { AddDispatch } from "../store";
import { createSuccess,createError } from "../store/Slice/notificationSlice/notificationSlice";
import { checkUser } from "./checkUsers";
interface ISendLetter{
    users: IUsers[],
    email:string,
    dispatch:AddDispatch,
    t:(value:string)=>void
}

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

export async function sendLetter({users,email,dispatch,t}:ISendLetter){
      const isEmail =   checkUser({users:users,param:"email",userParam:email})
      if(isEmail){
       const response  = await  forgotPassword(email)
      if (response && response.status === 204) {
         dispatch(createSuccess(`${t("sendLetterSuccess")}`));
      } else if (response) {
        dispatch(createError(response.statusText || `${t("errorResponse")}`));
      } else {
        dispatch(createError(`${t("errorServerError")}`));
      }
      }else{
         dispatch(createError(`${t("errorNotUserMail")}`));
    }
    }
