import React from 'react';
import { Container, Grid, Typography, useTheme } from '@mui/material';

export type SectionProps = Readonly<
  React.PropsWithChildren<{
    id: string;
    title: string;
    className?: string;
    sx?: object;
  }>
>;

export const Section: React.FC<SectionProps> = ({
  id,
  title,
  children,
  className,
  sx
}) => {
  const theme = useTheme();

  return (
    <Grid
      container
      component='section'
      alignItems='center'
      flexDirection='column'
      id={id}
      className={className}
      sx={{ padding: theme.spacing(9, 0), ...sx }}
    >
      <Typography variant='h2' gutterBottom>
        {title.toUpperCase()}
      </Typography>
      <Container>{children}</Container>
    </Grid>
  );
};
