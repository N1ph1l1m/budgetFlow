import styles from "../../app/styles/ListCategory.module.css";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  closeModalCategory,
  ISelectCategory,
  setSelectCategory,
} from "../../store/Slice/modalTransaction/modalTransactionSlice";
import { IoMdClose } from "react-icons/io";
import { BsClipboard2PlusFill } from "react-icons/bs";
const ListCategory = () => {
  const dispatch = useDispatch();
  const { typeTransaction } = useSelector(
    (state: RootState) => state.modalTransactionSlice
  );
  const { categoryList } = useSelector(
    (state: RootState) => state.transactionsSlice
  );

  function closeModal() {
    dispatch(closeModalCategory());
  }
  function selectCategory(category:ISelectCategory) {
    dispatch(setSelectCategory([category]));
    closeModal();
  }
  const filterCategory = categoryList.filter(
    (item) => item.type_transaction.name === typeTransaction.name
  );
  return (
    <div className={styles.listWrap}>
      <div className={styles.headerModal}>
        <BsClipboard2PlusFill
          color={
            typeTransaction.name === "income"
              ? "rgb(93,126,88)"
              : "rgb(181,53,52)"
          }
          size="20"
        />
        <h1 className={styles.titleModal}>Категории</h1>
        <button className={styles.closeModal} onClick={() => closeModal()}>
          <IoMdClose color="black" size="20" />
        </button>
      </div>
      <ul className={styles.categoryListWrap}>
        {filterCategory.map((category) => (
          <li
            className={styles.categoryListItem}
            onClick={() =>
              selectCategory({id:category.id, name:category.name, icon:category.icon})
            }
            key={category.id}
            value={category.id}
          >
            <img
              className={styles.categoryListIcon}
              src={category.icon}
              alt={`${category.id}`}
            />{" "}
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListCategory;
