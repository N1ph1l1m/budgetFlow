import {param} from "../../app/params/param";
import axios from "axios";
export async  function deleteTransactionToId(id:number){
    try{
        const url = `${param.baseUser}budget/transactions/${id}/`
        const response = await axios.delete(url)
        const data =  response.status
        if(data === 204){
            return data
        }
    }catch(error){
        console.error(`Error delete transaction \n:${error}`)
    }
}
