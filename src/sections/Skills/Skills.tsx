import React from 'react'

import { SkillsList } from './SkillsList'

import { SKILL_GROUPS } from './Skills.data'
import { Section } from '../../components'
import { Typography, Unstable_Grid2 as Grid, Divider } from '@mui/material'

export const Skills: React.FC = () => (
  <Section
    id="skills"
    title="Skills"
    sx={{
      color: 'common.light',
      // TODO: use theme color
      bgcolor: 'rgb(50, 89, 99)',
    }}
  >
    {SKILL_GROUPS.map((group, idx) => (
      <React.Fragment key={idx}>
        <Grid container spacing={8}>
          {group.map(({ name, skills }, idx) => (
            <Grid xs={12} md={6} key={idx}>
              <Typography variant="h5" component="h3" align="center">
                {name}
              </Typography>
              <SkillsList items={skills} />
            </Grid>
          ))}
        </Grid>
        <Divider
          sx={{
            bgcolor: 'common.light',
            margin: '2rem 0',
          }}
        />
      </React.Fragment>
    ))}
  </Section>
)
