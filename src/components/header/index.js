import React, { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

import Container from "../container";
import classes from "./Header.module.css";

const links = [
  {
    href: "/",
    label: "Главная",
  },
  {
    href: "/about",
    label: "О проекте",
  },
];

const Header = () => {
  const [menu, setMenu] = useState(false);

  return (
    <nav className={clsx(classes.root, { [classes.active]: menu })}>
      <Container className={classes.content}>
        <div className={classes.logo}>
          <Link to="/">Globerce Capital</Link>
        </div>
        <div className={classes.links}>
          {links.map((el, i) => (
            <Link onClick={() => setMenu(false)} to={el.href} key={el.href}>
              {el.label}
            </Link>
          ))}
        </div>
        <div onClick={() => setMenu(!menu)} className={classes.burger}>
          <div />
          <div />
          <div />
        </div>
      </Container>
    </nav>
  );
};

export default Header;
