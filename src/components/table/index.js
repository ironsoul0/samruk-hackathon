import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useHistory } from "react-router-dom";

import { useRoutes } from "../../hooks";
import { config, getNextDay, formatDate } from "../../utils";
import classes from "./Table.module.css";
import Container from "../container";
import Spinner from "../spinner";
import ColumnTitle from "../columnTitle";
import DayPicker from "../dayPicker";

function Table() {
  const routesRef = useRef([]);
  const history = useHistory();
  const [date, setDate] = useState(getNextDay());
  const { routes, completed } = useRoutes(date);

  useEffect(() => {
    routesRef.current.forEach((routeRef, i) => {
      config.sr.reveal(routeRef, config.srConfig(i * 10));
    });
  }, [routes]);

  return (
    <Container className={classes.root}>
      <h2>Маршруты</h2>
      <DayPicker onDayChange={setDate} />
      {!completed && <Spinner />}
      {completed && !routes.length && (
        <p>Похоже что, на эту дату маршруты не запланированы.</p>
      )}
      {completed && routes.length > 0 && (
        <div className={classes.table}>
          <div className={clsx(classes.row, classes.mainRow)}>
            <ColumnTitle title="№ поезда" />
            <ColumnTitle title="Точка отправления" />
            <ColumnTitle title="Точка прибытия" />
            <ColumnTitle
              title="Места"
              tooltipText="Сумма по количеству оставшихся мест в каждом из вагонов (купе и плацкарт)."
            />
          </div>
          {routes.map((current, i) => (
            <div
              key={i}
              className={clsx(classes.row, classes.secondaryRow)}
              ref={(el) => (routesRef.current[i] = el)}
              onClick={() =>
                history.push(
                  `/chart/${current.trainNumber}?date=${formatDate(date)}`
                )
              }
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
                <p
                  className={clsx([
                    classes.perfect,
                    current.totalTicketsRemaining < 30 && classes.attention,
                    current.totalTicketsRemaining < 10 && classes.trouble,
                  ])}
                >
                  {current.totalTicketsRemaining}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}

export default Table;
