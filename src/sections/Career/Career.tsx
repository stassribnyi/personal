import React from 'react'
import { Grid, List, ListItem, Typography } from '@mui/material'

import { Section, Timeline, TimelineLogo } from '../../components'
import { EducationDetails } from './EducationDetails'
import { Recommendations } from './Recommendations'
import { WorkDetails } from './WorkDetails'

import { EDUCATION_STAGES, WORK_STAGES } from './Career.data'

export const Career: React.FC = () => {
  const educationTimeline = EDUCATION_STAGES.map((institution) => {
    const left = (
      <TimelineLogo
        src={institution.logoUrl}
        alt={institution.institution}
        period={institution.period}
      />
    )

    const right = (
      <EducationDetails
        title={institution.institution}
        degree={institution.degree}
        fieldOfStudy={institution.fieldOfStudy}
      />
    )

    return { left, right }
  })

  const workTimeline = WORK_STAGES.map((company) => {
    const left = (
      <TimelineLogo
        src={company.logoUrl}
        alt={company.name}
        title={company.name}
        period={company.period}
      />
    )

    const right = (
      <WorkDetails
        position={company.position}
        responsibilities={company.responsibilities}
        technologies={company.technologies}
      />
    )

    return { left, right }
  })

  return (
    <Section id="career" title="Career">
      <List disablePadding>
        <ListItem disableGutters sx={{ mb: '4rem' }}>
          <Grid container flexDirection="column" alignItems="center">
            <Typography gutterBottom variant="h3">
              Work
            </Typography>
            <Timeline isRoot items={workTimeline} />
          </Grid>
        </ListItem>

        <ListItem disableGutters sx={{ mb: '4rem' }}>
          <Grid container flexDirection="column" alignItems="center">
            <Typography gutterBottom variant="h3">
              Education
            </Typography>
            <Timeline items={educationTimeline} />
          </Grid>
        </ListItem>

        <ListItem disableGutters sx={{ mb: '4rem' }}>
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
