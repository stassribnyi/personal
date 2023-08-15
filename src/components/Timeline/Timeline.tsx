import React from 'react'

import {
  TimelineContent,
  TimelineConnector,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
  TimelineOppositeContent,
  Timeline as MuiTimeline,
} from '@mui/lab'

export type TimelineStageProps = Readonly<{
  left: React.ReactNode
  right: React.ReactNode
  variant?: 'primary'
}>

export type TimelineProps = Readonly<{
  items: Array<TimelineStageProps>
  isRoot?: boolean
}>

export const Timeline: React.FC<TimelineProps> = ({ items, isRoot }) => (
  <MuiTimeline>
    {items.map(({ left, right }, idx) => (
      <TimelineItem key={idx}>
        <TimelineOppositeContent>{left}</TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot
            variant={idx === 0 && isRoot ? 'filled' : 'outlined'}
            color="primary"
          />
          <TimelineConnector sx={{ bgcolor: 'common.light' }} />
        </TimelineSeparator>
        <TimelineContent sx={{ maxWidth: 800 }}>{right}</TimelineContent>
      </TimelineItem>
    ))}
  </MuiTimeline>
)
