import {
  Box,
  Divider,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material'
import React from 'react'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import { Button } from '../../components'

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
  <Stack justifyContent="center" sx={{ width: '100%', padding: 20 }}>
    <Typography variant="h1" sx={{ fontWeight: 600, mb: 4 }} align="center">
      Stas Sribnyi
    </Typography>
    <Typography
      gutterBottom
      component="strong"
      variant="h2"
      align="center"
      sx={{ transform: 'rotate(180deg)' }}
    >
      Software Engineer
    </Typography>

    <Stack component="blockquote" sx={{ maxWidth: 500, ml: 'auto', mr: 0 }}>
      <Box sx={{ marginLeft: -4 }}>
        <FormatQuoteIcon fontSize="large" />
      </Box>
      <Typography gutterBottom variant="h6">
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
  </Stack>
)

export const Welcome: React.FC = () => {
  return (
    <>
      <Grid container sx={{ minHeight: '100vh' }}>
        <Grid
          sm={6}
          container
          justifyContent="center"
          sx={{
            color: 'white',
            overflow: 'hidden',
            position: 'relative',
            backgroundColor: 'rgba(var(--dark-accent, 50, 89, 99), 0.5)',
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
              zIndex: -1,
              filter: 'blur(10px)',
            }}
          />
        </Grid>
        <Grid
          sm={6}
          sx={{
            backgroundImage: 'url(/img/me.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
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
