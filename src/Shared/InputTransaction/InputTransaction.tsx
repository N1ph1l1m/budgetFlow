

import styles from "../../App/Styles/InputTransaction.module.css";
import { useDispatch , useSelector} from "react-redux";
import { setTransaction} from "../../Store/Slice/transactionsSlice/transactionsSlice"
import { useState,  ChangeEvent ,  useEffect} from "react";
import { RootState } from "../../Store";

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
export const InputTransaction = ({title,typeItem,categories}:IInputItem) => {
  const dispatch = useDispatch();
  const selectorOpeation  = useSelector((state:RootState)=> state.transactionsSlice)

  const [category,setCategory] = useState("food");
  const [itemName,setItemName] = useState("Кофе");
  const [price,setPrice]  = useState("");



  function  handlerPrice(e: ChangeEvent<HTMLInputElement>) {
    setPrice(e.target.value)
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
    id:Date.now(),
    category:category,
    itemName:itemName,
    price:price,
    date:new Date(),
    typeOperation: typeItem === "income"? "income" : "rate"}))
  }



  return (
    <>
      <div className={styles.mainWrap}>
        <div className={styles.wrapCard} style={{backgroundColor: typeItem === "income"? "rgb(93,126,88)" : "rgb(181,53,52)" }}>
          <span className={styles.titleCard}>{title}</span>
        </div>

        <div className={styles.inputMainWrap}>
          <div className={styles.inputWrap}>
            <label htmlFor="category">
              <span className={styles.inputTitle}>Категории</span>
            </label>

            <select className={styles.inputItem} onChange={(e)=>handlerCategory(e)} name="category">
              <option value=""></option>
              {categories.map((category:ICategory)=>(
                <option  key={category.id} value={category.key}>{category.name}</option>
              ))}
            </select>
          </div>

         <div className={styles.inputWrap}>
            <label htmlFor="nameItem">
              <span className={styles.inputTitle}>
                Название товара/услуги
              </span>
            </label>
            <input className={styles.inputItem} onChange={(e)=>handlerItemName(e)} value={itemName} type="text" name="nameItem" />
          </div>
          <div className={styles.inputWrap}>
            <label htmlFor="price">
              <span className={styles.inputTitle}>Цена</span>
            </label>
            <input className={styles.inputPrice}  onChange={(e)=>handlerPrice(e)} step={0.50} type="number" name="price" />
          </div>
          <button  onClick={()=>addItem()}className={styles.addItem} style={{backgroundColor: typeItem === "income"? "rgb(93,126,88)" : "rgb(181,53,52)"}} >Добавить </button>
        </div>

      </div>
    </>
  );
};
