import React from 'react';
import {
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';

type DetailsProps = Readonly<{
  title: string;
  degree: string;
  fieldOfStudy: string;
}>;

export const EducationDetails: React.FC<DetailsProps> = ({
  title,
  degree,
  fieldOfStudy,
}) => (
  <>
    <Typography variant='h6' color='secondary'>
      {title}
    </Typography>
    <Typography fontWeight={400}>{degree}</Typography>
    <Typography>{fieldOfStudy}</Typography>
  </>
);
