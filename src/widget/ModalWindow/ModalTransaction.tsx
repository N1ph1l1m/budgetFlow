
import styles from "../../App/Styles/ModalTransaction.module.css"
import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { useState,useEffect } from "react";


const Modal = ({children}:PropsWithChildren) => {

    const [portal, setPortal] = useState<HTMLElement | null>(null);

    useEffect(() => {
        setPortal(document.getElementById('portal'));

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    if (!portal) return null;



    return (<>
     {   createPortal(  <div className={styles.modal}>
                    {children}
                </div>,portal)}

            </>)
};

export default Modal;
