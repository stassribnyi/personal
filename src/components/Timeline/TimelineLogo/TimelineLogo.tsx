import React from 'react'
import { Avatar, Stack, Typography } from '@mui/material'

export type TimelineLogoProps = Readonly<{
  src: string
  alt: string
  period: {
    from: string
    to: string
  }
  title?: string
}>

export const TimelineLogo: React.FC<TimelineLogoProps> = ({
  alt,
  src,
  title,
  period,
}) => (
  <Stack component="figure" alignItems="center" gap={1}>
    <Avatar src={src} alt={alt} sx={{ width: 100, height: 100 }} />
    <figcaption>
      {title && (
        <Typography variant="h6" align="center" color="secondary">
          {title}
        </Typography>
      )}
      <Typography variant="body1">
        {period.from} &mdash; {period.to}
      </Typography>
    </figcaption>
  </Stack>
)
