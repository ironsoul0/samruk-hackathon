import React from "react";
import Slider from "react-slick";

import Container from "../container";
import classes from "./Analysis.module.css";

function index() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Container>
      <h2>Анализ</h2>
      <Slider {...settings} style={{ outline: "none" }}>
        {new Array(11).fill(0).map((_, index) => {
          return (
            <div style={{ outline: "none" }}>
              <img
                src={`/analysis/index${index > 0 ? index : ""}.png`}
                alt="analysis"
                className={classes.container}
              />
            </div>
          );
        })}
      </Slider>
    </Container>
  );
}

export default index;
