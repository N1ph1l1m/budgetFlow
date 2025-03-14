import styles from "../../App/Styles/InputItem.module.css";
export const InputItem = () => {
  return (
    <>
      <div className={styles.mainWrap}>
        <div className={styles.wrapCard}>
          <span className={styles.titleCard}>Расходы</span>
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
              <option value="car">Машина</option>
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
          <button className={styles.addItem}>Добавить </button>
        </div>
      </div>
    </>
  );
};
