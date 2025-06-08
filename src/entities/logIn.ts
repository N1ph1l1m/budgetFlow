import axios from "axios";
import { param } from "../app/params/param";
import { NavigateFunction } from "react-router";

export type typeMessage = "off" | "error" | "success";
type typeSetIsMessage = (value: typeMessage) => void;
type typeSetTextMessage = (value: string) => void;

interface ICreateMessage {
  typeMessage: typeMessage;
  message: string;
  setIsMessage: typeSetIsMessage;
  setTextMessage: typeSetTextMessage;
}
interface IGetMe {
  token: string;
  setIsMessage: typeSetIsMessage;
  setTextMessage: typeSetTextMessage;
}

interface ILogIn {
  login: string;
  password: string;
  setIsMessage: typeSetIsMessage;
  setTextMessage: typeSetTextMessage;
  navigate: NavigateFunction;
}

export function createMessage({
  typeMessage,
  message,
  setIsMessage,
  setTextMessage,
}: ICreateMessage) {
  setIsMessage(typeMessage);
  setTextMessage(message);
}

export async function getMe({ token, setIsMessage, setTextMessage }: IGetMe) {
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
  } catch (error) {
    createMessage({
      typeMessage: "error",
      message: `${error}`,
      setIsMessage,
      setTextMessage,
    });
  }
}

export async function loginUser({
  login,
  password,
  setIsMessage,
  setTextMessage,
  navigate,
}: ILogIn) {
  try {
    const URL = `${param.baseUser}auth/token/login/`;
    const { data } = await axios.post(URL, {
      username: login,
      password: password,
    });
    const token = data.auth_token;
    await getMe({ token, setIsMessage, setTextMessage });
    navigate("/", { replace: true });
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      createMessage({
        typeMessage: "error",
        message: "Неверный логин или пароль",
        setIsMessage,
        setTextMessage,
      });
      console.log(error);
    }
  }
}
