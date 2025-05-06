

import styles from "../../App/Styles/InputTransaction.module.css";
import { useDispatch , useSelector} from "react-redux";
import { setTransaction} from "../../Store/Slice/transactionsSlice/transactionsSlice"
import { useState,  ChangeEvent ,  useEffect} from "react";
import { RootState } from "../../Store";
import { RateButton,IncomeButton } from "./TransactionButtons/TransactionButtons";
import { CateroryTransaction } from "../../App/Data/Data";
interface IInputItem {
    title:string,
    typeItem:string,
    categories:ICategory[],
}
interface ICategory{
  id:number,
  key:string,
  name:string
}
export const InputTransaction = ({title,}:IInputItem) => {
  const dispatch = useDispatch();
  const selectorOpeation  = useSelector((state:RootState)=> state.transactionsSlice)

  const [category,setCategory] = useState("");
  const [itemName,setItemName] = useState("");
  const [price,setPrice]  = useState(0);
  const [typeTransaction, setTypeTransaction] = useState("rate");


  function  handlerPrice(e: ChangeEvent<HTMLInputElement>) {
    const digitsOnly = e.target.value.replace(/\D/g, '');
    setPrice(digitsOnly)
  }
  function handlerCategory(e: ChangeEvent<HTMLSelectElement>){
    setCategory(e.target.value)
  }
  function handlerItemName(e: ChangeEvent<HTMLInputElement>){
    setItemName(e.target.value)
  }

  function addItem(){
  if(!category) {
    alert("Выберите категорию")
    return;
  }
  if(!itemName) {
      alert("Введите наименование товара/услуги")
    return;
  }
  if(!price) {
      alert("Введите цену")
    return;
  }

  dispatch(setTransaction({
    id:new Date(),
    category:category,
    itemName:itemName,
    price:price,
    date:new Date(),
    typeOperation: typeTransaction === "income"? "income" : "rate"}))
  }

  function clearInput(){
    if(price === 0 || price === "0" ){
      setPrice("")
    }
  }

  return (
    <>
      <div className={styles.mainWrap}>
        <h1>Новая транзакция</h1>
      <div className={styles.inputWrap}>
            <input style={{color: price >0 ? "black" : "gray"}} className={styles.inputPrice} value={price}  onClick={()=>clearInput()} onChange={(e)=>handlerPrice(e)}   inputMode="numeric"  type="text" name="price" /><span style={{fontSize:"24px"}}>{`\u20BD`}</span>
          </div>

                <div className={styles.buttonsWrap}>
                <RateButton typeTransaction={typeTransaction} onClick={() => setTypeTransaction("rate")}/>
        <IncomeButton  typeTransaction={typeTransaction} onClick={() => setTypeTransaction("income")}  />

                </div>

        <div className={styles.inputMainWrap}>
          <div className={styles.inputWrap}>
            <label htmlFor="category">
              <span className={styles.inputTitle}>Выбрать категорию </span>
            </label>

            <select className={`${styles.inputItem} ${styles.selectItem}`} onChange={(e)=>handlerCategory(e)} name="category">
              <option value=""></option>
              {CateroryTransaction[typeTransaction].map((category:ICategory)=>(
                <option  key={category.id} value={category.key}>{category.name}</option>
              ))}
            </select>
          </div>

         <div className={styles.inputWrap}>
            <input placeholder="Описание"  className={styles.inputItem} onChange={(e)=>handlerItemName(e)} value={itemName} type="text" name="nameItem" />
          </div>


        </div>
        <button  onClick={()=>addItem()}className={styles.addItem} style={{backgroundColor: typeTransaction === "income"? "rgb(93,126,88)" : "rgb(181,53,52)"}} >Добавить </button>

      </div>
    </>
  );
};
