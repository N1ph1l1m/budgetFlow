import { AddDispatch } from './../store/index';

import axios from "axios";
import { param } from "../app/params/param";
import { resetNotification } from '../store/Slice/notificationSlice/notificationSlice';


interface ILogOut{
  dispatch:AddDispatch,
  navigate:(patch:string)=>void
}


export async function logOut({navigate,dispatch}:ILogOut) {
  const url = `${param.baseUser}auth/token/logout/`;
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(
      url,
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    if (response.status === 204) {
      console.log("LogOut success");
      localStorage.removeItem("id");
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      dispatch(resetNotification())
      navigate("/authorization/");

    }
  } catch (error) {
    console.error(error);
  }
}
