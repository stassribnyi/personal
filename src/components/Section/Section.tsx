import React from 'react'
import { Container, Grid, Typography, useTheme } from '@mui/material'

export type SectionProps = Readonly<
  React.PropsWithChildren<{
    id: string
    title: string
    className?: string
    sx?: object
  }>
>

export const Section: React.FC<SectionProps> = ({
  id,
  title,
  children,
  className,
  sx,
}) => {
  const theme = useTheme()

  return (
    <Grid
      container
      component="section"
      alignItems="center"
      flexDirection="column"
      id={id}
      className={className}
      sx={{
        minHeight: '100vh',
        padding: theme.spacing(9, 0),
        ...sx,
      }}
    >
      <Typography
        gutterBottom
        align="center"
        component="h2"
        variant="h3"
        sx={{ minWidth: `${title.length + 2}ch` }}
      >
        {title.toUpperCase()}
      </Typography>
      <Container>{children}</Container>
    </Grid>
  )
}
