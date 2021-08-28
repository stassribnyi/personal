import { styled } from '@linaria/react';
import React from 'react';


import { Section } from '../../components';

import { EducationTimeline } from './EducationTimeline';
import { Recommendations } from './Recommendations';
import { Experience } from './Experience';

const List = styled.ul`

  width: 100%;
  display: flex;
  list-style: none;
  flex-direction: column;

.career__group {
  display: flex;
  flex-direction: column;
}

.career__group:not(:last-child) {
  margin-bottom: 2.5em;
}

.career__group-title {
  /*TODO*/
  font-size: 1.5em;
  font-weight: 300;
  text-align: center;
  line-height: 1.25em;
  margin-bottom: 1em;
  text-transform: uppercase;
}

.career__group-title::after {
  content: "";
  width: 10em;
  display: flex;
  height: 0.05em;
  margin: 0.1em auto 0;
  background-color: var(--color-light-accent, rgb(244, 121, 124));
}

.career__work-stages{
  position: relative;
}

.career__work-stages::before {
  top: 0;
  left: 25%;
  bottom: 0;
  content: "";
  width: 0.2em;
  display: flex;
  position: absolute;
  transform: translateX(-50%);
  background-image: linear-gradient(
    to bottom,
    var(--color-light, rgb(243, 242, 239)) 90%,
    rgba(var(--white, 255, 255, 255), 0) 100%
  );
}

.career__work-stage,
.career__education-stage {
    display: grid;
    grid-template-columns: 25% auto;
    grid-column-gap: 3rem;
    margin-bottom: 1.5rem;
    position: relative;
}

.career__work-stage:not(:first-child)::before {
  top: 0;
  left: 25%;
  content: "";
  width: 0.8em;
  height: 0.8em;
  display: flex;
  position: absolute;
  border-radius: 50%;
  transform: translateX(-50%);
  background-color: var(--color-white);
  border: 0.25em solid var(--color-light-accent, rgb(244, 121, 124));
}

.career__work-stage:first-child::after {
  left: 25%;
  top: -0.2em;
  content: "";
  width: 1.8em;
  height: 1.8em;
  display: flex;
  position: absolute;
  transform: translateX(-50%);
  background-image: url(/css/img/first-point.svg);
  background-size: cover;
}

.career__company {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.career__company p {
  /*TODO*/
  text-indent: 0;
  text-align: center;
}

.career__company img {
  width: 100px;
  height: 100px;
  margin-bottom: 1em;
}

.career__company-name {
  font-weight: 400;
}

.career__position{
  display: flex;
  flex-direction: column;
}

.career__position h4 {
  /*TODO*/
  line-height: 1.45em;
  margin-bottom: 0.5em;
  color: var(--color-dark-accent, rgb(50, 89, 99));
}


.career__technologies {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
}

.career__responsibilities {
  list-style: disc;

  padding-left: 1em;
  margin-bottom: 1em;

  font-size: 0.9em;
  line-height: 1.45em;
}

.career__technologies > li {
  /*TODO*/
  padding: 0.2em 0.6em;
  margin: 0 0.5em 0.3em 0;

  line-height: 1;
  font-size: 0.9em;
  color: var(--color-dark-accent, rgb(50, 89, 99));

  border-radius: 16px;
  border: 1px solid var(--color-dark-accent, rgb(50, 89, 99));
}

.career__recommendation {
  display: flex;
  margin: 0 auto;
  align-items: center;
  flex-direction: column-reverse;

  font-size: 1em;
  text-indent: 1em;
  text-align: center;
  line-height: 1.45em;
}

.recommendation__details {
  display: flex;
  margin-bottom: 1em;
  align-items: center;
  flex-direction: column;
}

.recommendation__details:link,
.recommendation__details:visited {
  text-decoration: none;
  color: var(--color-dark, rgb(51, 51, 51));
}

.recommendation__author-photo {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  margin-bottom: 1em;
  border: 2px solid var(--color-dark-accent, rgb(50, 89, 99));
}

.recommendation__author-photo img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.recommendation__author-info > h4,
.recommendation__author-info > p {
  /*TODO*/
  text-indent: 0;
  text-align: center;
  line-height: 1.45em;
}

.recommendation__author-info > h4 {
  font-style: normal;
  margin-bottom: 0.5em;
  color: var(--color-dark-accent, rgb(50, 89, 99));
}

.recommendation__details:hover .recommendation__author-info > h4 {
  text-decoration: underline;
}

`;

export const Career: React.FC = () => {

  return (
    <Section id="career" title="Career" >
      <List>
        {/* <Experience /> */}

        <li className="career__group">
          <h3 className="career__group-title">Education</h3>
          <EducationTimeline />
        </li>
        {/* <Recommendations /> */}
      </List>
    </Section>
  )
}