import { Container, Grid, Typography } from '@mui/material';
import React from 'react';

import { Styled } from './Section.styles';

export type SectionProps = Readonly<{
  id: string;
  title: string;
  className?: string;
}>;

export const Section: React.FC<SectionProps> = ({
  id,
  title,
  children,
  className,
}) => (
  <Grid
    component='section'
    container
    flexDirection='column'
    alignItems='center'
    id={id}
    className={className}
    // sx={{
    //   padding: '2.25rem 0',
    // }}
    pt={4.5}
    pb={4.5}
  >
    <Typography variant='h4' component='h2' gutterBottom data-underline>
      {title.toUpperCase()}
    </Typography>
    <Container>{children}</Container>
  </Grid>
);
