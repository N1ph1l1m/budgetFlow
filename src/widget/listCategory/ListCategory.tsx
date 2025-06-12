import styles from "../../app/styles/ListCategory.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  closeModalCategory,
  ISelectCategory,
  setCategoryTransaction,
  updateCategoryTransaction,
} from "../../store/Slice/modalTransaction/modalTransactionSlice";
import { useTranslation } from "react-i18next";
import { translateCategory } from "../../entities/translateCategory";
const ListCategory = () => {
  const dispatch = useDispatch();
  const { typeTransaction,isUpdate } = useSelector(
    (state: RootState) => state.modalTransactionSlice
  );
  const { categoryList } = useSelector(
    (state: RootState) => state.transactionsSlice
  );
  const {t} = useTranslation();

  function closeModal() {
    dispatch(closeModalCategory());
  }
  function selectCategory(category:ISelectCategory) {
    if(isUpdate){
      dispatch(updateCategoryTransaction(category.id))
    }else{
     dispatch(setCategoryTransaction(category));
    }
    closeModal();
  }
  const filterCategory = categoryList.filter(
    (item) => item.type_transaction.name === typeTransaction.name
  );

  return (
    <>
      <ul className={styles.categoryListWrap}>
        {filterCategory.map((category) => (
          <li
            className={styles.categoryListItem}
            onClick={() =>(selectCategory({ id: category.id, name: category.name, icon: category.icon }))
            }
            key={category.id}
            value={category.id}
          >
            <img
              className={styles.categoryListIcon}
              src={category.icon}
              alt={`${category.id}`}
            />{" "}
            {translateCategory(t,category.name)}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ListCategory;
