
import styles from "../../App/Styles/ModalTransaction.module.css"
import { PropsWithChildren } from "react";
const Modal = ({children}:PropsWithChildren) => {
    return (
        <div className={styles.modal}>
                {children}
            </div>
    );
};

export default Modal;
