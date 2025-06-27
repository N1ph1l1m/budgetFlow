import { AddDispatch } from './../store/index';

import axios from "axios";
import { param } from "../app/params/param";
import { resetNotification } from '../store/Slice/notificationSlice/notificationSlice';


interface ILogOut{
  dispatch:AddDispatch,
  navigate:(patch:string)=>void
}

function resetData({dispatch,navigate}:ILogOut){
      localStorage.removeItem("id");
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      dispatch(resetNotification())
      navigate("/authorization/");
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
      resetData({dispatch,navigate})
    }
  } catch (error:unknown) {
   if (axios.isAxiosError(error)) {
    if (error.response?.status === 401) {
      resetData({ dispatch, navigate });
    }
  }
    console.error(error);
  }
}
