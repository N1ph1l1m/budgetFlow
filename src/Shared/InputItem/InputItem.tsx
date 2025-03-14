import styles from "../../App/Styles/InputItem.module.css";
interface IInputItem {
    title:string,
    typeItem:string,
}
export const InputItem = ({title,typeItem}:IInputItem) => {
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

            <select className={styles.categoryWrap} name="category">
              <option value=""></option>
              <option value="home">Дом</option>
              <option value="food">Еда</option>
              <option value="commun">Коммуналка</option>
              <option value="commun">Аптечка</option>
              <option value="car">Машина/Транспорт</option>
              <option value="car">Развлечения</option>
              <option value="clothes">Одежда</option>
              <option value="pets">Домашние животные</option>
              <option value="subscriptions">Подписки</option>
              <option value="study">Учеба</option>
            </select>
          </div>
         <div className={styles.inputWrap}>
            <label htmlFor="nameItem">
              <span className={styles.categoryTitle}>
                Название товара/услуги
              </span>
            </label>
            <input className={styles.inputItem} type="text" name="nameItem" />
          </div>


          <div className={styles.inputWrap}>
            <label htmlFor="price">
              <span className={styles.categoryTitle}>Цена</span>
            </label>
            <input className={styles.inputPrice} type="number" name="price" />
          </div>
          <button className={styles.addItem} style={{backgroundColor: typeItem === "income"? "rgb(0, 4, 255)" : "rgba(255, 0, 0, 0.247 )" , color: typeItem === "income"? "#ffffff" : "rgb(88, 88, 88)"}} >Добавить </button>
        </div>
      </div>
    </>
  );
};
