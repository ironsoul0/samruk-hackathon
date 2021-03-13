import React, { useState } from 'react'
import { Bar } from '@reactchartjs/react-chart.js'
import Container from "../container";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const routeData = {
	labels: ['Алматы', 'ШУ', 'Отар', 'Қарағанды', 'Атырау', 'Нью Йорк'],
	datasets: [
		{
			label: '# ожидаемая продажа билетов',
			data: [12, 19, 30, 5, 2, 1],
			backgroundColor: 'rgb(255, 99, 132)',
		},
		{
			label: '# ожидаемое количество пассажиров',
			data: [2, 3, 20, 5, 1, 1],
			backgroundColor: 'rgb(54, 162, 235)',
		}
	],
}

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
}

const GroupedBar = () => {
	const [initData] = useState(routeData)
	const [curData, setCurData] = useState(routeData)
	const [isSold, setSold] = useState(true)
	const [isCount, setCount] = useState(true)
	let { date, from, to } = useParams();
	console.log(date, from, to);
	const handleInputChange = (event) => {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		let isSold2 = isSold, isCount2 = isCount;
		if (name === "isSold") {
			isSold2 = value;
			setSold(value);
		}
		else {
			isCount2 = value;
			setCount(value);
		}
		let tempData = {
			labels: initData.labels
		}
		tempData.datasets = []
		if (isSold2) tempData.datasets = [...tempData.datasets, initData.datasets[0]]
		if (isCount2) tempData.datasets = [...tempData.datasets, initData.datasets[1]]
		setCurData(tempData);
	}
	return <Container>
		<div className='header'>
			<h1 className='title'>Маршрут {from} - {to}, {date}</h1>
		</div>
		<div>
			<label>
				Продажи:
				<input type="checkbox" name="isSold" checked={isSold} onChange={handleInputChange} />
			</label>
		</div>
		<div>
			<label>
				Пассажиры:
			<input type="checkbox" name="isCount" checked={isCount} onChange={handleInputChange} />
			</label>
		</div>
		<Bar data={curData} options={options} />
	</Container>
}

export default GroupedBar
