import { isModalInput, ITransactionParametrs, setIsUpdate, setUpdateParametrs } from "../../store/Slice/modalTransaction/modalTransactionSlice";
import styles from "../../app/styles/MenuRedactor.module.css"
import { GoPencil } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

interface MenuRedactorProps {
  className?:string,
  transactionParam: ITransactionParametrs;
  deleteItem?: () => void;
}
export const MenuRedactor = ({ className,transactionParam, deleteItem }: MenuRedactorProps) => {
  const dispatch = useDispatch();
    const { t } = useTranslation();
  function updateTransactions(param: ITransactionParametrs) {
    dispatch(isModalInput());
    dispatch(setIsUpdate());
    dispatch(setUpdateParametrs(param));
  }

  return (
    <ul className={`${styles.menuRedactor} ${className}`}>
      <li onClick={() => updateTransactions(transactionParam)}>
        <GoPencil size={13} color="black" />
        <span>{`${t("edit")}`}</span>
      </li>

      {transactionParam.transaction_id && (
        <li onClick={deleteItem}>
          <MdDelete size={13} color="red" />
          <span>{`${t("delete")}`}</span>
        </li>
      )}
    </ul>
  );
};
