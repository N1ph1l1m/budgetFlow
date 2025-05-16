import {ITransactionData}  from "../store/Slice/transactionsSlice/transactionsSlice"
 interface IFilteredTransaction{
  state:ITransactionData[],
  updatedDay?: Date | number,
  updatedMonth :number,
  updatedYear? :number,
  transaction?:number | string,
}


 export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


 export function filteredTransactions({state,updatedDay,updatedMonth,updatedYear,transaction}:IFilteredTransaction){
   return  state?.filter((item) => {
      const itemDate = new Date(item.date);
      const itemDay = itemDate.getUTCDate();
      const itemMonth = itemDate.getUTCMonth() + 1;
      const itemYear = itemDate.getUTCFullYear()


      return (
        itemDay === updatedDay &&
        itemMonth === updatedMonth &&
        itemYear === updatedYear &&
        item.typeOperation === transaction
      );
    });
  }
   export function filteredTransactionMonth({state,updatedMonth,updatedYear,transaction}:IFilteredTransaction){
   return  state?.filter((item) => {
      const itemDate = new Date(item.date);
      const itemMonth = itemDate.getUTCMonth() + 1;
      const itemYear = itemDate.getUTCFullYear()

      return (
        itemMonth === updatedMonth &&
        itemYear === updatedYear &&
        item.typeOperation === transaction
      );
    });
  }

  export function filteredTransactionAllMonth({state,updatedMonth,updatedYear,}:IFilteredTransaction){
   return  state?.filter((item) => {
      const itemDate = new Date(item.date);
      const itemMonth = itemDate.getUTCMonth() + 1;
      const itemYear = itemDate.getUTCFullYear()

      return (itemMonth === updatedMonth && itemYear === updatedYear);
    });
  }


export function groupByTranssaction(filteredList:ITransactionData[]){
    return  filteredList.reduce((acc:Record<string, typeof product[]>, product) => {
      const category:string = product.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {} as Record<string, typeof filteredList[0][]>);
  }


export function getCategorySums(list:ITransactionData){
  return   Object.entries(list).map(([category, items]) => {
  const sum = items.reduce((acc, item) => acc + item.price, 0);
  return { name: capitalizeFirstLetter(category), value: sum };
});
}
