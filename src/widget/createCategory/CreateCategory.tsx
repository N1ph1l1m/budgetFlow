import { useState, ChangeEvent, useEffect, FormEvent } from "react";
import styles from "../../app/styles/CreateCategory.module.css";
import { param } from "../../app/params/param";
import axios from "axios";
import { updateListCategory } from "../../entities/crud/getListCategory";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const CreateCategory = () => {
  type typeMessage = "off" | "error" | "success";
  const dispatch = useDispatch();
  interface ICreateMessage {
    typeMessage: typeMessage;
    message: string;
  }

  const [inputName, setInputName] = useState("");
  const [selectTransaction, setSelectTransaction] = useState("");
  const [icon, setIcon] = useState<File | string>("");
  const [isMesssage, setIsMessage] = useState<typeMessage>("off");
  const [textMessage, setTextMessage] = useState("");
    const { t } = useTranslation();

  function createMessage({ typeMessage, message }: ICreateMessage) {
    setIsMessage(typeMessage);
    setTextMessage(message);
  }

  function clearForm() {
    setInputName("");
    setIcon("");
    setSelectTransaction("");
    updateListCategory({ dispatch });
  }

  function handleInputName(e: ChangeEvent<HTMLInputElement>) {
    const name = e.target.value;
    setInputName(name);
  }
  function selectTypeTransaction(e: ChangeEvent<HTMLSelectElement>) {
    const select = e.target.value;
    setSelectTransaction(select);
  }

  function selectFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setIcon(file);
    }
  }

  function validateForm(): string | null {
    if (!inputName && !selectTransaction && icon) return "Заполните поля формы";
    if (inputName.trim().length == 0) return "Введите название категории";
    if (selectTransaction.trim().length == 0) return "Выберите тип транзакции";
    // if (!icon || !(icon instanceof File)) return "Загрузите иконку категории"
    return null;
  }

  interface ICreateCategory {
    name: string;
    transaction: string;
    icon: File;
  }
  async function sendCreateCategoryRequest({
    name,
    transaction,
    icon,
  }: ICreateCategory) {
    const idOwner = localStorage.getItem("id");
    if (!idOwner) {
      createMessage({ typeMessage: "error", message: "Ошибка авторизации" });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("icon", icon);
      formData.append("type_transaction", transaction);
      formData.append("owner_category", idOwner);
      const url = `${param.baseUser}budget/create_category/`;
      const request = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = await request.data;
      console.log(data);
    } catch (error) {
      createMessage({ typeMessage: "error", message: `${error}` });
    }
  }

  async function createCategory(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errorMessage = validateForm();
    if (errorMessage) {
      createMessage({ typeMessage: "error", message: errorMessage });
      return;
    }
    await sendCreateCategoryRequest({
      name: inputName,
      transaction: selectTransaction,
      icon: icon as File,
    });

    await clearForm();
  }

  useEffect(() => {
    console.log(selectTransaction);
  }, [selectTransaction]);

  useEffect(() => {
    console.log(icon);
  }, [icon]);

  return (
    <>
      <form className={styles.wrapContent} onSubmit={createCategory}>
        {isMesssage !== "off" && (
          <span
            className={`${
              isMesssage == "success"
                ? styles.messageSuccess
                : styles.messageError
            }`}
          >
            {textMessage}
          </span>
        )}
        <label htmlFor="nameCategory">{`${t("nameCategory")}`}</label>

        <input
          id="nameCategory"
          className={styles.inputName}
          type="text"
          placeholder=""
          value={inputName}
          onChange={handleInputName}
        />

        <label htmlFor="selectTransaction">{`${t("typeTransaction")}`}</label>
        <select
          onChange={selectTypeTransaction}
          className={styles.selectTypeTransaction}
          id="selectTransaction"
        >
          <option value="-">-----------</option>
          <option value="1">{`${"rate"}`}</option>
          <option value="2">{`${"income"}`}</option>
        </select>

        <label htmlFor="inputFile">{`${t("iconCategory")}`}</label>
        <input
          onChange={selectFile}
          id="inputFile"
          type="file"
          accept="image/png"
        />
        <button type="submit" className={styles.createCategory}>
          {`${t("addCategory")}`}
        </button>
      </form>
    </>
  );
};

export default CreateCategory;
