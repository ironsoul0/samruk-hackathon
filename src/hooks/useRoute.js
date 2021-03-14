import { useState, useEffect } from "react";

import { base, sendRequest, formatDate } from "../utils";

const useRoute = (routeName, date) => {
  const [route, setRoute] = useState(null);

  useEffect(() => {
    setRoute(null);

    const callback = (response, status) => {
      if (status === 200 && response) {
        setRoute(response);
      }
    };

    sendRequest(
      "GET",
      `${base}/api/parse`,
      {
        route: routeName,
        date: formatDate(date),
      },
      null,
      callback
    );
  }, [routeName, date]);

  return route;
};

export default useRoute;
