import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ITransactionData {
    id: number;
    category:string,
    itemName: string;
    price: number;
    date: Date ;
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
        "date": "2025-04-05T07:15:23Z",
        "typeOperation": "rate"

      },
      {
        "id": 1742288245868,
        "category": "food",
        "itemName": "Капучино",
        "price": 10,
        "date": "2025-05-05T07:58:44Z",
        "typeOperation": "rate"
      },
      {
        "id": 1742288267924,
        "category": "food",
        "itemName": "secondJod",
        "price": 1000,
        "date": "2025-05-05T08:07:11Z",
        "typeOperation": "income"
      },
      {
        "id": 1742288285220,
        "category": "secondJod",
        "itemName": "Верстка",
        "price": 1000,
        "date": "2025-05-05T08:39:02Z",
        "typeOperation": "income"
      },
      {
        "id": 1742288400356,
        "category": "pharmacy",
        "itemName": "Цитрамон",
        "price": 3,
        "date": "2025-05-05T08:52:35Z",
        "typeOperation": "rate"
      },
      {
        "id": 1742288414171,
        "category": "clothes",
        "itemName": "Кроссовки",
        "price": 450,
        "date": "2025-05-05T09:06:47Z",
        "typeOperation": "rate"
      },
      {
        "id": 1742288436196,
        "category": "pets",
        "itemName": "Корм",
        "price": 10,
        "date": "2025-05-05T09:33:29Z",
        "typeOperation": "rate"
      },
      {
        "id": 1742288455605,
        "category": "study",
        "itemName": "Первая сессия",
        "price": 1800,
        "date": "2025-05-05T09:59:58Z",
        "typeOperation": "rate"
      },
      {
        "id": 1742288765325,
        "category": "subscriptions",
        "itemName": "Музыка",
        "price": 25,
        "date": "2025-05-05T10:12:00Z",
        "typeOperation": "rate"
      },
      {
        "id": 1742288776853,
        "category": "car",
        "itemName": "Заправка",
        "price": 400,
        "date": "2025-05-05T10:41:36Z",
        "typeOperation": "rate"
      },
      {
        "id": 1742290027869,
        "category": "salary",
        "itemName": "Зарплата",
        "price": 7999,
        "date": "2025-05-05T11:03:50Z",
        "typeOperation": "income"
      },
      {
        "id": 1742290169310,
        "category": "secondJod",
        "itemName": "Сервер",
        "price": 200132,
        "date": "2025-05-05T11:38:24Z",
        "typeOperation": "income"
      },
      {
        "id": 1742290170000,
        "category": "food",
        "itemName": "Сэндвич",
        "price": 12,
        "date": "2025-05-05T12:07:15Z",
        "typeOperation": "rate"
      },
      {
        "id": 1742290171000,
        "category": "food",
        "itemName": "Йогурт",
        "price": 7,
        "date": "2025-05-05T12:28:59Z",
        "typeOperation": "rate"
      },
      {
        "id": 1742290172000,
        "category": "pharmacy",
        "itemName": "Витамины",
        "price": 15,
        "date": "2025-05-05T12:54:03Z",
        "typeOperation": "rate"
      },
      {
        "id": 1742290173000,
        "category": "transport",
        "itemName": "Проезд",
        "price": 3,
        "date": "2025-05-05T13:00:41Z",
        "typeOperation": "rate"
      },
      {
        "id": 1742290174000,
        "category": "leisure",
        "itemName": "Кино",
        "price": 20,
        "date": "2025-05-05T13:17:22Z",
        "typeOperation": "rate"
      },
      {
        "id": 1742290175000,
        "category": "home",
        "itemName": "Мыло",
        "price": 4,
        "date": "2025-05-05T13:30:46Z",
        "typeOperation": "rate"
      },
      {
        "id": 1742290176000,
        "category": "internet",
        "itemName": "Мобильный интернет",
        "price": 10,
        "date": "2025-05-05T13:42:51Z",
        "typeOperation": "rate"
      },
      {
        "id": 1742290177000,
        "category": "books",
        "itemName": "Книга",
        "price": 30,
        "date": "2025-05-05T13:59:10Z",
        "typeOperation": "rate"
      },
      {
        id: 1742291000001,
        category: "food",
        itemName: "Чай",
        price: 5,
        date: "2025-05-06T08:00:00Z",
        typeOperation: "rate"
      },
      {
        id: 1742291000002,
        category: "transport",
        itemName: "Такси",
        price: 250,
        date: "2025-05-06T09:30:00Z",
        typeOperation: "rate"
      },
      {
        id: 1742291000003,
        category: "salary",
        itemName: "Фриланс",
        price: 1500,
        date: "2025-05-06T10:00:00Z",
        typeOperation: "income"
      },
      {
        id: 1742291000004,
        category: "bonus",
        itemName: "Бонус",
        price: 300,
        date: "2025-05-06T11:15:00Z",
        typeOperation: "income"
      },

      // 7 мая 2025
      {
        id: 1742292000001,
        category: "pharmacy",
        itemName: "Пластыри",
        price: 8,
        date: "2025-05-07T08:10:00Z",
        typeOperation: "rate"
      },
      {
        id: 1742292000002,
        category: "leisure",
        itemName: "Кафе",
        price: 60,
        date: "2025-05-07T09:45:00Z",
        typeOperation: "rate"
      },
      {
        id: 1742292000003,
        category: "secondJod",
        itemName: "Дизайн",
        price: 2000,
        date: "2025-05-07T11:00:00Z",
        typeOperation: "income"
      },
      {
        id: 1742292000004,
        category: "gift",
        itemName: "Подарок",
        price: 500,
        date: "2025-05-07T12:30:00Z",
        typeOperation: "income"
      },

      // 8 мая 2025
      {
        id: 1742293000001,
        category: "subscriptions",
        itemName: "Фильмы",
        price: 15,
        date: "2025-05-08T07:50:00Z",
        typeOperation: "rate"
      },
      {
        id: 1742293000002,
        category: "food",
        itemName: "Пицца",
        price: 120,
        date: "2025-05-08T13:20:00Z",
        typeOperation: "rate"
      },
      {
        id: 1742293000003,
        category: "investment",
        itemName: "Криптовалюта",
        price: 500,
        date: "2025-05-08T14:10:00Z",
        typeOperation: "income"
      },
      {
        id: 1742293000004,
        category: "salary",
        itemName: "Проект",
        price: 2500,
        date: "2025-05-08T15:00:00Z",
        typeOperation: "income"
      },

      // 9 мая 2025
      {
        id: 1742294000001,
        category: "clothes",
        itemName: "Рубашка",
        price: 300,
        date: "2025-05-09T09:00:00Z",
        typeOperation: "rate"
      },
      {
        id: 1742294000002,
        category: "pets",
        itemName: "Игрушка",
        price: 40,
        date: "2025-05-09T10:30:00Z",
        typeOperation: "rate"
      },
      {
        id: 1742294000003,
        category: "secondJod",
        itemName: "Тестирование",
        price: 1000,
        date: "2025-05-09T11:45:00Z",
        typeOperation: "income"
      },
      {
        id: 1742294000004,
        category: "gift",
        itemName: "Перевод",
        price: 150,
        date: "2025-05-09T13:00:00Z",
        typeOperation: "income"
      },

      // 10 мая 2025
      {
        id: 1742295000001,
        category: "transport",
        itemName: "Автобус",
        price: 5,
        date: "2025-05-10T07:00:00Z",
        typeOperation: "rate"
      },
      {
        id: 1742295000002,
        category: "food",
        itemName: "Завтрак",
        price: 20,
        date: "2025-05-10T08:30:00Z",
        typeOperation: "rate"
      },
      {
        id: 1742295000003,
        category: "salary",
        itemName: "Основная работа",
        price: 5000,
        date: "2025-05-10T10:00:00Z",
        typeOperation: "income"
      },
      {
        id: 1742295000004,
        category: "bonus",
        itemName: "Приз",
        price: 250,
        date: "2025-05-10T12:00:00Z",
        typeOperation: "income"
      }
    ]

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
