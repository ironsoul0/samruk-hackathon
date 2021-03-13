import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";

import {
  initFetch,
  nextOrdersAsync,
  prevOrdersAsync,
  performSearchAsync,
  setActiveSearch,
  FETCH_LIMIT,
} from "../../store/reducers/orderSlice";
import { change, startEditMode } from "../../store/reducers/modalSlice";
import classes from "./Table.module.css";
import Container from "../container";
import Spinner from "../spinner";

const pickOrders = (orders, offset) => {
  return orders.slice(offset, offset + FETCH_LIMIT);
};

function Table() {
  const {
    orders,
    currentOffset,
    currentSize,
    activeSearch,
    searchOrders,
  } = useSelector((state) => state.order);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleRowClick = (id) => {
    dispatch(startEditMode(id));
  };

  const performSearch = (e) => {
    e.preventDefault();
    if (!activeSearch) {
      dispatch(performSearchAsync(query));
    } else {
      dispatch(setActiveSearch(false));
      setQuery("");
    }
  };

  useEffect(() => {
    dispatch(initFetch());
  }, []);

  return (
    <Container className={classes.root}>
      <h2>Текущие заказы</h2>
      <form className={classes.form}>
        <input
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          placeholder="Поиск по ИИН и ФИО"
          type="text"
        />
        <button
          onClick={performSearch}
          disabled={!query && !activeSearch}
          type="submit"
          className={classes.button}
        >
          {activeSearch ? "Сбросить" : "Искать"}
        </button>
        <button
          type="button"
          onClick={() => dispatch(change(true))}
          className={classes.button}
          disabled={activeSearch}
        >
          Добавить заказ
        </button>
      </form>
      {orders && !activeSearch && (
        <div className={classes.table}>
          <div className={clsx(classes.row, classes.mainRow)}>
            <p>ИИН</p>
            <p>ФИО</p>
            <p>Статус</p>
            <p>Оператор</p>
          </div>
          {pickOrders(orders, currentOffset).map((current) => (
            <div
              key={current.id}
              className={clsx(classes.row, classes.secondaryRow)}
              onClick={() => handleRowClick(current.id)}
            >
              <p>{current.id}</p>
              <p>{current.name}</p>
              <p>{current.status}</p>
              <p>{current.operator}</p>
            </div>
          ))}
        </div>
      )}
      {orders && !activeSearch && (
        <div className={classes.control}>
          <button
            disabled={currentOffset === 0}
            className={classes.button}
            onClick={() => dispatch(prevOrdersAsync())}
          >
            Предыдущие
          </button>
          <button
            disabled={currentOffset + FETCH_LIMIT >= currentSize}
            className={classes.button}
            onClick={() => dispatch(nextOrdersAsync())}
          >
            Следующие
          </button>
        </div>
      )}
      {activeSearch && searchOrders && (
        <div className={classes.table}>
          <div className={clsx(classes.row, classes.mainRow)}>
            <p>ИИН</p>
            <p>ФИО</p>
            <p>Статус</p>
            <p>Оператор</p>
          </div>
          {searchOrders.map((current) => (
            <div
              key={current.id}
              className={clsx(classes.row, classes.secondaryRow)}
              onClick={() => handleRowClick(current.id)}
            >
              <p>{current.id}</p>
              <p>{current.name}</p>
              <p>{current.status}</p>
              <p>{current.operator}</p>
            </div>
          ))}
        </div>
      )}
      {((activeSearch && !searchOrders) || (!activeSearch && !orders)) && (
        <Spinner />
      )}
    </Container>
  );
}

export default Table;
