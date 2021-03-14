import { useState, useEffect } from "react";

import { base, sendRequest, formatDate } from "../utils";

const useRoute = (routeName, date) => {
  const [route, setRoute] = useState(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setRoute(null);
    setCompleted(false);

    const callback = (response, status) => {
      setCompleted(true);
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

  return { route, completed };
};

export default useRoute;
