import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { BiCategoryAlt } from "react-icons/bi";
import ListCategory from "../listCategory/ListCategory";
import styles from "../../App/Styles/SelectCategory.module.css";
import Modal from "../ModalWindow/ModalTransaction";
import { isModalCategory } from "../../store/Slice/modalTransaction/modalTransactionSlice";
const SelectCategory = () => {
  const { modalCategory, selectCategory } = useSelector(
    (state: RootState) => state.modalTransactionSlice
  );
  const dispatch = useDispatch();

  return (
    <div className={styles.selectCategoryWrap}>
      <div className={styles.headerCategory}>
        <span>
            {selectCategory.length !==0  ? <img style={{width:"40px"}} src={selectCategory.icon} alt={`iconCategory`}/> : <BiCategoryAlt color="green" size="40" />}
        </span>
        <span className={styles.titleCategory}>{  selectCategory.length !== 0 ?  selectCategory.name : ""}</span>
      </div>
      <button
        className={styles.isMenuButton}
        onClick={() => dispatch(isModalCategory())}
      >
        {" "}
        Выбрать категорию
      </button>
      {modalCategory && (
        <Modal>
          <ListCategory />
        </Modal>
      )}
    </div>
  );
};

export default SelectCategory;
