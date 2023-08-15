import {
  Construction,
  Email,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Person,
  Science,
  Work,
} from '@mui/icons-material'
import {
  BottomNavigation,
  BottomNavigationAction,
  IconButton,
  Link,
  Paper,
  Stack,
  Theme,
  Typography,
  Slide,
  useMediaQuery,
} from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import {
  useScrollamaContext,
  MoveDirection,
  StepDirection,
} from '../../../contexts'

const LINKS = [
  { href: '#about', label: 'about', icon: <Person /> },
  { href: '#skills', label: 'skills', icon: <Construction /> },
  { href: '#career', label: 'career', icon: <Work /> },
  { href: '#projects', label: 'projects', icon: <Science /> },
  { href: '#contacts', label: 'contacts', icon: <Email /> },
]

const capitalize = (str: string): string =>
  `${str[0].toUpperCase()}${str.slice(1)}`

export const Navigation: React.FC = () => {
  const navigate = useNavigate()
  const isDesktop = useMediaQuery<Theme>((theme) => theme.breakpoints.up('lg'))

  const current = useScrollamaContext()
  const { hash } = useLocation()
  const [showNav, setShowNav] = useState(false)

  useEffect(() => {
    const { data: section, direction, step } = current

    if (section.id === 'about') {
      if (
        (direction === MoveDirection.UP && step === StepDirection.EXIT) ||
        (direction === MoveDirection.DOWN && step === StepDirection.ENTER)
      ) {
        setShowNav(direction === MoveDirection.DOWN)

        // toggleNav(direction);
      }

      if (direction === MoveDirection.UP && step === StepDirection.EXIT) {
        // selectLinksBySection(`#`, navLinks);

        return
      }
    }

    if (step !== StepDirection.ENTER) {
      return
    }

    navigate('#' + section.id)
  }, [current])

  if (isDesktop) {
    if (!showNav) {
      return (
        <Box
          sx={{
            top: '100vh',
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            left: '50%',
            transform: 'translate(-50%, -100%)',
            color: 'white',
            zIndex: 1,
          }}
        >
          <Typography variant="h6">Whanna know more about me?</Typography>
          <Link
            href="#about"
            underline="none"
            sx={{
              animationName: 'chevronUpDown',
              animationDuration: '1s',
              animationDirection: 'alternate',
              animationIterationCount: 'infinite',
              animationTimingFunction: 'ease-in-out',
            }}
          >
            <KeyboardArrowDown fontSize="large" />
          </Link>
        </Box>
      )
    }

    return (
     <Slide in={showNav} direction='right'>
       <Paper
        elevation={5}
        sx={{
          color: 'common.light',
          bgcolor: 'common.dark',
          position: 'fixed',
          top: '25%',
          left: '3rem',
          zIndex: 1,
          // marginTop: 'translateY(-60%)',
          borderRadius: '0.5rem',
          padding: '0.5rem',
        }}
      >
        <Stack gap={3}>
          {[
            {
              href: '#',
              label: '',
              icon: <KeyboardArrowUp fontSize="large" />,
            },
            ...LINKS,
          ].map(({ icon, href, label }) => (
            <IconButton
              key={label}
              color={hash === href ? 'primary' : 'inherit'}
              href={href}
              title={label}
              sx={{
                flexDirection: 'column',
              }}
            >
              {icon}
              <Typography variant="caption">{label}</Typography>
            </IconButton>
          ))}
        </Stack>
      </Paper>
     </Slide>
    )
  }

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
      }}
      elevation={3}
    >
      <BottomNavigation value={hash}>
        {LINKS.map(({ icon, href, label }) => (
          <BottomNavigationAction
            key={label}
            icon={icon}
            href={href}
            label={capitalize(label)}
            value={href}
          />
        ))}
      </BottomNavigation>
    </Paper>
  )
}
