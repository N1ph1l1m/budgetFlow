import styles from "../../app/styles/ListCategory.module.css";
import { CateroryTransaction } from "../../app/data/Data";
import { IoMdClose } from "react-icons/io";
import { BsClipboard2PlusFill } from "react-icons/bs";
const ListCategory = ({ typeTransaction,close,onSelectItem}) => {

    function handleCategory(item){
        if(item !== 0 ){
            close()
        }
        onSelectItem(item)

    }
  return (
    <div className={styles.listWrap}>
      <div className={styles.headerModal}>
        <BsClipboard2PlusFill color="black" size="20" />
        <h1 className={styles.titleModal}>Категории</h1>
        <button className={styles.closeModal} onClick={close}>
          <IoMdClose color="black" size="20" />
        </button>
      </div>
      <ul className={styles.categoryListWrap}>
        {CateroryTransaction[typeTransaction].map((category: ICategory) => (
          <li onClick={()=>handleCategory(category)} key={category.id} value={category.key}>
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListCategory;
