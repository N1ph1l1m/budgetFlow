import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { BiCategoryAlt } from "react-icons/bi";
import ListCategory from "../listCategory/ListCategory";
import styles from "../../App/Styles/SelectCategory.module.css";
import Modal from "../../shared/ModalWindow/ModalTransaction";
import { isModalCategory ,closeModalCategory} from "../../store/Slice/modalTransaction/modalTransactionSlice";
import { useTranslation } from "react-i18next";
const SelectCategory = () => {
  const { modalCategory,} = useSelector(
    (state: RootState) => state.modalTransactionSlice
  );
  const {category} = useSelector((state:RootState)=>state.modalTransactionSlice.transactionParametrs)
  const dispatch = useDispatch();
  const {t} = useTranslation()
  function closeModal(){
    dispatch(closeModalCategory())
  }
  return (
    <div className={styles.selectCategoryWrap}>
      <div className={styles.headerCategory}>
        <span>
            {category.icon ? <img style={{width:"40px"}} src={category.icon} alt={`iconCategory`}/> : <BiCategoryAlt color="green" size="40" />}
        </span>
        <span className={styles.titleCategory}>{  category?  category.name : ""}</span>
      </div>
      <button
        className={styles.isMenuButton}
        onClick={() => dispatch(isModalCategory())}
      >
        {" "}
        {t("selectCategory")}
      </button>
      {modalCategory && (
        <Modal title="Категории" children={<ListCategory />} closeModal={()=>closeModal()}/>


      )}
    </div>
  );
};

export default SelectCategory;
