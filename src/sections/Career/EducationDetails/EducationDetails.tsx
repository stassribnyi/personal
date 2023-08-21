import React from 'react'
import { Typography } from '@mui/material'

type DetailsProps = Readonly<{
  title: string
  degree: string
  fieldOfStudy: string
}>

export const EducationDetails: React.FC<DetailsProps> = ({
  title,
  degree,
  fieldOfStudy,
}) => (
  <>
    <Typography variant="h6" color="secondary" fontWeight="600">
      {title}
    </Typography>
    <Typography gutterBottom fontWeight={400}>
      {degree}
    </Typography>
    <Typography variant='body2'>{fieldOfStudy}</Typography>
  </>
)
