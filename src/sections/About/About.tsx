import React from 'react';

import { Button, Section, Image } from '../../components';
import { Details } from './Details';

import { Typography, Grid, Avatar } from '@mui/material';

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
  cvUrl: 'https://drive.google.com/open?id=0B4WwhDkyLxKpSDZzdzU4YUdBX1k',
};

export const About: React.FC = () => {
  const { age, cvUrl, description, firstName, lastName, location, photoUrl } =
    ME;

  const displayName = `${firstName} ${lastName}`;

  const details = [
    { label: 'Name', value: displayName },
    { label: 'Age', value: `${age} y/o` },
    { label: 'Location', value: location },
  ];

  return (
    <Section id='about' title='About'>
      <Grid container direction='column' alignItems='center'>
        <Grid
          container
          columnGap='1rem'
          justifyContent='center'
          alignItems='center'
          marginBottom='1.5rem'
        >
          <Avatar
            src={photoUrl}
            alt={displayName}
            sx={{ width: 100, height: 100 }}
          />
          <Typography component='figcaption'>
            <Details items={details} />
          </Typography>
        </Grid>

        <Typography
          variant='body1'
          sx={{
            textIndent: '2em',
            marginBottom: '2rem',
          }}
        >
          {description}
        </Typography>

        <Button href={cvUrl}>Download regular version of my CV</Button>
      </Grid>
    </Section>
  );
};
