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
}>

export const WorkDetails: React.FC<DetailsProps> = ({
  position,
  responsibilities,
  technologies,
}) => (
  <>
    <Typography variant="h6" color="secondary">
      {position}
    </Typography>
    <List dense>
      {responsibilities.map((info, idx) => (
        <ListItem key={idx}>
          <ListItemIcon sx={{ minWidth: '2.5rem' }}>
            <CheckIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={info} />
        </ListItem>
      ))}
    </List>
    <Stack flexWrap="wrap" direction="row" gap={1} sx={{ mb: 2 }}>
      {technologies.map((tech, idx) => (
        <Chip key={idx} label={tech} />
      ))}
    </Stack>
  </>
)
