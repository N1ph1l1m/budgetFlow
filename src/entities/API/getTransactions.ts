import axios from "axios";
import {param}  from "../../app/params/param"

export async function getTransactions() {
    try{
        const url = `${param.baseUser}budget/transactions/`
        const response  = await axios.get(url)
        const data  = await response.data
        return data
    }catch(error){
        console.error(error)
    }
}
