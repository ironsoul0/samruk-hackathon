import React, { useEffect, useState } from "react";
import { Bar } from "@reactchartjs/react-chart.js";
import { useParams, useLocation, useHistory } from "react-router-dom";

import styles from "./Dashboard.module.css";
import Spinner from "../spinner";
import Container from "../container";
import { getNextDay, formatDate } from "../../utils";
import { useRoute } from "../../hooks";
import DayPicker from "../dayPicker";
import Checkbox from "../checkbox";

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
const optionsClass = {
  scales: {
    xAxes: [{
      barThickness: 73
    }],
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
  const capacities = {
    '2К': 36,
    '3П': 54,
    '2Д': 18,
    '2С': 36,
    '2Л': 6,
    '1Д': 12,
    '1Л': 10,
    '3О': 81
  }
  let obj = {};
  obj.labels = raw.stations.slice(0, raw.stations.length - 1);
  let stationTicketSum = {},
    wagonCountSum = {},
    stationCountSum = {};
  raw.predictions.forEach((v) => {
    stationTicketSum[v.station] = 0;
    stationCountSum[v.station] = 0;
  });
  let classes = new Set();
  raw.predictions.forEach((v) => {
    if (optionsSet.has(v.carClassName)) {
      stationTicketSum[v.station] += v.ticketsSold;
      stationCountSum[v.station] += v.count;
      classes.add(v.carClassName);
      if (!(v.carClassName in wagonCountSum)) wagonCountSum[v.carClassName] = 0;
      if (v.carClass in capacities) {
        wagonCountSum[v.carClassName] = Math.max(Math.ceil(v.ticketsSold * 1.0 / capacities[v.carClass]), wagonCountSum[v.carClassName]);
      } else {
        console.error("bad car class " + v.carClass)
      }
    }
  });
  let totalTicketData = [];
  let totalCountData = [];
  let totalWagonCount = [];
  classes.forEach(v => totalWagonCount.push(wagonCountSum[v]));
  raw.stations.forEach((v) => {
    totalTicketData.push(stationTicketSum[v.trim()]);
    totalCountData.push(stationCountSum[v.trim()]);
  });
  obj.datasets = [
    {
      label: "# Ожидаемая продажа билетов",
      data: totalTicketData,
      backgroundColor: "rgb(255, 99, 132)",
    },
    {
      label: "# Ожидаемое количество пассажиров",
      data: totalCountData,
      backgroundColor: "rgb(54, 162, 235)",
    },
  ];
  obj.megaChart = {};
  obj.megaChart.labels = [...classes];
  obj.megaChart.datasets = [
    {
      label: "# Прогнозированное количество вагонов",
      data: totalWagonCount,
      backgroundColor: "rgb(204, 160, 67)",
      borderWidth: 1,
    }
  ]
  return obj;
};

const filterOptions = (raw) => {
  let data = new Set();
  raw.predictions.forEach((v) => data.add(v.carClassName));
  return data;
};

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const GroupedBar = () => {
  const query = useQuery();
  const history = useHistory();
  const [date, setDate] = useState(
    query.get("date") ? new Date(query.get("date")) : getNextDay()
  );
  const [curData, setCurData] = useState();
  const [isSold, setSold] = useState(true);
  const [isCount, setCount] = useState(true);
  const [filter, setFilter] = useState(new Set());
  const { trainNumber } = useParams();
  const route = useRoute(trainNumber, date);

  useEffect(() => {
    if (route) {
      setCurData(transform(route, filterOptions(route)));
      setFilter(filterOptions(route));
    }
  }, [route]);
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
    const initData = transform(route, ffilter);
    let tempData = {};
    tempData.datasets = [];
    if (sold) tempData.datasets = [...tempData.datasets, initData.datasets[0]];
    if (count) tempData.datasets = [...tempData.datasets, initData.datasets[1]];
    tempData.megaChart = initData.megaChart;
    setCurData(tempData);
  };

  const handleFilterChange = (event) => {
    const ff = new Set(filter);
    if (!event.target.checked) ff.delete(event.target.name);
    else ff.add(event.target.name);
    setFilter(ff);
    handleData(isSold, isCount, ff);
  };

  const onDayChange = (newDate) => {
    setDate(newDate);
    history.push(`/chart/${trainNumber}?date=${formatDate(newDate)}`);
  };

  return route ? (
    <Container bottomShift>
      <div className={styles.heading}>
        <h2>Маршрут {trainNumber}</h2>
        <p>
          Из {route.from} в {route.to}
        </p>
      </div>
      <DayPicker onDayChange={onDayChange} value={date} />
      <div className={styles.checkboxes}>
        <div>
          <Checkbox
            text="Продажи"
            onChange={handleInputChange}
            checked={isSold}
            name="isSold"
          />
          <Checkbox
            text="Пассажиры"
            onChange={handleInputChange}
            checked={isCount}
            name="isCount"
          />
        </div>
        <div>
          {[...filterOptions(route)].map((v) => (
            <Checkbox
              key={v}
              name={v}
              checked={filter.has(v)}
              onChange={handleFilterChange}
              text={v}
            />
          ))}
        </div>
      </div>
      {curData && <Bar data={curData} options={options} />}
      {curData && <Bar data={curData.megaChart} options={optionsClass} />}
    </Container>
  ) : (
      <Spinner />
    );
};

export default GroupedBar;
