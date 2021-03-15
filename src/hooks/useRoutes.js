import { useState, useEffect } from "react";

import { ROUTES, base, formatDate, sendRequest, loadRoute } from "../utils";

const MOCK_RESULT = true;

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
        if (MOCK_RESULT) {
          response.totalTicketsRemaining = Math.floor(Math.random() * 50);
        }
        setResponses((responses) => [...responses, response]);
      }

      setCount((count) => count + 1);
    };

    for (const route of ROUTES) {
      if (MOCK_RESULT) {
        loadRoute(route, formatDate(date), callback);
      } else {
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
    }
  }, [date]);

  useEffect(() => {
    if (count === ROUTES.length) {
      setRoutes(responses);
      setCompleted(true);
    }
  }, [count, responses]);

  return { routes, completed };
};

export default useRoutes;
