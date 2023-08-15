import React from 'react'
import { Grid, MenuItem, TextField, Typography } from '@mui/material'

import { Button } from '../../components'

export const Form: React.FC = () => (
  <Grid container component="form" flexDirection="column" gap={2.5}>
    <Grid item container flexDirection="column">
      <Typography component="label" htmlFor="name">
        Your Name:
      </Typography>
      <TextField
        id="name"
        placeholder="John Doe"
        type="text"
        variant="outlined"
        focused
        required
      />
    </Grid>

    <Grid item container flexDirection="column">
      <Typography component="label" htmlFor="subject">
        Subject:
      </Typography>
      <TextField
        select
        focused
        id="subject"
        variant="outlined"
        placeholder="A message you would like to send me..."
        defaultValue="Hire You"
      >
        <MenuItem value="Hire You">I wanna hire you</MenuItem>
        <MenuItem value="Contact You">I wanna contact you</MenuItem>
      </TextField>
    </Grid>

    <Grid item container flexDirection="column">
      <Typography component="label" htmlFor="body">
        Message:
      </Typography>
      <TextField
        focused
        multiline
        id="body"
        variant="outlined"
        rows="3"
        placeholder="A message you would like to send me..."
      />
    </Grid>

    <Grid item container flexDirection="column" alignItems="center">
      <Button>Send Message</Button>
    </Grid>
  </Grid>
)
