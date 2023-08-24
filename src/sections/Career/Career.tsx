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
    <Section id="career" sx={{
      backgroundRepeat: 'repeat',
      backgroundSize: 'contain',

      backgroundImage:
        'url(https://img.freepik.com/free-vector/linear-flat-abstract-lines-pattern_23-2148940824.jpg?w=1480&t=st=1692893424~exp=1692894024~hmac=031ce18869ad74c194399457ed0e67898824c901dd1949d8dfde34732cfdc5e9)',
        boxShadow: 'inset 0 0 0 1000px rgba(255, 255, 255, 0.9)',
      
     
    }}>
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
