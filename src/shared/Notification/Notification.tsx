import styles from "../../app/styles/Notification.module.css"
import { useSelector } from "react-redux";
import { RootState } from "../../store";
const Notification = () => {

    const {status,textMessage} = useSelector((state:RootState)=>state.notificationSlice)
    return (
        <>     {status !== "off" &&   (  <div className={styles.notificationWrap}>
            <span className={`${styles.textMessage}
            ${status === "success" ? styles.success : styles.error }`} >{textMessage}</span>
        </div>) }
        </>


    );
};

export default Notification;
