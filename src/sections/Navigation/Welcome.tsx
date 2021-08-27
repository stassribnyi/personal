import React from 'react';

import { styled } from 'linaria/react';
import { Button } from '../../../components';

const Content = styled.div`
.welcome {
  display: flex;
  position: relative;

  min-height: 100vh;
  overflow: hidden;

  background-size: cover;
  color: var(--color-light, rgb(243, 242, 239));
  background-image: url(/css/img/welcome-min.jpg);
}

.welcome__content,
.welcome__actions {
  flex: 0 1 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 5% 5% 4em 5%;
}

.welcome__column {
  max-width: calc(var(--max-content-width, 1140px) / 2);
}

.welcome__content {
  flex-direction: column;
  background-color: rgba(var(--dark-accent, 50, 89, 99), 0.9);
}

.welcome__actions {
  position: relative;
  background-color: rgba(var(--light, 243, 242, 239), 0.2);
}

.welcome__actions::after {
  top: 0;
  left: 0;
  bottom: 0;
  content: "";
  display: block;
  position: absolute;

  box-shadow: -1px 0 2px 1px rgba(var(--dark, 51, 51, 51), 0.2);
}

.welcome__title {
  display: flex;
  align-items: center;
  flex-direction: column;

  font-size: 1em;
  line-height: 1em;
  margin-bottom: 1em;
}

.my-greeting {
  font-size: 0.8em;
  line-height: 1.25em;
}

.my-name,
.my-title,
.my-greeting {
  margin-bottom: 0.5em;
}

.my-name,
.my-title {
  text-transform: uppercase;
}

.my-name {
  font-size: 2em;
  font-weight: 400;
  line-height: 1.25em;
}

.my-title {
  font-size: 2.3em;
  font-weight: 300;
  line-height: 1.25em;
}

.welcome__cite {
  width: 50%;
  position: relative;
  margin: 3em 0 1em 50%;

  display: flex;
  flex-direction: column;

  font-size: 0.8em;
  text-align: right;
  font-style: italic;
  line-height: 1.45em;
}

.welcome__cite::before {
  position: absolute;
  display: block;
  content: '"';
  top: -4px;
  left: -4px;

  font-size: 3.5em;
}

.welcome__cite cite {
  margin-top: 1em;

  font-size: 0.9em;
  line-height: 1.45em;
}


/* nav */

.nav {
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
}

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


const Navigation: React.FC = () => (
  <nav id="js--nav" className="nav">
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
  </nav>
)

export const Welcome: React.FC = () => (
  <Content>
    <header className="welcome">
      <div className="welcome__content">
        <div className="welcome__column">
          <h1 className="welcome__title">
            <em className="my-greeting">Hello, I am</em>
            <span className="my-name line-on-sides">Stas Sribnyi</span>
            <strong className="my-title">Front-End Engineer</strong>
          </h1>
          <p>
            Nice to see you here. I am a skilled front-end engineer with more
            than <span id="js--career-start">5</span> years of working
            experience both with front-end and back-end. I develop single-page
            web applications using a variety of frameworks such as React and
            Angular. I will be glad to collaborate with you.
          </p>
          <blockquote className="welcome__cite">
            When it is obvious that the goals cannot be reached, don't adjust
            the goals, adjust the action steps.
            <cite>Сonfucius</cite>
          </blockquote>
        </div>
      </div>
      <div className="welcome__actions">
        <div className="welcome__column">
          <Button href="#contacts">Hire me</Button>
          <Button href="#contacts" variant="secondary">Contact me</Button>
        </div>
      </div>
      <Navigation />
    </header>
  </Content>
)