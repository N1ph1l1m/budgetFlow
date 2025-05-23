import {ITransactionData}  from "../store/Slice/transactionsSlice/transactionsSlice"

 interface IFilteredTransaction{
  state:ITransactionData[],
  updatedDay?: Date | number,
  updatedMonth? :number,
  updatedYear? :number,
  transaction?:number | string,
}


 export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


 export function filteredTransactions({state,updatedDay,updatedMonth,updatedYear,transaction}:IFilteredTransaction){
    const filterTransition = state.flat()
   return  filterTransition.filter((item) => {
      const itemDate = new Date(item.date);
      const itemDay = itemDate.getUTCDate();
      const itemMonth = itemDate.getUTCMonth() + 1;
      const itemYear = itemDate.getUTCFullYear()

      return (
        itemDay === updatedDay &&
        itemMonth === updatedMonth &&
        itemYear === updatedYear
        &&
        item.category.type_transaction.name === transaction
      );
    });
          // console.log(filter);
  }
   export function filteredTransactionMonth({state,updatedMonth,updatedYear,transaction}:IFilteredTransaction){
    const filterMonth  = state.flat();

     return  filterMonth.filter((item) => {
      const itemDate = new Date(item.date);
      const itemMonth = itemDate.getUTCMonth() + 1;
      const itemYear = itemDate.getUTCFullYear()

      return (
        itemMonth === updatedMonth &&
        itemYear === updatedYear

        &&
        item.category.type_transaction.name === transaction
      );
    });
  }


export function filteredTransactionsCustom({
  state,
  transaction,
}: {
  state: ITransactionData[];
  transaction: string;
}): ITransactionData[] {
  return state.filter(
    (item) => item.category?.type_transaction?.name === transaction
  );
}

  export function filteredTransactionAllMonth({state,updatedMonth,updatedYear,}:IFilteredTransaction){

   return  state?.flat()
   .filter((item) => {
      const itemDate = new Date(item.date);
      const itemMonth = itemDate.getUTCMonth() + 1;
      const itemYear = itemDate.getUTCFullYear()

      return (itemMonth === updatedMonth && itemYear === updatedYear);
    });
  }


export function groupByTranssaction(filteredList:ITransactionData[]){

  return   filteredList?.reduce((acc:Record<string, typeof product[]>, product) => {
      const category:string = product.category.name;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {} as Record<string, typeof filteredList[0][]>);

  }


export function getCategorySums(list: Record<string, ITransactionData[]>){
  return   Object.entries(list).map(([description, items]) => {
  const sum = items.reduce((acc, item) => acc + item.price, 0);
  return { name: capitalizeFirstLetter(description), value: sum };
});
}
