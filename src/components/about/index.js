import React from "react";

import Container from "../container";

function index() {
  return (
    <Container>
      <h2>О проекте</h2>
      <p>Этот проект написан на React, Redux Toolkit и Redux Thunk.</p>
      <p>
        Веб-приложение не осуществляет каких-то <code>AJAX</code> запросов, а
        лишь иммитирует их через использование <code>setTimeout</code>.
      </p>
      <p>Приложение так же адаптивно под мобильные устройства.</p>
      <p>
        Весь код можно найти на{" "}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://github.com/ironsoul0/globerce"
        >
          Github
        </a>
        .
      </p>
      <p>Have fun!</p>
    </Container>
  );
}

export default index;
