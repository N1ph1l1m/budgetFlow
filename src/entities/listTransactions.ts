import {ITransactionData}  from "../store/Slice/transactionsSlice/transactionsSlice"
 interface IFilteredTransaction{
  state:ITransactionData[],
  updatedDay : Date | number,
  updatedMonth :number,
  transaction:number | string,
}




 export function filteredTransactions({state,updatedDay,updatedMonth,transaction}:IFilteredTransaction){
   return  state?.filter((item) => {
      const itemDate = new Date(item.date);
      const itemDay = itemDate.getUTCDate();
      const itemMonth = itemDate.getUTCMonth() + 1;

      return (
        itemDay === updatedDay &&
        itemMonth === updatedMonth &&
        item.typeOperation === transaction
      );
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
