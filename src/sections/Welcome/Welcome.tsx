import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material'
import React from 'react'
import { FormatQuote } from '@mui/icons-material'

// TODO: use simpler implementation
import Typed from 'react-typed'

const Contacts: React.FC = () => (
  <Stack spacing={2} direction="row">
    <Button href="#contacts" size="large">
      Hire me
    </Button>
    <Button href="#contacts" size="large" color="secondary">
      Contact me
    </Button>
  </Stack>
)

const Intro: React.FC = () => (
  <Stack justifyContent="center" sx={{ width: '100%', padding: '10%' }}>
    <Typography variant="h1" sx={{ fontWeight: 600, mb: 4 }} align="center">
      Stas Sribnyi
    </Typography>
    <Typography
      gutterBottom
      component="strong"
      variant="h2"
      align="center"
      sx={{
        // TODO: create separate typography with underline
        '&:after': {
          display: 'none',
        },
      }}
    >
      <Typed strings={['Software Engineer']} typeSpeed={40} loop backDelay={5000} backSpeed={70} />
    </Typography>

    <Stack component="blockquote" alignItems='end' sx={{ maxWidth: 500, ml: 'auto', mr: 0, mb: 8 }}>
      <Box sx={{ marginLeft: -4 }} alignSelf='start'>
        <FormatQuote fontSize="large" />
      </Box>
      <Typography gutterBottom variant="h6" align='justify'>
        When it is obvious that the goals cannot be reached, don't adjust the
        goals,&nbsp;
        <Typography variant="inherit" component="span" sx={{ fontWeight: 600 }}>
          adjust the action steps.
        </Typography>
      </Typography>
      <Divider sx={{ width: 48, height: 4, bgcolor: 'common.light', mb: 1 }} />
      <Typography variant="h6" component="cite">
        Confucius
      </Typography>
    </Stack>
    <Box sx={{ display: { xs: 'flex', lg: 'none' }, justifyContent: 'center' }}>
      <Contacts />
    </Box>
  </Stack>
)

export const Welcome: React.FC = () => {
  return (
    <>
      <Grid container sx={{ minHeight: '100vh' }}>
        <Grid
          xs={12}
          lg={6}
          container
          justifyContent="center"
          sx={{
            color: 'white',
            overflow: 'hidden',
            position: 'relative',

            '&:before': {
            background: 'rgb(var(--dark-accent, 50, 89, 99))',
            filter: 'url(#noiseFilter)'
            },

            '&:before, &:after': {
              position: 'absolute',
              left: 0,
              top: 0,
              content: '""',
              width: '100%',
              height:'100%',
              zIndex: -1,
              opacity: '20%'
            }
          }}
        >
          <Intro />
          <Box
            sx={{
              backgroundImage: 'url(/img/fireplace.jpg)',
              backgroundSize: 'cover',
              position: 'absolute',
              top: -20,
              right: -20,
              bottom: -20,
              left: -20,
              zIndex: -2,
              filter: 'blur(10px)',
            }}
          />
          
    <svg>
        <filter id='noiseFilter'>
          <feTurbulence 
            type='fractalNoise' 
            baseFrequency='0.8' 
            stitchTiles='stitch'/>
           <feColorMatrix in="colorNoise" type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0" />
              <feComposite operator="in" in2="SourceGraphic" result="monoNoise"/>
              <feBlend in="SourceGraphic" in2="monoNoise" mode="screen" />
        </filter>
        
      </svg>
        </Grid>
        <Grid
          lg={6}
          sx={{
            backgroundImage: 'url(/img/me.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            display: { xs: 'none', lg: 'flex' },
          }}
          container
          justifyContent="center"
          alignItems="center"
        >
          <Contacts />
        </Grid>
      </Grid>
    </>
  )
}
