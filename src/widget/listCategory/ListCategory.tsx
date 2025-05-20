import styles from "../../app/styles/ListCategory.module.css";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  closeModalCategory,
  setSelectCategory,
} from "../../store/Slice/modalTransaction/modalTransactionSlice";
import { CateroryTransaction } from "../../app/data/Data";
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
  function selectCategory(id: number, name: string, icon: string) {
    dispatch(setSelectCategory({ id: id, name: name, icon: icon }));
    closeModal();
  }
  const filterCategory = categoryList.filter(
    (item) => item.type_transaction.name === typeTransaction[0].name
  );
  return (
    <div className={styles.listWrap}>
      <div className={styles.headerModal}>
        <BsClipboard2PlusFill
          color={
            typeTransaction[0].name === "income"
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
              selectCategory(category.id, category.name, category.icon)
            }
            key={category.id}
            value={category.key}
          >
            <img
              className={styles.categoryListIcon}
              src={category.icon}
              alt={category.id}
            />{" "}
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListCategory;
