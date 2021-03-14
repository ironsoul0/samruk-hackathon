import React, { useEffect, useState } from "react";
import { Bar } from "@reactchartjs/react-chart.js";

import Container from "../container";
import { useParams } from "react-router-dom";
import { api } from "../../utils";

const apiData = {
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
    {
      station: "Караганды",
      carClass: "2K",
      carClassName: "Купе",
      ticketsSold: 32,
      count: 15,
    },
    {
      station: "Нур-Султан 1",
      carClass: "2K",
      carClassName: "Купе",
      ticketsSold: 40,
      count: 12,
    },
  ],
};

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
};

const transform = (raw, optionsSet) => {
  let obj = {};
  obj.labels = raw.stations;
  let stationTicketSum = {},
    stationCountSum = {};
  raw.predictions.forEach((v) => {
    stationTicketSum[v.station] = 0;
    stationCountSum[v.station] = 0;
  });
  raw.predictions.forEach((v) => {
    if (optionsSet.has(v.carClassName))
      stationTicketSum[v.station] += v.ticketsSold;
    if (optionsSet.has(v.carClassName)) stationCountSum[v.station] += v.count;
  });
  let totalTicketData = [];
  let totalCountData = [];
  raw.stations.forEach((v) => {
    totalTicketData.push(stationTicketSum[v]);
    totalCountData.push(stationCountSum[v]);
  });
  obj.datasets = [
    {
      label: "# ожидаемая продажа билетов",
      data: totalTicketData,
      backgroundColor: "rgb(255, 99, 132)",
    },
    {
      label: "# ожидаемое количество пассажиров",
      data: totalCountData,
      backgroundColor: "rgb(54, 162, 235)",
    },
  ];
  return obj;
};

const filterOptions = (raw) => {
  let data = new Set();
  raw.predictions.forEach((v) => data.add(v.carClassName));
  return data;
};

const ifilter = filterOptions(apiData);

const GroupedBar = () => {
  const [info, setInfo] = useState({ from: "", to: "" });
  const [curData, setCurData] = useState();
  const [isSold, setSold] = useState(true);
  const [isCount, setCount] = useState(true);
  const [filter, setFilter] = useState(ifilter);
  const { trainNumber } = useParams();
  const date = "2021-04-01";

  useEffect(() => {
    if (!curData) setCurData(transform(apiData, ifilter, "initCur"));

    api(`api/parse?route=${trainNumber}&date=${date}`, {
      mode: "cors",
    }).then(({ data }) => setInfo(data));
  }, [info, trainNumber, date]);

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    let isSold2 = isSold,
      isCount2 = isCount;
    if (name === "isSold") {
      isSold2 = value;
      setSold(value);
    } else {
      isCount2 = value;
      setCount(value);
    }
    handleData(isSold2, isCount2, filter);
  };

  const handleData = (sold, count, ffilter) => {
    const initData = transform(apiData, ffilter, "handle");
    let tempData = {};
    tempData.datasets = [];
    if (sold) tempData.datasets = [...tempData.datasets, initData.datasets[0]];
    if (count) tempData.datasets = [...tempData.datasets, initData.datasets[1]];
    console.log(ffilter, tempData);
    setCurData(tempData);
  };

  const handleFilterChange = (event) => {
    const ff = new Set(filter);
    if (!event.target.checked) ff.delete(event.target.name);
    else ff.add(event.target.name);
    setFilter(ff);
    handleData(isSold, isCount, ff);
  };

  return (
    <Container>
      <div>
        <h1 className="title">
          Маршрут {info.from} - {info.to}, {date}
        </h1>
      </div>
      <div>
        <label>
          Продажи:
          <input
            type="checkbox"
            name="isSold"
            checked={isSold}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Пассажиры:
          <input
            type="checkbox"
            name="isCount"
            checked={isCount}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <Bar data={curData} options={options} />
      {[...ifilter].map((v) => (
        <div key={v}>
          <label>{v}</label>
          <input
            type="checkbox"
            name={v}
            checked={filter.has(v)}
            onChange={handleFilterChange}
          />
        </div>
      ))}
    </Container>
  );
};

export default GroupedBar;
