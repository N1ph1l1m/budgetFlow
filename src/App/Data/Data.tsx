



interface ICategory{
    id : number,
    key:string,
    name:string
}


interface ICategoryTransaction{
    rate:ICategory[],
    income:ICategory[],
}

export  const  CateroryTransaction:ICategoryTransaction = {
    rate:[
        { id: 1, key: "home", name: "Дом" },
        { id: 2, key: "food", name: "Еда" },
        { id: 3, key: "commun", name: "ЖКХ" },
        { id: 4, key: "car", name: "Авто/Дорога" },
        { id: 5, key: "clothes", name: "Одежда" },
        { id: 6, key: "pets", name: "Питомцы" },
        { id: 7, key: "subscriptions", name: "Подписки" },
        { id: 8, key: "study", name: "Образование" },
        { id: 9, key: "pharmacy", name: "Аптечка" },
        { id: 10, key: "entertainment", name: "Развлечения" },
    ],
    income:[
        { id: 1, key: "salary", name: "Зарплата" },
        { id: 2, key: "secondJod", name: "Подработка" },
        { id: 3, key: "gift", name: "Подарок" },
      ]
}
