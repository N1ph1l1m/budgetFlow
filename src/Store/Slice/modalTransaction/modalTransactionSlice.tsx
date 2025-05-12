import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type  typeTransaction = "rate" | "income"
interface IModalTransaction{
    modalInput:boolean,
    modalCategory:boolean ,
    typeTransaction:typeTransaction,
    selectCategory:string,
}

const initialState:IModalTransaction  = {
    modalInput:false,
    modalCategory:false,
    typeTransaction:"rate",
    selectCategory:"",
}

const modalTransactionSlice = createSlice({
    name:'modalTransaction',
    initialState,
    reducers:{
        isModalInput(state){
            state.modalInput = true;
        },
        closeModalInput(state){
            state.modalInput = false;
        },
        isModalCategory(state){
            state.modalCategory = true;
        },
        closeModalCategory(state){
            state.modalCategory = false;
        },
        rateTransaction(state){
            state.typeTransaction = 'rate'
        },
        incomeTransaction(state){
            state.typeTransaction = 'income'
        },
        setSelectCategory(state,action:PayloadAction<string>){
            state.selectCategory = action.payload
        }
    }

})
export const {isModalInput,closeModalInput, isModalCategory,closeModalCategory, rateTransaction, incomeTransaction,setSelectCategory} = modalTransactionSlice.actions;
export default modalTransactionSlice.reducer;
