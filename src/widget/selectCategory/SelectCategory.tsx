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
          <BiCategoryAlt color="green" size="40" />
        </span>
        <span className={styles.titleCategory}>{selectCategory}</span>
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
