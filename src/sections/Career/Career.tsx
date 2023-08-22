import React from 'react'
import { Avatar, Grid, List, ListItem, Typography } from '@mui/material'
import {
  TimelineContent,
  TimelineConnector,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
  Timeline,
} from '@mui/lab'

import { Section } from '../../components'
import { EducationDetails } from './EducationDetails'
import { Recommendations } from './Recommendations'
import { WorkDetails } from './WorkDetails'

import { EDUCATION_STAGES, WORK_STAGES } from './Career.data'

export const Career: React.FC = () => {
  return (
    <Section id="career">
      <List disablePadding>
        <ListItem disablePadding disableGutters>
          <Grid container flexDirection="column" alignItems="center">
            <Typography
              gutterBottom
              component="h2"
              variant="h3"
              sx={{ textTransform: 'uppercase' }}
            >
              Work
            </Typography>
            <Timeline>
              {WORK_STAGES.map((company, idx) => (
                <TimelineItem key={idx}>
                  <TimelineSeparator>
                    <TimelineDot>
                      <Avatar
                        src={company.logoUrl}
                        sx={{ width: 64, height: 64 }}
                      />
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ pt: '1em' }}>
                    <WorkDetails
                      position={`${
                        company.position
                      } at ${company.name.toUpperCase()}`}
                      responsibilities={company.responsibilities}
                      technologies={company.technologies}
                      period={company.period}
                    />
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </Grid>
        </ListItem>

        <ListItem disablePadding disableGutters>
          <Grid container flexDirection="column" alignItems="center">
            <Typography
              gutterBottom
              component="h2"
              variant="h3"
              sx={{ textTransform: 'uppercase' }}
            >
              Education
            </Typography>
            <Timeline>
              {EDUCATION_STAGES.map((institution, idx) => (
                <TimelineItem key={idx}>
                  <TimelineSeparator>
                    <TimelineDot>
                      <Avatar
                        src={institution.logoUrl}
                        sx={{ width: 64, height: 64 }}
                      />
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ pt: '1em' }}>
                    <EducationDetails
                      title={institution.institution}
                      degree={institution.degree}
                      fieldOfStudy={institution.fieldOfStudy}
                      period={institution.period}
                    />
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </Grid>
        </ListItem>

        <ListItem disablePadding disableGutters>
          <Grid container flexDirection="column" alignItems="center">
            <Typography
              gutterBottom
              component="h2"
              variant="h3"
              sx={{ textTransform: 'uppercase' }}
            >
              Recommendations
            </Typography>
            <Recommendations />
          </Grid>
        </ListItem>
      </List>
    </Section>
  )
}
