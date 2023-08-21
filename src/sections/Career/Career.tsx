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
    <Section id="career" title="Career">
      <List>
        <ListItem>
          <Grid container flexDirection="column" alignItems="center">
            <Typography gutterBottom variant="h3">
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
                    />
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </Grid>
        </ListItem>

        <ListItem>
          <Grid container flexDirection="column" alignItems="center">
            <Typography gutterBottom variant="h3">
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
                    />
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </Grid>
        </ListItem>

        <ListItem>
          <Grid container flexDirection="column" alignItems="center">
            <Typography gutterBottom variant="h3">
              Recommendations
            </Typography>
            <Recommendations />
          </Grid>
        </ListItem>
      </List>
    </Section>
  )
}
