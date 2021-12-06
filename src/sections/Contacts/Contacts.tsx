import styled from 'styled-components';
import React from 'react';

import { Button, Section } from '../../components';
import {
  Grid,
  Link,
  List,
  ListItem,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import {
  Email,
  Facebook,
  GitHub,
  Instagram,
  LinkedIn,
} from '@mui/icons-material';

const Footer = styled(Section)`
  min-height: 100vh;
  position: relative;
  color: ${({theme}) => theme.palette.common.white};
  background-color: ${({theme}) => theme.palette.common.black};
  /* background-color: var(--color-dark, rgb(51, 51, 51)); */
`;

export const Contacts: React.FC = () => {
  const LINKS = [
    {
      href: 'https://www.linkedin.com/in/stassribnyi',
      label: 'linkedin.com/in/stassribnyi',
      icon: <LinkedIn />,
      ariaLabel: 'LinkedIn',
    },
    {
      href: 'mailto:stas.sribnyi@gmail.com',
      label: 'stas.sribnyi@gmail.com',
      icon: <Email />,
      ariaLabel: 'E-Mail',
    },
    {
      href: 'https://github.com/stassribnyi',
      label: 'github.com/stassribnyi',
      icon: <GitHub />,
      ariaLabel: 'GitHub',
    },
    {
      href: 'https://instagr.am/stas.sribnyi',
      label: 'instagr.am/stas.sribnyi',
      icon: <Instagram />,
      ariaLabel: 'Instagram',
    },
    {
      href: 'https://www.fb.com/stassribnyi',
      label: 'fb.com/stassribnyi',
      icon: <Facebook />,
      ariaLabel: 'Facebook',
    },
  ];

  return (
    <Footer id='contacts' title='Contacts'>
      <Grid sx={{ margin: '0 auto' }} container sm={10} xs={12} spacing={2}>
        <Grid
          item
          container
          flexDirection='column'
          alignItems='center'
          sm={6}
          xs={12}
        >
          <Typography component="h3" data-underline variant='h5' className='contacts__group-title' textAlign="center">
            Links
          </Typography>
          <List>
            {LINKS.map(({ href, icon, label, ariaLabel }, idx) => (
              <ListItem key={idx} disableGutters>
                <Link href={href} aria-label={ariaLabel}>
                  {icon}
                  {label}
                </Link>
              </ListItem>
            ))}
          </List>
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          container
          flexDirection='column'
          alignItems='center'
        >
          <Typography component="h3" data-underline variant='h5' className='contacts__group-title' textAlign="center">
            Contact me
          </Typography>
          <Grid container component='form' flexDirection='column' gap={2.5}>
            <Grid item container flexDirection='column'>
              <Typography component='label' htmlFor='name'>
                Your Name:
              </Typography>
              <TextField
                id='name'
                placeholder='John Doe'
                type='text'
                variant='outlined'
                focused
                required
              />
            </Grid>

            <Grid item container flexDirection='column'>
              <Typography component='label' htmlFor='subject'>
                Subject:
              </Typography>
              <TextField
                select
                focused
                id='subject'
                placeholder='A message you would like to send me...'
                defaultValue='Hire You'
              >
                <MenuItem value='Hire You'>I wanna hire you</MenuItem>
                <MenuItem value='Contact You'>I wanna contact you</MenuItem>
              </TextField>
            </Grid>

            <Grid item container flexDirection='column'>
              <Typography component='label' htmlFor='body'>
                Message:
              </Typography>
              <TextField
                focused
                multiline
                id='body'
                rows='3'
                placeholder='A message you would like to send me...'
              />
            </Grid>

            <Grid item container flexDirection='column' alignItems='center'>
              <Button>Send Message</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Footer>
  );
};
