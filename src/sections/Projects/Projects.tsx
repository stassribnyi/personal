import React from 'react';

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
} from '@mui/material';

import { Section } from '../../components';

import { PROJECTS } from './Projects.data';

export const Projects: React.FC = () => {
  const theme = useTheme();

  return (
    <Section
      id='projects'
      title='Projects'
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
                <Typography variant='h5' component='div'>
                  {project.name}
                </Typography>
                <Typography gutterBottom variant='body2' sx={{ minHeight: 50 }}>
                  {project.description}
                </Typography>
                <Stack direction='row' spacing={1}>
                  {project.technologies.map((tech) => (
                    <Chip label={tech} />
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Section>
  );
};
