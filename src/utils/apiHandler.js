import { routesInfo } from "../utils";
import data from "./data.json";

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

export function loadRoute(_route, _date, callback) {
  const response = { ...data };
  response.trainNumber = _route;
  response.from = routesInfo[_route].from;
  response.to = routesInfo[_route].to;
  setTimeout(() => callback(response, 200), 1000);
}
