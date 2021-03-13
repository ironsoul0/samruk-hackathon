import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { useSelector, useDispatch } from "react-redux";

import { editOrder } from "../../store/reducers/orderSlice";
import { change } from "../../store/reducers/modalSlice";
import styles from "../addOrder/AddOrder.module.css";

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

function EditOrder({ isOpen }) {
  const { order, modal } = useSelector((state) => state);
  const { orders } = order;
  const { pickedId } = modal;

  const dispatch = useDispatch();
  const [data, setData] = useState({});

  useEffect(() => {
    if (!orders) return;

    const target = orders.find((current) => current.id === pickedId);

    const current = {};

    fields.forEach((field) => {
      current[field.name] = target[field.name];
    });

    setData(current);
  }, [orders]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setData({});

    dispatch(editOrder({ pickedId, data }));
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
      <h2>Редактирование заказа</h2>
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
          Редактировать
        </button>
      </form>
    </ReactModal>
  );
}

export default EditOrder;
