import React from 'react';

import { Button, Section, Image } from '../../components';
import { Details } from './Details';

import { Styled } from './About.styles';

const ME = {
  photoUrl: '/img/profiles/stassribnyi.jpg',
  firstName: 'Stas',
  lastName: 'Sribnyi',
  location: 'Europe, Ukraine, Kyiv',
  age: 26,
  description: `Working with UI is my passion and so I do it using the latest
  technologies such as React and Angular (but personally prefer using
  React and Vanilla Javascript 😁). Some time ago I used to be a
  full-stack engineer, so I worked both with back and front end code.
  Now I use all my knowledge in UI development world. I started my
  wonderful career about five years ago by studying full-stack
  software engineer courses, I did my best to learn the most about
  software development and apply for a job at my first company. Since
  then I worked with several companies, with the different teams, hold
  different positions and I am here, to provide you with all that
  experience to make you happy 😎.`,
  cvUrl: 'https://drive.google.com/open?id=0B4WwhDkyLxKpSDZzdzU4YUdBX1k'
}

export const About: React.FC = () => {
  const { age, cvUrl, description, firstName, lastName, location, photoUrl } = ME;

  const displayName = `${firstName} ${lastName}`;

  const details = [
    { label: 'Name', value: displayName },
    { label: 'Age', value: `${age} y/o` },
    { label: 'Location', value: location },
  ];

  return (
    <Section id="about" title="About">
      <Styled.Figure>
        <Styled.Photo src={photoUrl} alt={displayName} variant="rounded" />
        <figcaption>
          <Details items={details} />
        </figcaption>
      </Styled.Figure>

      <Styled.Description>
        {description}
      </Styled.Description>

      <Button href={cvUrl}>
        Download regular version of my CV
      </Button>
    </Section>
  )
}