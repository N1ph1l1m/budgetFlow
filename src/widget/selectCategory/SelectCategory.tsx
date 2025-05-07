
import { useEffect, useState } from "react";
import { BiCategoryAlt } from "react-icons/bi";
import ListCategory from "../listCategory/listCategory";
import styles from "../../App/Styles/SelectCategory.module.css"
import Modal from "../ModalWindow/ModalTransaction";
const SelectCategory = ({typeTransaction, selectCategory}) => {
    const [isMenu,setIsMenu] = useState();
    const [category,setCategory]  = useState("");
    function handlerMenu(){
        setIsMenu(prev=>!prev)
    }
    const  handleSelectItem = (category:object)=>{
      setCategory(category)
      selectCategory(category.name)
    }
    return (

        <div className={styles.selectCategoryWrap}>
            <div className={styles.headerCategory} ><span><BiCategoryAlt color="green" size="40"/></span><span className={styles.titleCategory}>{category?.name}</span></div>
            <button className={styles.isMenuButton} onClick={()=>handlerMenu()} > Выбрать  категорию</button>
           {isMenu && <Modal>
            <ListCategory typeTransaction={typeTransaction} onSelectItem={handleSelectItem} close={()=>handlerMenu()} />
           </Modal>
            }
        </div>
    );
};

export default SelectCategory;
