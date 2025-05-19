import axios from "axios";
import {param} from "../../app/params/param";

export  async function getListCategory(){
    try{
    const url = `${param.baseUser}budget/categories/`
    const respone = await axios.get(url)
    return respone.data

}catch(error){
        console.error(error)
    }
}
