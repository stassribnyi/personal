import React from 'react'
import {
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'

import CheckIcon from '@mui/icons-material/Check'

type DetailsProps = Readonly<{
  position: string
  responsibilities: Array<string>
  technologies: Array<string>
  period: {
    from: string
    to: string
  }
}>

export const WorkDetails: React.FC<DetailsProps> = ({
  period,
  position,
  responsibilities,
  technologies,
}) => (
  <>
    <Typography variant="h6" color="common.light" fontWeight="600">
      {position}
    </Typography>
    <Typography variant="body2" color="common.light">
      {period.from} &mdash; {period.to} (4 years 2 month)
    </Typography>
    <List dense>
      {responsibilities.map((info, idx) => (
        <ListItem key={idx} sx={{ color: 'common.light' }}>
          <ListItemIcon sx={{ minWidth: '2.5rem', color: 'inherit' }}>
            <CheckIcon fontSize="small" color="inherit" />
          </ListItemIcon>
          <ListItemText primary={info} color="inherit" />
        </ListItem>
      ))}
    </List>
    <Stack flexWrap="wrap" direction="row" gap={1} sx={{ mb: 2, mt: 2 }}>
      {technologies.map((tech, idx) => (
        <Chip key={idx} label={tech} sx={{ color: 'common.light' }} />
      ))}
    </Stack>
  </>
)
