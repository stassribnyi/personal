import React from 'react';

import { styled } from '@linaria/react';

const Nav = styled.nav`
  display: flex;
  align-items: center;
  flex-direction: column;

  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;

  color: var(--color-light, rgb(243, 242, 239)); /*TODO*/
  background-color: transparent;

  transition: background-color 0.5s;

.nav__title {
  /*TODO*/
  text-indent: 0;
  font-size: 1em;
  font-weight: 400;
  line-height: 1.25em;
}

.nav__content {
  display: flex;
}

.nav__links {
  display: none;
}

.nav:not(.nav--top) .nav__chevron {
  animation-name: chevronUpDown;
  animation-duration: 1s;
  animation-direction: alternate;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

.nav__chevron:link,
.nav__chevron:visited {
  display: flex;
  margin: 0.2em 0.6em;

  cursor: pointer;

  color: inherit;
  font-size: 2em;
  text-decoration: none;
}

.nav__link:link,
.nav__link:visited {
  color: inherit;
  text-decoration: none;
  transition: color 0.5s;
}

.nav__link--selected:link,
.nav__link--selected:visited {
  color: var(--color-light-accent, rgb(244, 121, 124));
}

.nav--top,
.nav--bottom {
  z-index: 9999;
  position: fixed;
  background-color: var(--color-dark, rgb(51, 51, 51));
  box-shadow: 0 0px 4px var(--color-black);
}

.nav--top {
  top: 0;
  bottom: initial;
}

.nav--bottom {
  bottom: 0;
  display: none;
  padding: 0.5em 0;
}

.nav--top .nav__title {
  display: none;
}

.nav--top .nav__content {
  width: 100%;
  height: 2.8em;
  align-items: center;
  justify-content: center;
}

.nav--top .nav__links {
  display: flex;
  list-style: none;

  flex: 0 1 calc(45% - 0.6em);
}

.nav--top .nav__links:first-child {
  justify-content: flex-end;
}

.nav--top .nav__links:last-child {
  justify-content: flex-start;
}

.nav--top .nav__links > li {
  margin: 0 5%;
  display: flex;
}

.nav--top .nav__link::before {
  content: "/";
}

.nav--top .nav__link:link,
.nav--top .nav__link:visited {
  font-size: 1.25em;
  line-height: 1.25em;
  letter-spacing: 0.1em;
}

.nav--bottom .nav__links {
  width: 100%;
  display: flex;
  list-style: none;
  justify-content: space-around;
}

.nav--bottom .nav__links > li {
  display: flex;
}

.nav--bottom .nav__link {
  font-size: 1em;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  flex-direction: column;
}

.nav--bottom .nav__link--selected:link,
.nav--bottom .nav__link--selected:visited {
  font-weight: 600;
}

.nav--bottom .nav__link-icon {
  font-size: 1.25em;
  line-height: 1.25em;
  text-transform: capitalize;
}

.nav--bottom .nav__link-text {
  font-size: 0.6em;
  line-height: 1.25em;
  text-transform: capitalize;
}


@supports (padding: max(0px)) {
  .nav--bottom {
    padding-bottom: max(0.5em, env(safe-area-inset-bottom));
  }
}

@keyframes chevronUpDown {
  from {
    transform: translateY(-25%);
  }

  to {
    transform: translateY(0);
  }
}

`


export const Navigation: React.FC = () => (
  <Nav id="js--nav" className="nav">
    <p className="nav__title">
      Wanna learn more what I can do?
    </p>
    <div className="nav__content">
      <ul className="nav__links">
        <li><a className="js--nav-link nav__link" href="#about">about</a></li>
        <li><a className="js--nav-link nav__link" href="#skills">skills</a></li>
        <li><a className="js--nav-link nav__link" href="#career">career</a></li>
      </ul>
      <a
        id="js--nav__chevron"
        href="#about"
        className="nav__chevron ion-chevron-down"
        aria-label="Move up or down"
      ></a>
      <ul className="nav__links">
        <li>
          <a className="js--nav-link nav__link" href="#projects">projects</a>
        </li>
        <li>
          <a className="js--nav-link nav__link" href="#contacts">contacts</a>
        </li>
        <li>
          <a className="js--nav-link nav__link" href="#cv">cv</a>
        </li>
      </ul>
    </div>
  </Nav>
)