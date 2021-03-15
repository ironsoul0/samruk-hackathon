import React, { useState } from "react";
import clsx from "clsx";

import styles from "./TableDrawer.module.css";

function TableDrawer({ route, show, toggleDrawer }) {
  const { wagons } = route;

  const totalTickets = wagons.reduce(
    (acc, x) => acc + parseInt(x.ticketsRemaining),
    0
  );

  return (
    <>
      <div className={clsx([styles.root, show && styles.visibleDrawer])}>
        <h2>Доступные билеты</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Номер вагона</th>
              <th>Класс вагона</th>
              <th>Тип вагона</th>
              <th>Оставшиеся билеты</th>
            </tr>
          </thead>
          <tbody>
            {wagons.map((wagon) => (
              <tr>
                <td>{wagon.wagonNumber}</td>
                <td>{wagon.carClass}</td>
                <td>{wagon.carClassName}</td>
                <td>{wagon.ticketsRemaining}</td>
              </tr>
            ))}
          </tbody>
        </table>
        Общее количество билетов: {totalTickets}
      </div>
      <div
        className={clsx([styles.backdrop, show && styles.visibleBackdrop])}
        onClick={toggleDrawer}
      ></div>
    </>
  );
}

export default TableDrawer;
