function buildURI(params) {
  return (
    "?" +
    Object.keys(params)
      .map(function (key) {
        return key + "=" + encodeURIComponent(params[key]);
      })
      .join("&")
  );
}

export function sendRequest(method, url, paramsData, jsonData, callback) {
  let json;
  let params;

  if (jsonData) {
    json = JSON.stringify(jsonData);
  }

  if (paramsData) {
    params = buildURI(paramsData);
  }

  const xhr = new XMLHttpRequest();

  xhr.responseType = "json";
  xhr.open(method, url + params);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = () => {
    callback(xhr.response, xhr.status);
  };
  xhr.onerror = (e) => {
    console.log(e);
    callback({ message: "Error request" }, 400);
  };
  xhr.send(json);
}

export function loadRoutes(route, date, callback) {
  const paramsData = {
    route: route,
    date: date.toISOString().substring(0, 10),
  };

  const mockResponse = {
    trainNumber: "300T",
    from: "Алматы 2",
    to: "Нур-Султан 1",
    date: "2012-15-10",
    stations: ["Алматы 2", "Алматы 1", "Караганды", "Нур-Султан 1"],
    tickets: [
      {
        wagonNumber: 5,
        carClass: "2K",
        carClassName: "Купе",
        ticketsRemaining: 15,
      },
      {
        wagonNumber: 7,
        carClass: "2K",
        carClassName: "Купе",
        ticketsRemaining: 17,
      },
      {
        wagonNumber: 15,
        carClass: "3П",
        carClassName: "Плацкарт",
        ticketsRemaining: 25,
      },
    ],
    predictions: [
      {
        station: "Алматы 2",
        carClass: "2K",
        carClassName: "Купе",
        ticketsSold: 15,
        count: 14,
      },
      {
        station: "Алматы 2",
        carClass: "3П",
        carClassName: "Плацкарт",
        ticketsSold: 12,
        count: 10,
      },
      {
        station: "Алматы 1",
        carClass: "2K",
        carClassName: "Купе",
        ticketsSold: 22,
        count: 22,
      },
    ],
  };

  setTimeout(() => {
    callback(mockResponse, 200);
  }, 1000);
}
