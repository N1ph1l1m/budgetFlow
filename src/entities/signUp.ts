import axios from "axios";
import {param} from "../app/params/param"
import { createSuccess,createError } from "../store/Slice/notificationSlice/notificationSlice";
import { AddDispatch } from "../store";
import { IUsers } from "../store/Slice/usersSlice/usersSlice";
import { checkUser } from "./checkUsers";
import getUserList from "./getUserList";
import { setModalSignUp } from "../store/Slice/modalTransaction/modalTransactionSlice";

interface ICreateUser{
    login:string,
    email:string,
    password:string,
    confirmPassword:string,
    users:IUsers[],
    dispatch:AddDispatch,
    t:(value:string)=>void

}




export async function createUser({login,email,password,confirmPassword,users,dispatch,t}:ICreateUser) {
  const url = `${param.baseUser}auth/users/`;

  function errorChangeLang(message: string): string {
      switch (message) {
        case "This password is too short. It must contain at least 8 characters." :
          return `${t("errorShortPass")}`;
        case "A user with that username already exists.":
          return `${t("errorUserExists")}`;
        case "Пароль не должен состоять только из цифр.":
          return `${t("errorPassOnlyDigits")}`;

        case "This password is entirely numeric.":
        return `${t("errorPassOnlyDigits")}`;

        case "Пароль не должен состоять только из букв.":
          return `${t("errorPassOnlyLetters")}`;
        case "This password is too common.":
          return `${t("errorPasswordCommon")}`;

        case "Пароли не совпадают.":
          return `${t("errorPasswordsMismatch")}`;

        default:
          return message;
      }
    }

  try {
    if(checkUser({users:users,param:"email",userParam:email})){
      dispatch(createError(`${t("errorEmailExists")}`));
    }else{
    const response = await axios.post(url, {
      username: login,
      password: password,
      email:email,
      re_password:confirmPassword
    });

    if(response && response.status === 201){
        dispatch(setModalSignUp())
       dispatch(createSuccess(`${t("registerSuccess")}`))
       getUserList(dispatch)
       return response.status
    }
    }


  } catch (error: unknown) {
      console.log()
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        const errors = error.response.data as Record<string, string[] | string>;
        for (const key in errors) {
          const messages = errors[key];
          if (Array.isArray(messages)) {
            messages.forEach((msg) => {
              console.log(msg)
              dispatch(createError(`${errorChangeLang(msg)}`));
            });
          } else {
            dispatch(createError(`${errorChangeLang(messages)}`));
          }
        }
      } else {
        dispatch(createError(`${t("errorByServer")}`));
      }
    }
}
