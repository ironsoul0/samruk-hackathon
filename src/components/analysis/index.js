import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import Container from "../container";
import classes from "./Analysis.module.css";

function index() {
	return (
		<Container>
			<div>
				<Link to="/">
					<h2>Маршруты</h2>
				</Link>
				<h2>Анализ</h2>
				<img src="/analysis/index.png" alt="analysis1" className={classes.container} />
				<img src="/analysis/index2.png" alt="analysis1" className={classes.container} />
				<img src="/analysis/index3.png" alt="analysis1" className={classes.container} />
				<img src="/analysis/index4.png" alt="analysis1" className={classes.container} />
				<img src="/analysis/index5.png" alt="analysis1" className={classes.container} />
				<img src="/analysis/index6.png" alt="analysis1" className={classes.container} />
				<img src="/analysis/index7.png" alt="analysis1" className={classes.container} />
				<img src="/analysis/index8.png" alt="analysis1" className={classes.container} />
				<img src="/analysis/index9.png" alt="analysis1" className={classes.container} />
				<img src="/analysis/index10.png" alt="analysis1" className={classes.container} />
			</div>
		</Container>
	);
}

export default index;
