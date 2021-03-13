import React, { useState } from "react";
import ReactModal from "react-modal";
import { useDispatch } from "react-redux";

import { addOrder } from "../../store/reducers/orderSlice";
import { change } from "../../store/reducers/modalSlice";
import styles from "./AddOrder.module.css";

const fields = [
  {
    name: "id",
    holder: "ИИН",
    type: "number",
  },
  {
    name: "name",
    holder: "ФИО",
  },
  {
    name: "status",
    holder: "Статус",
  },
  {
    name: "operator",
    holder: "Оператор",
  },
];

function AddOrder({ isOpen }) {
  const dispatch = useDispatch();
  const [data, setData] = useState({});

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setData({});
    dispatch(addOrder(data));
    dispatch(change(false));
  };

  const isInvalid = () => {
    return fields.some((field) => !data[field.name]);
  };

  return (
    <ReactModal
      className={styles.modal}
      overlayClassName={styles.overlay}
      onRequestClose={() => dispatch(change(false))}
      isOpen={isOpen}
    >
      <h2>Добавление заказа</h2>
      <form className={styles.form}>
        {fields.map(({ name, holder, type }) => (
          <input
            key={name}
            value={data[name]}
            name={name}
            placeholder={holder}
            onChange={handleChange}
            type={type || "text"}
          />
        ))}
        <button type="submit" onClick={handleSubmit} disabled={isInvalid()}>
          Добавить
        </button>
      </form>
    </ReactModal>
  );
}

export default AddOrder;
