import { createSlice, PayloadAction } from "@reduxjs/toolkit";



export interface IUsers{
    id:number | undefined,
    username:string,
    email:string,
    is_active?:boolean
}

interface IInitialState{
    users:IUsers[],
    activeUser:IUsers,
}

const initialState:IInitialState = {
    users:[],
    activeUser:{
        id:undefined,
        username:"",
        email:"",
    }
}

const usersSlice  = createSlice({
    name:"usersSlice",
    initialState,
    reducers:{
        setUsers(state,action:PayloadAction<IUsers[]>){
            state.users = action.payload
        },
        setActiveUse(state,action:PayloadAction<IUsers>){
            state.activeUser = action.payload
        }
    }
})
export const{setUsers,setActiveUse} = usersSlice.actions
export default usersSlice.reducer
