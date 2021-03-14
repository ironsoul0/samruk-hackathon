import { useState, useEffect } from "react";

import { ROUTES, loadRoutes } from "../utils";

const useRoutes = (date) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders([]);

    const callback = (response, status) => {
      if (status === 200) {
        let totalTicketsRemaining = 0;
        for (const wagon of response.tickets) {
          totalTicketsRemaining += wagon.ticketsRemaining;
        }
        response.totalTicketsRemaining = totalTicketsRemaining;

        setOrders((orders) => [...orders, response]);
      }
    };

    for (const route of ROUTES) {
      loadRoutes(route, date, callback);
    }
  }, [date]);

  return orders;
};

export default useRoutes;
