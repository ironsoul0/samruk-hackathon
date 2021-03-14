import React, { useEffect, useCallback, useRef, useState } from "react";
import clsx from "clsx";
// import { useDispatch, useSelector } from "react-redux";
import { Line } from "@reactchartjs/react-chart.js";

// import { initFetch } from "../../store/reducers/orderSlice";
import { config, ROUTES } from "../../utils";
import { loadRoutes } from "../../utils/apiHandler";
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
  const [ orders, setOrders ] = useState([]);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(initFetch());
  // }, [dispatch]);

  useEffect(() => {
    routesRef.current.forEach((routeRef, i) => {
      config.sr.reveal(routeRef, config.srConfig(i * 10));
    });
  }, [orders]);

  const updateOrders = () => {
    setOrders([]);
    const callback = (response, status) => {
      if (status === 200) {
        
        let totalTicketsRemaining = 0;
        for (const wagon of response.tickets) {
          totalTicketsRemaining += wagon.ticketsRemaining
        }
        response.totalTicketsRemaining = totalTicketsRemaining

        setOrders((orders) => [...orders, response]);
      
      }
      else {
        console.log(response);
      }
    }

    for (const route of ROUTES) {
      loadRoutes(route, new Date(), callback);
    }
  }

  useEffect(() => {
    updateOrders();
  }, []);

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
            <div>
              <p>№ поезда</p>
            </div>
            <div>
              <p>Точка отправления</p>
            </div>
            <div>
              <p>Точка прибытия</p>
            </div>
            <div>
              <p>Дата отправления</p>
            </div>
            <div>
              <p>Количество оставшихся мест</p>
            </div>
          </div>
          {orders.map((current, i) => (
            <div
              key={i}
              className={clsx(classes.row, classes.secondaryRow)}
              ref={(el) => (routesRef.current[i] = el)}
            >
              <div>
                <p>{current.trainNumber}</p>
              </div>
              <div>
                <p>{current.from}</p>
              </div>
              <div>
                <p>{current.to}</p>
              </div>
              <div>
                <p>{current.date}</p>
              </div>
              <div>
              <p>{current.totalTicketsRemaining}</p>
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
