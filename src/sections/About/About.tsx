import React from 'react'

import { Section } from '../../components'
import { Details } from './Details'

import {
  Typography,
  Unstable_Grid2 as Grid,
  Avatar,
  Stack,
  Button,
  Chip,
} from '@mui/material'
import Marquee from 'react-fast-marquee'
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
    <Section
      id="about"
      // title="Who am I?"
      sx={{
        // bgcolor: 'common.light',
        position: 'relative',
        // bgcolor: 'rgb(50, 89, 99)',
        backgroundRepeat: 'repeat',
        backgroundSize: 'contain',
        backgroundOrigin: 'content-box',

        backgroundImage:
          'url(https://img.freepik.com/free-vector/linear-flat-abstract-lines-pattern_23-2148940824.jpg?w=1480&t=st=1692893424~exp=1692894024~hmac=031ce18869ad74c194399457ed0e67898824c901dd1949d8dfde34732cfdc5e9)',
        boxShadow: 'inset 0 0 0 1000px rgba(50, 89, 99, 0.9)',
      }}
    >
      <Grid
        container
        spacing={{ xs: 4, lg: 8 }}
        sx={{
          mt: 6,
          mb: 4,
          bgcolor: 'white',
          padding: 2,
          borderRadius: '4px',
          boxShadow: '0px 2px 2px 0px rgba(var(--dark, 51, 51, 51), 0.8)',
        }}
      >
        <Grid xs={12} md={5} lg={4}>
          <Avatar
            src={photoUrl}
            alt={displayName}
            variant="rounded"
            sx={{
              width: '100%',
              height: { xs: 400, lg: '100%' },
              transform: 'rotateY(180deg)',
              // border: '4px solid rgb(50, 89, 99)',
              // TODO: Move into theme configuration
              boxShadow: '0px 2px 2px 0px rgba(var(--dark, 51, 51, 51), 0.4)',
            }}
          />
        </Grid>

        <Grid xs={12} md={7} lg={8}>
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
              align="justify"
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
      <Grid
        container
        sx={{
          bgcolor: 'rgb(50, 89, 99)',
          padding: 2.5,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 0,
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <Marquee
          pauseOnHover
          pauseOnClick
          gradient
          gradientColor={[50, 89, 99]}
          direction="right"
        >
          {/* <Stack flexWrap="wrap" direction="row" gap={1}> */}
          {[
            'Javascript',
            'Typescript',
            'HTML5',
            'Semantic HTML',
            'JSON',
            'XML',
            'AJAX',
            'SCSS',
            'React',
            'Redux',
            'Angular',
            'CSS3',
            'Redux Thunk',
            'RxJS',
            'NodeJS',
          ].map((tech, idx) => (
            // <Chip
            //   key={idx}
            //   label={`#${tech}`}
            //   variant="filled"
            //   sx={{
            //     fontSize: '1.5rem',
            //     color: 'common.light',
            //     // borderColor: 'common.light',
            //     // border: '2px solid',
            //     margin: '0.5rem',
            //     padding: '1.5rem 0',
            //     borderRadius: '24px',
            //     // textDecoration: 'underline',
            //     // lineHeight: '1.5'
            //     // bgcolor: 'common.dark'
            //   }}
            // />
            <Typography sx={{ mr: 2, ml: 2 }} color="common.light">
              #{tech}
            </Typography>
          ))}
          {/* </Stack> */}
        </Marquee>
      </Grid>
    </Section>
  )
}
