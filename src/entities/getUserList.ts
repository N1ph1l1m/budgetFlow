import axios from "axios";
import {param} from "../app/params/param"
import { AddDispatch } from "../store";
import { setUsers } from "../store/Slice/usersSlice/usersSlice";


export default async function getUserList(dispatch:AddDispatch) {
  try{
    const url = `${param.baseUser}budget/check_users/`
    const response = await axios.get(url)
    const data =  response
    dispatch(setUsers(data.data))
}catch(error){
    console.error(error);
  }
}
