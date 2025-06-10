
import axios from "axios";
import { param } from "../app/params/param";
import { NavigateFunction } from "react-router";
import createMessage from "./createMessage";
import {typeSetIsMessage, typeSetTextMessage} from "./createMessage";
import {IUsers} from "../store/Slice/usersSlice/usersSlice"
import { AddDispatch } from "../store";
import { setActiveUse } from "../store/Slice/usersSlice/usersSlice";

interface IGetMe {
  token: string;
  setIsMessage: typeSetIsMessage;
  setTextMessage: typeSetTextMessage;
  dispatch:AddDispatch,
}

interface ILogIn {
  login: string;
  password: string;
  users:IUsers[],
  t:(value:string)=>string,
  setIsMessage: typeSetIsMessage;
  setTextMessage: typeSetTextMessage;
  navigate: NavigateFunction;
  dispatch:AddDispatch,
}


interface ICheckActivate{
  users: IUsers[],
  login:string
}

interface ICheckEmail{
  users: IUsers[],
  email:string
}

export async function getMe({ token, setIsMessage, setTextMessage,dispatch }: IGetMe) {
  try {
    console.log("getMe");
    const URL = `${param.baseUser}auth/users/me/`;
    const { data } = await axios.get(URL, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    localStorage.setItem("token", token);
    localStorage.setItem("username", data.username);
    localStorage.setItem("id", data.id);
    dispatch(setActiveUse({
        id:data.id,
        username:data.username,
        email:data.email
      }))
  } catch (error) {
    createMessage({
      typeMessage: "error",
      message: `${error}`,
      setIsMessage,
      setTextMessage,
    });
  }
}

function checkUserActive({users,login}:ICheckActivate):boolean{
  const user = users.filter((item)=>item.username == login)
  return user[0]?.is_active ? true : false
}
export function checkUserEmail({users,email}:ICheckEmail){
    const user = users.filter((item)=>item.email == email)
    return user.length !== 0


}

export async function loginUser({
  login,
  password,
  users,t,
  setIsMessage,
  setTextMessage,
  navigate,
  dispatch
}: ILogIn) {
  try {

    const isActiveUser = checkUserActive({users,login})

    if(isActiveUser){
    const URL = `${param.baseUser}auth/token/login/`;
    const { data } = await axios.post(URL, {
      username: login,
      password: password,
    });
    const token = data.auth_token;
    await getMe({ token, setIsMessage, setTextMessage,dispatch});
    navigate("/", { replace: true });
    }else{
        createMessage({
        typeMessage: "error",
        message: `${t("errorUserIsNotActive")}`,
        setIsMessage,
        setTextMessage,
      });
    }


  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      createMessage({
        typeMessage: "error",
        message: `${t("errorInputData")}`,
        setIsMessage,
        setTextMessage,
      });
    }
  }
}
