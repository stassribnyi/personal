import React from 'react'
import { Typography } from '@mui/material'

type DetailsProps = Readonly<{
  title: string
  degree: string
  fieldOfStudy: string
  period: {
    from: string
    to: string
  }
}>

export const EducationDetails: React.FC<DetailsProps> = ({
  title,
  degree,
  fieldOfStudy,
  period,
}) => (
  <>
    <Typography variant="h6" color="common.light" fontWeight="600">
      {degree} at {title}
    </Typography>
    <Typography gutterBottom color="common.light"  variant="body2">
      {period.from} &mdash; {period.to} (4 years 2 month)
    </Typography>
    <Typography variant="body2" color="common.light" >{fieldOfStudy}</Typography>
  </>
)
