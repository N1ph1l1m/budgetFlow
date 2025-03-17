

import styles from "../../App/Styles/InputItem.module.css";
import { useDispatch} from "react-redux";
import { setTransaction} from "../../Store/Slice/transactionsSlice/transactionsSlice"
import { useState,  ChangeEvent } from "react";

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
export const InputItem = ({title,typeItem,categories}:IInputItem) => {
  const dispatch = useDispatch();

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
    itemName:itemName,
    price:price,
    date:new Date(),
    typeOperation: typeItem === "income"? "income" : "rate"}))
  }



  return (
    <>
      <div className={styles.mainWrap}>
        <div className={styles.wrapCard} style={{backgroundColor: typeItem === "income"? "rgb(0, 4, 255)" : "rgba(255, 0, 0, 0.247 )" }}>
          <span className={styles.titleCard} style={{color: typeItem === "income"? "#ffffff" : "rgb(88, 88, 88)"}}>{title}</span>
        </div>

        <div className={styles.inputMainWrap}>
          <div className={styles.inputWrap}>
            <label htmlFor="category">
              <span className={styles.categoryTitle}>Категории</span>
            </label>

            <select className={styles.categoryWrap} onChange={(e)=>handlerCategory(e)} name="category">
              <option value=""></option>
              {categories.map((category:ICategory)=>(
                <option  key={category.id} value={category.key}>{category.name}</option>
              ))}
            </select>
          </div>
         <div className={styles.inputWrap}>
            <label htmlFor="nameItem">
              <span className={styles.categoryTitle}>
                Название товара/услуги
              </span>
            </label>
            <input className={styles.inputItem} onChange={(e)=>handlerItemName(e)} value={itemName} type="text" name="nameItem" />
          </div>
          <div className={styles.inputWrap}>
            <label htmlFor="price">
              <span className={styles.categoryTitle}>Цена</span>
            </label>
            <input className={styles.inputPrice}  onChange={(e)=>handlerPrice(e)} step={0.50} type="number" name="price" />
          </div>
          <button  onClick={()=>addItem()}className={styles.addItem} style={{backgroundColor: typeItem === "income"? "rgb(0, 4, 255)" : "rgba(255, 0, 0, 0.247 )" , color: typeItem === "income"? "#ffffff" : "rgb(88, 88, 88)"}} >Добавить </button>
        </div>

      </div>
    </>
  );
};
