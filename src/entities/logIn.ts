import axios from "axios";
import { param } from "../app/params/param";
import { NavigateFunction } from "react-router";
import {
  createSuccess,
  createError,
  resetNotification
} from "../store/Slice/notificationSlice/notificationSlice";
import { IUsers } from "../store/Slice/usersSlice/usersSlice";
import { AddDispatch } from "../store";
import { checkUserActive } from "./checkUsers";

interface IGetMe {
  token: string;
  dispatch: AddDispatch;
}

interface ILogIn {
  login: string;
  password: string;
  users: IUsers[];
  t: (value: string) => string;
  dispatch: AddDispatch;
  navigate: NavigateFunction;
}



export async function getMe({ token, dispatch }: IGetMe) {
  try {
    console.log("getMe");
    const URL = `${param.baseUser}auth/users/me/`;
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    if(response && response.status === 200){
    localStorage.setItem("token", token);
    localStorage.setItem("username", response.data.username);
    localStorage.setItem("id", response.data.id);
    localStorage.setItem("email", response.data.email);
    }
  } catch (error) {
    dispatch(createError(`${error}`));
  }
}




export async function loginUser({
  login,
  password,
  users,
  t,
  navigate,
  dispatch,
}: ILogIn) {
  try {
    const isActiveUser = checkUserActive({ users, login });

    if (isActiveUser) {
      const URL = `${param.baseUser}auth/token/login/`;
      const response  = await axios.post(URL, {
        username: login,
        password: password,
      });
      if(response && response.status === 200){
        const token = response.data.auth_token;
        await getMe({ token, dispatch });
        dispatch(createSuccess(`${t("successLogIn")}`))
        setTimeout(()=>{
          dispatch(resetNotification())
          navigate("/", { replace: true })},2000)
      }

    } else {
      dispatch(createError(`${t("errorUserIsNotActive")}`));
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      dispatch(createError(`${t("errorInputData")}`));
    }
  }
}
