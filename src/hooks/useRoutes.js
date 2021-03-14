import { useState, useEffect } from "react";

import { base, formatDate } from "../utils";
import { ROUTES, sendRequest } from "../utils";

const useRoutes = (date) => {
  const [routes, setRoutes] = useState([]);
  const [completed, setCompleted] = useState(true);
  const [responses, setResponses] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setRoutes([]);
    setResponses([]);
    setCount(0);
    setCompleted(false);

    const callback = (response, status) => {
      if (status === 200 && response && response.wagons) {
        let totalTicketsRemaining = 0;
        if (response.wagons) {
          for (const wagon of response.wagons) {
            totalTicketsRemaining += parseInt(wagon.ticketsRemaining);
          }
        }
        response.totalTicketsRemaining = totalTicketsRemaining;
        setResponses((responses) => [...responses, response]);
      }

      setCount((count) => count + 1);
    };

    for (const route of ROUTES) {
      sendRequest(
        "GET",
        `${base}/api/parse`,
        {
          route,
          date: formatDate(date),
        },
        null,
        callback
      );
    }
  }, [date]);

  useEffect(() => {
    if (count === ROUTES.length) {
      setRoutes(responses);
      setCompleted(true);
    }
  }, [count]);

  return { routes, completed };
};

export default useRoutes;
