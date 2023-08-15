import React from 'react'
import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material'

import { Section } from '../../components'
import { Links } from './Links'
import { Form } from './Form'

import { LINKS } from './Contacts.data'

export const Contacts: React.FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Section
      id="contacts"
      title="Contacts"
      sx={{
        color: `${theme.palette.common.white}`,
        backgroundColor: `${theme.palette.common.dark}`,
      }}
    >
      <Grid container spacing={8}>
        <Grid
          item
          container
          alignItems="center"
          flexDirection="column"
          gap={8}
          md={5}
          xs={12}
        >
          {!isMobile && <Typography variant="h3">Links</Typography>}
          <Links variant={isMobile ? 'compact' : 'full'} items={LINKS} />
        </Grid>

        <Grid
          item
          xs={12}
          gap={8}
          md={7}
          container
          flexDirection="column"
          alignItems="center"
        >
          {!isMobile && <Typography variant="h3">Contact me</Typography>}
          <Form />
        </Grid>
      </Grid>
    </Section>
  )
}
