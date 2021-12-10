import {
  Stack,
  Typography,
} from '@mui/material';
import React, {  } from 'react';

import styled from 'styled-components';
import { Button } from '../../components';
import { Navigation } from './Navigation';

const Header = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;

  min-height: 100vh;
  overflow: hidden;

  background-size: cover;
  color: var(--color-light, rgb(243, 242, 239));
  background-image: url(/css/img/welcome-min.jpg);

  .welcome__content,
  .welcome__actions {
    flex: 0 1 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 1.5rem 1.5rem 4rem 1.5rem;
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
    content: '';
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
`;

const Blockquote = styled.blockquote`
  width: 50%;
  position: relative;
  margin: 3em 0 1em 50%;

  display: flex;
  flex-direction: column;

  font-size: 0.8em;
  text-align: right;
  font-style: italic;
  line-height: 1.45em;

  &::before {
    position: absolute;
    display: block;
    content: '"';
    top: -4px;
    left: -4px;

    font-size: 3.5em;
  }
`;

const Cite = styled.cite`
  margin-top: 1em;

  font-size: 0.9em;
  line-height: 1.45em;
`;

export const Welcome: React.FC = () => {
  return (
    <>
      <Header>
        <div className='welcome__content'>
          <div className='welcome__column'>
            <Typography variant='h1' className='welcome__title'>
              <em className='my-greeting'>Hello, I am</em>
              <span className='my-name line-on-sides'>Stas Sribnyi</span>
              <strong className='my-title'>Front-End Engineer</strong>
            </Typography>
            <Typography variant='body2'>
              Nice to see you here. I am a skilled front-end engineer with more
              than <span id='js--career-start'>5</span> years of working
              experience both with front-end and back-end. I develop single-page
              web applications using a variety of frameworks such as React and
              Angular. I will be glad to collaborate with you.
            </Typography>
            <Typography component='blockquote'>
              When it is obvious that the goals cannot be reached, don't adjust
              the goals, adjust the action steps.
              <Typography component='cite'>Confucius</Typography>
            </Typography>
          </div>
        </div>
        <div className='welcome__actions'>
          <div className='welcome__column'>
            <Stack spacing={2} direction='row'>
              <Button href='#contacts'>Hire me</Button>
              <Button href='#contacts' color='secondary'>
                Contact me
              </Button>
            </Stack>
          </div>
        </div>
      </Header>
      <Navigation />
    </>
  );
};
