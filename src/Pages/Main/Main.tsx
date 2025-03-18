import styles from "../../App/Styles/Main.module.css"
import { CateroryTransaction } from "../../App/Data/Data"
import { InputItem } from "../../Shared/InputItem/InputItem"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../Store"
export const Main = () =>{
    const [transaction, setTransaction] = useState("")
    const transactionState = useSelector((state:RootState)=> state.transactionsSlice)

    function sumPriceOperation(typeOperation: string):number{
        return  transactionState
        .filter((price) => price.typeOperation === typeOperation)
        .reduce((total,item)=> total + parseInt( item.price,10),0)
    }

    const renderTransaction = ()=>{
        switch (transaction){
            case "rate":
                return <InputItem title="Расходы" typeItem="rate" categories={CateroryTransaction.rate}/>
            break;
            case "income":
                return <InputItem title="Доходы" typeItem="income" categories={CateroryTransaction.income} />
            break;
        }
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
      <th  style={{textAlign:"right" , borderRight:"1px solid rgb(124, 124, 124)"}}>{`${sumPriceOperation('rate')} ₽`}</th>
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
          <td  style={{textAlign:"right" , borderRight:"1px solid rgb(124, 124, 124)"}}>
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


        <button className={`${styles.buttonTransaction} ${styles.rate}`} onClick={()=>setTransaction("rate")}> Добавить расходы</button>
        <button className={`${styles.buttonTransaction} ${styles.income}`} onClick={()=>setTransaction("income")}> Добавить доходы</button>
        {renderTransaction()}

        </div>
        </>
    )
}
