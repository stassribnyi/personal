import React from 'react';

import MuiTimeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

export type TimelineStageProps = Readonly<{
  left: React.ReactNode;
  right: React.ReactNode;
  variant?: 'primary';
}>;

export type TimelineProps = Readonly<{
  items: Array<TimelineStageProps>;
  isRoot?: boolean;
}>;

export const Timeline: React.FC<TimelineProps> = ({ items, isRoot }) => (
  <MuiTimeline>
    {items.map(({ left, right }, idx) => (
      <TimelineItem key={idx}>
        <TimelineOppositeContent color='text.secondary'>
          {left}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot
          
            variant={idx === 0 && isRoot ? 'filled' : 'outlined'}
            color='primary'
          />
          <TimelineConnector sx={{ bgcolor: 'common.light' }}/>
        </TimelineSeparator>
        <TimelineContent>{right}</TimelineContent>
      </TimelineItem>
    ))}
  </MuiTimeline>
);
