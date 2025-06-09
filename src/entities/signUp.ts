import axios from "axios";
import {param} from "../app/params/param"
import createMessage from "./createMessage";
import { typeSetIsMessage,typeSetTextMessage } from "./createMessage";
interface ICreateUser{
    login:string,
    email:string,
    password:string,
    confirmPassword:string,
    setIsMessage:typeSetIsMessage,
    setTextMessage:typeSetTextMessage
}

export async function createUser({login,email,password,confirmPassword,setIsMessage,setTextMessage}:ICreateUser) {
  const url = `${param.baseUser}auth/users/`;
  try {
    const response = await axios.post(url, {
      username: login,
      password: password,
      email:email,
      re_password:confirmPassword
    });

    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
   createMessage({
      typeMessage: "error",
      message: `${error}`,
      setIsMessage,
      setTextMessage,
    });
    throw error;
  }
}
