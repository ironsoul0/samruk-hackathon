import React from "react";

import Container from "../container";
import styles from "./About.module.css";

function index() {
  return (
    <Container>
      <div className={styles.root}>
        <h2>О проекте</h2>
        <p>
          Этот проект написан для участия в хакатоне Samruk Hackathon командой
          Janbyr Inc.
        </p>
        <p>
          Веб-приложение позволяет видеть актуальную информацию по количеству
          проданных билетов, и прогнозирует необходимое количество вагонов для
          каждого машрута.
        </p>
        <p>
          Весь код можно найти на{" "}
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/ironsoul0/samruk-hackathon"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </Container>
  );
}

export default index;
