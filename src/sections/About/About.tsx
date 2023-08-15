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

const ME = {
  photoUrl: '/img/profiles/about.jpg',
  firstName: 'Stas',
  lastName: 'Sribnyi',
  location: 'Europe, Ukraine, Kyiv',
  age: 26,
  description: `I am passionate about working with UI and I use the latest technologies 
  such as React and Angular (although I personally prefer using React and Vanilla Javascript). 
  I have experience working as a full-stack engineer in the past, so I am familiar with all key parts required to build excellent application. 
  Currently, I am focused on UI development and applying all my knowledge in this field. 
  I started my career more than five years ago by studying at university and simultaneously visiting full-stack software engineering courses. 
  Since then, I have worked with several companies,  held different positions, participated
  in vast variety of projects, and more importantly gained valuable experience that I would love to share with you.`,
  cvUrl: 'https://drive.google.com/open?id=0B4WwhDkyLxKpSDZzdzU4YUdBX1k',
}

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
      <Stack direction="row" gap={20} sx={{ margin: '4rem auto' }}>
        <Stack alignItems="center">
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
            sx={{
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

        <Avatar
          src={photoUrl}
          alt={displayName}
          variant="rounded"
          sx={{
            width: 300,
            height: 570,

            // TODO: Move into theme configuration
            boxShadow: '0px 2px 2px 0px rgba(var(--dark, 51, 51, 51), 0.4)',
          }}
        />
        {/* <Typography component='figcaption'>
            <Details items={details} />
          </Typography> */}
      </Stack>
    </Section>
  )
}
