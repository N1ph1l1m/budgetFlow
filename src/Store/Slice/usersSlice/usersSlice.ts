import { createSlice, PayloadAction } from "@reduxjs/toolkit";



export interface IUsers{
    id:number | undefined,
    username:string,
    email:string,
    is_active?:boolean
}

interface IInitialState{
    users:IUsers[],
}

const initialState:IInitialState = {
    users:[],
}

const usersSlice  = createSlice({
    name:"usersSlice",
    initialState,
    reducers:{
        setUsers(state,action:PayloadAction<IUsers[]>){
            state.users = action.payload
        },

    }
})
export const{setUsers} = usersSlice.actions
export default usersSlice.reducer
