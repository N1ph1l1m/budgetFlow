import styles from "../../app/styles/ListCategory.module.css";

import { useDispatch, useSelector} from "react-redux";
import { RootState } from "../../store";
import { closeModalCategory,setSelectCategory } from "../../store/Slice/modalTransaction/modalTransactionSlice";
import { CateroryTransaction } from "../../app/data/Data";
import { IoMdClose } from "react-icons/io";
import { BsClipboard2PlusFill } from "react-icons/bs";
const ListCategory = () => {

  const dispatch = useDispatch();
  const {typeTransaction} = useSelector((state:RootState)=>state.modalTransactionSlice)

  function closeModal(){
    dispatch(closeModalCategory())
  }
  function selectCategory(category:string){
    dispatch(setSelectCategory(category))
    closeModal()
  }
  return (
    <div className={styles.listWrap}>
      <div className={styles.headerModal}>
        <BsClipboard2PlusFill color = {typeTransaction  === "income" ? "rgb(93,126,88)" : "rgb(181,53,52)"  }
                size="20" />
        <h1 className={styles.titleModal}>Категории</h1>
        <button className={styles.closeModal} onClick={()=>closeModal()}>
          <IoMdClose color="black" size="20" />
        </button>
      </div>
      <ul className={styles.categoryListWrap}>
        {CateroryTransaction[typeTransaction].map((category) => (
          <li onClick={()=>selectCategory(category.name)} key={category.id} value={category.key}>
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListCategory;
