import { Box, Divider, Stack, Typography } from '@mui/material';
import React from 'react';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
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
  background-image: url(https://hips.hearstapps.com/hmg-prod/images/desk-organization-ideas-6441870b4e0ee.png);

  .welcome__content,
  .welcome__actions {
    flex: 0 1 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 1.5rem 1.5rem 4rem 1.5rem;
  }

  .welcome__column {
    /* max-width: calc(var(--max-content-width, 1140px) / 1.5); */
    margin: auto 6rem;
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
`;

export const Welcome: React.FC = () => {
  return (
    <>
      <Header>
        <div className='welcome__content'>
          <Stack sx={{ margin: 'auto 6rem', width: '80%' }}>
            <Typography component='em' variant='h6'>
              The name is:
            </Typography>
            <Typography variant='h1' sx={{ fontWeight: 600 }}>
              Stas Sribnyi
            </Typography>
            <Typography component='em' variant='h6' align='center'>
              the:
            </Typography>
            <Typography
              gutterBottom
              component='strong'
              variant='h2'
              align='center'
            >
              Software Engineer
            </Typography>
            {/* <Typography variant='h6' gutterBottom>
              Nice to see you here. I am a skilled front-end engineer with more
              than <span id='js--career-start'>5</span> years of working
              experience both with front-end and back-end. I develop single-page
              web applications using a variety of frameworks such as React and
              Angular. I will be glad to collaborate with you.
            </Typography> */}
            <Stack component='blockquote' sx={{ maxWidth: 500, ml: 'auto' }}>
              <Box sx={{ marginLeft: -4 }}>
                <FormatQuoteIcon fontSize='large' />
              </Box>
              <Typography gutterBottom variant='h6'>
                When it is obvious that the goals cannot be reached, don't
                adjust the goals,&nbsp;
                <Typography
                  variant='inherit'
                  component='span'
                  sx={{ fontWeight: 600 }}
                >
                  adjust the action steps.
                </Typography>
              </Typography>
              <Divider
                sx={{ width: 48, height: 4, bgcolor: 'common.light', mb: 1 }}
              />
              <Typography variant='h6' component='cite'>
                Confucius
              </Typography>
            </Stack>
          </Stack>
        </div>
        <div className='welcome__actions'>
          <div className='welcome__column'>
            <Stack spacing={2} direction='row'>
              <Button href='#contacts' size='large'>
                Hire me
              </Button>
              <Button href='#contacts' size='large' color='secondary'>
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
