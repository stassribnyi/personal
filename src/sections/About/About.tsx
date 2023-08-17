import React from 'react'

import { Button, Section } from '../../components'
import { Details } from './Details'

import {
  Typography,
  Unstable_Grid2 as Grid,
  Avatar,
  Stack,
  Box,
} from '@mui/material'

import { ME } from './About.data'
export const About: React.FC = () => {
  const { age, cvUrl, description, firstName, lastName, location, photoUrl } =
    ME

  const displayName = `${firstName} ${lastName}`

  const details = [
    { label: 'Name', value: displayName },
    { label: 'Age', value: `${age} y/o` },
    { label: 'Location', value: location },
  ]

  return (
    <Section id="about" title="Who am I?" sx={{ bgcolor: 'common.light' }}>
      <Grid container spacing={8}>
        <Grid xs={12} md={5} lg={4}>
            <Avatar
              src={photoUrl}
              alt={displayName}
              variant="rounded"
              sx={{
                width: '100%',
                height: { xs: 400, lg: '100%'},
                transform: 'rotateY(180deg)',
                // TODO: Move into theme configuration
                boxShadow: '0px 2px 2px 0px rgba(var(--dark, 51, 51, 51), 0.4)',
              }}
            />
        </Grid>

        <Grid xs={12} md={7} lg={8}>
          <Stack alignItems="start">
            <Typography
              gutterBottom
              align="center"
              component="h3"
              variant="h4"
              color="secondary"
            >
              Software development without compromising on robustness
            </Typography>
            <Typography
              variant="body1"
              align='justify'
              sx={{
                lineHeight: 1.65,
                textIndent: '2em',
                marginBottom: '2rem',
              }}
            >
              {description}
            </Typography>

            <Button href={cvUrl} target="_blank" rel="noreferrer">
              Want to print my CV?
            </Button>
          </Stack>
        </Grid>

        {/* <Typography component='figcaption'>
            <Details items={details} />
          </Typography> */}
      </Grid>
    </Section>
  )
}
