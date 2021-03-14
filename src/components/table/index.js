import React, { useEffect, useCallback, useRef } from "react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { Line } from "@reactchartjs/react-chart.js";

import { initFetch } from "../../store/reducers/orderSlice";
import { config } from "../../utils";
import classes from "./Table.module.css";
import Container from "../container";
import Spinner from "../spinner";
import ColumnTitle from "../columnTitle";

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
  title: {
    display: false,
  },
  legend: {
    display: false,
  },
  scales: {
    yAxes: [
      {
        display: false,
      },
    ],
    xAxes: [
      {
        display: false,
      },
    ],
  },
  elements: {
    point: {
      radius: 0,
    },
  },
};

const LineChart = ({ data }) => (
  <Line height={70} data={data} options={options} />
);

function Table() {
  const routesRef = useRef([]);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initFetch());
  }, [dispatch]);

  useEffect(() => {
    routesRef.current.forEach((routeRef, i) => {
      config.sr.reveal(routeRef, config.srConfig(i * 10));
    });
  }, [orders]);

  const getData = useCallback((status) => {
    return {
      labels: ["1", "2", "3", "4", "5", "6"],
      datasets: [
        {
          data:
            status === 0
              ? [5, 2, 3, 12, 19, 3]
              : status === 1
              ? [1, 8, 13, 1, 2, 9]
              : [12, 19, 3, 5, 2, 3],
          backgroundColor: "white",
          borderColor: status === 0 ? "#76c26a" : "#f02556",
        },
      ],
    };
  });

  return (
    <Container className={classes.root}>
      <h2>Маршруты</h2>
      {orders && (
        <div className={classes.table}>
          <div className={clsx(classes.row, classes.mainRow)}>
            <ColumnTitle title="№ поезда" />
            <ColumnTitle title="Отправление" />
            <ColumnTitle title="Время в пути" />
            <ColumnTitle title="Прибытие" />
            <ColumnTitle
              title="Вагоны"
              tooltipText="Позволяет видеть рекоммендуемое и реальное количество вагонов в данный момент времени."
            />
            <ColumnTitle title="Состояние" />
          </div>
          {orders.map((current, i) => (
            <div
              key={i}
              className={clsx(classes.row, classes.secondaryRow)}
              ref={(el) => (routesRef.current[i] = el)}
            >
              <div>
                <p>{current.id}</p>
              </div>
              <div className={classes.timing}>
                <p>{current.departure.point}</p>
                <p>{current.departure.time}</p>
              </div>
              <div>
                <p>{current.pathTime}</p>
              </div>
              <div className={classes.timing}>
                <p>{current.arrival.point}</p>
                <p>{current.arrival.time}</p>
              </div>
              <div>3</div>
              <div>
                <LineChart data={getData(current.status)} />
              </div>
            </div>
          ))}
        </div>
      )}
      {!orders && <Spinner />}
    </Container>
  );
}

export default Table;
