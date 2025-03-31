import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ITransactionData {
    id: number;
    category:string,
    itemName: string;
    price: number;
    date: Date;
    typeOperation: string;
  }
  interface ITransaction{
    transactionState:ITransactionData[];
  }

  const initialState: ITransaction = {
    transactionState:[
      {
        "id": 1742288245880,
        "category": "food",
        "itemName": "Кофе",
        "price": 10,
        "date": "2025-03-18T08:57:25.868Z",
        "typeOperation": "rate"
      },
      {
        "id": 1742288245868,
        "category": "food",
        "itemName": "Капучино",
        "price": 10,
        "date": "2025-03-18T08:57:25.868Z",
        "typeOperation": "rate"
      },
      {
        "id": 1742288267924,
        "category": "food",
        "itemName": "secondJod",
        "price": 1000,
        "date": "2025-03-18T08:57:47.924Z",
        "typeOperation": "income"
      },
      {
        "id": 1742288285220,
        "category": "secondJod",
        "itemName": "Верстка",
        "price": 1000,
        "date": "2025-03-18T08:58:05.220Z",
        "typeOperation": "income"
      },
      {
        "id": 1742288400356,
        "category": "pharmacy",
        "itemName": "Цитрамон",
        "price": 3,
        "date": "2025-03-18T09:00:00.356Z",
        "typeOperation": "rate"
      },
      {
        "id": 1742288414171,
        "category": "clothes",
        "itemName": "Кроссовки",
        "price":450,
        "date": "2025-03-18T09:00:14.171Z",
        "typeOperation": "rate"
      },
      {
        "id": 1742288436196,
        "category": "pets",
        "itemName": "Корм",
        "price": 10,
        "date": "2025-03-18T09:00:36.196Z",
        "typeOperation": "rate"
      },
      {
        "id": 1742288455605,
        "category": "study",
        "itemName": "Первая сессия",
        "price": 1800,
        "date": "2025-03-18T09:00:55.605Z",
        "typeOperation": "rate"
      },
      {
        "id": 1742288765325,
        "category": "subscriptions",
        "itemName": "Музыка",
        "price": 25,
        "date": "2025-03-18T09:06:05.325Z",
        "typeOperation": "rate"
      },
      {
        "id": 1742288776853,
        "category": "car",
        "itemName": "Заправка",
        "price": 400,
        "date": "2025-03-18T09:06:16.853Z",
        "typeOperation": "rate"
      },
      {
          "id": 1742290027869,
          "category": "salary",
          "itemName": "Зарплата ",
          "price": 7999,
          "date": "2025-03-18T09:27:07.869Z",
          "typeOperation": "income"
        },
        {
          "id": 1742290169310,
          "category": "secondJod",
          "itemName": "Сервер",
          "price": 200132,
          "date": "2025-03-18T09:29:29.310Z",
          "typeOperation": "income"
        }
    ],
  }




const transactionsSlice = createSlice({
    name:"transaction",
    initialState,
    reducers:{
        setTransaction(state,action:PayloadAction<ITransactionData>){
            state.transactionState.push(action.payload)
        },
        deleteTransaction(state,actions:PayloadAction<number>){
          const filteredData = state.transactionState.filter(item => item.id !== actions.payload)
          state.transactionState = filteredData
        }
    }

})
export const {setTransaction,deleteTransaction} = transactionsSlice.actions;
export default transactionsSlice.reducer;
