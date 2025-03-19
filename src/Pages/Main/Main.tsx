import styles from "../../App/Styles/Main.module.css"
import { useSelector } from "react-redux"
import { RootState } from "../../Store"
export const Main = () =>{
    const transactionState = useSelector((state:RootState)=> state.transactionsSlice)

    function sumPriceOperation(typeOperation: string):number{
        return  transactionState
        .filter((price) => price.typeOperation === typeOperation)
        .reduce((total,item)=> total + parseInt( item.price,10),0)
    }


    return(
        <>


        <div className={styles.mainWrap}>

        <div className={styles.tableBorder}>
        <table className={styles.tableWrap}>
  <caption>Учет доходов и расходов в марте</caption>
  <thead>
    <tr>
      <th >Расходы</th>
      <th  style={{textAlign:"right" , borderRight:"1px solid black"}}>{`${sumPriceOperation('rate')} ₽`}</th>
      <th>Доходы</th>
      <th  style={{textAlign:"right"}}>{`${sumPriceOperation('income')} ₽`}</th>
    </tr>
  </thead>
  <tbody>
    {(() => {
      const expenses = transactionState.filter((item) => item.typeOperation === "rate");
      const incomes = transactionState.filter((item) => item.typeOperation === "income");
      const maxLength = Math.max(expenses.length, incomes.length);

      return Array.from({ length: maxLength }).map((_, index) => (
        <tr  key={index}>

          <td>
            {expenses[index]?.itemName || ""}
          </td>
          <td  style={{textAlign:"right" , borderRight:"1px solid black"}}>
            {expenses[index]?.price || ""}
          </td>
          <td>
            {incomes[index]?.itemName || ""}
          </td>
          <td  style={{textAlign:"right"}}>
            {incomes[index]?.price || ""}
          </td>
        </tr>
      ));
    })()}
  </tbody>
</table>
        </div>
        </div>
        </>
    )
}
