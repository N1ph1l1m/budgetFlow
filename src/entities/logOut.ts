import axios from "axios";
import { param } from "../app/params/param";

export async function logOut(navigate: (patch: string) => void) {
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
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      navigate("/authorization/");
    }
  } catch (error) {
    console.error(error);
  }
}
