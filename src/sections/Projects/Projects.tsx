import React from 'react'

import {
  useTheme,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Stack,
  //   Grid,
  Unstable_Grid2 as Grid,
  Link,
} from '@mui/material'

import { Section } from '../../components'

import { PROJECTS } from './Projects.data'

export const Projects: React.FC = () => {
  const theme = useTheme()

  return (
    <Section
      id="projects"
      title="Projects"
      sx={{ backgroundColor: theme.palette.common.light }}
    >
      <Grid container spacing={4}>
        {PROJECTS.map((project, idx) => (
          <Grid key={idx} xs={12} sm={12} md={6}>
            <Card
              sx={{
                // TODO: Move into theme configuration
                boxShadow: '2px 2px 2px 0px rgba(var(--dark, 51, 51, 51), 0.2)',
              }}
            >
              <CardMedia
                sx={{ height: 320 }}
                image={project.preview}
                title={project.name}
              />
              <CardContent>
                <Link variant="h5" color="secondary" href={project.link}>
                  {project.name}
                </Link>
                <Typography gutterBottom variant="body2" sx={{ minHeight: 55 }}>
                  {project.description}
                </Typography>
                <Stack direction="row" spacing={1}>
                  {project.technologies.map((tech, techIdx) => (
                    <Chip key={techIdx} label={tech} />
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Section>
  )
}
