import styled from 'styled-components';
import React from 'react';

import { Button, Section } from '../../components';
import {
  Grid,
  Link,
  List,
  ListItem,
  MenuItem,
  Stack,
  TextField,
  Theme,
  Typography,
  useMediaQuery,
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
  color: ${({ theme }) => theme.palette.common.white};
  background-color: ${({ theme }) => theme.palette.common.dark};
`;

export const Contacts: React.FC = () => {
  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down('md')
  );

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
      <Grid container spacing={2}>
        <Grid
          item
          container
          flexDirection='column'
          alignItems='center'
          md={5}
          xs={12}
        >
          {!isMobile && (
            <Typography variant='h3' className='contacts__group-title'>
              Links
            </Typography>
          )}
          <Stack direction={isMobile ? 'row' : 'column'} gap={2}>
            {LINKS.map(({ href, icon, label, ariaLabel }, idx) => (
              <Link key={idx} href={href} aria-label={ariaLabel}>
                {icon}
                {!isMobile && label}
              </Link>
            ))}
          </Stack>
        </Grid>

        <Grid
          item
          xs={12}
          md={7}
          container
          flexDirection='column'
          alignItems='center'
        >
          {!isMobile && (
            <Typography variant='h3' className='contacts__group-title'>
              Contact me
            </Typography>
          )}
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
                variant="outlined"
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
                variant="outlined"
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
