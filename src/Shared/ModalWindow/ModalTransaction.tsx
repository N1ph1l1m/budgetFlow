import styles from "../../App/Styles/ModalTransaction.module.css";
import {ReactNode } from "react";
import { createPortal } from "react-dom";
import { useState, useEffect } from "react";

import { IoMdClose } from "react-icons/io";

interface IModalTransaction{
  title:string,
  closeModal: ()=>void ,
  children: ReactNode
}

const Modal = ({ title,closeModal,children }: IModalTransaction) => {
  const [portal, setPortal] = useState<HTMLElement | null>(null);
  useEffect(() => {
    setPortal(document.getElementById("portal"));

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (!portal) return null;

  return (
    <>{createPortal(<div className={styles.modal}>

      <div className={styles.modalWrap}>
              <header className={styles.headeWrap}>
        <h1 className={styles.titleHeader}>{title}</h1>
        <button
          className={styles.closeModal}
          onClick={() => closeModal()}
        >
          <IoMdClose color="black" size="20" />
        </button>
      </header>
      <div>
      {children}
      </div>

      </div>

      </div>, portal)}</>
  );
};

export default Modal;
