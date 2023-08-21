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
import { Avatar } from '@mui/material'

export type TimelineStageProps = Readonly<{
  left: React.ReactNode
  right: React.ReactNode
  variant?: 'primary'
  logoUrl: string
}>

export type TimelineProps = Readonly<{
  items: Array<TimelineStageProps>
  isRoot?: boolean
}>

export const Timeline: React.FC<TimelineProps> = ({ items, isRoot }) => (
  <MuiTimeline sx={{ width: '100%' }}>
    {items.map(({ left, right, logoUrl }, idx) => (
      <TimelineItem key={idx}>
        <TimelineSeparator>
          <TimelineDot>
            <Avatar src={logoUrl} sx={{ width: 64, height: 64 }} />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ pt: '1em' }}>{right}</TimelineContent>
      </TimelineItem>
    ))}
  </MuiTimeline>
)
