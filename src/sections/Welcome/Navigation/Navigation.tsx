import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'

import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Link,
  Paper,
  Theme,
  Typography,
  Slide,
  useMediaQuery,
  Fade,
} from '@mui/material'

import { KeyboardArrowDown } from '@mui/icons-material'

import { SideNavigation, SideNavigationAction } from './SideNavigation'

const capitalize = (str: string): string =>
  `${str[0].toUpperCase()}${str.slice(1)}`

const hashNonEmpty = (hash: string) => !['', '#'].includes(hash)

export type NavigationProps = Readonly<{
  links: Array<
    Readonly<{
      href: string
      label: string
      icon: React.JSX.Element
    }>
  >
  title: string
}>

export const Navigation: React.FC<NavigationProps> = ({ links, title }) => {
  const { hash } = useLocation()
  const isDesktop = useMediaQuery<Theme>((theme) => theme.breakpoints.up('lg'))

  const [isSideNavVisible, setSideNavVisible] = useState(false)

  useEffect(() => {
    setSideNavVisible(hashNonEmpty(hash))
  }, [hash])

  if (!isDesktop) {
    return (
      <Paper
        sx={{
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          position: 'fixed',
        }}
      >
        {/* TODO: move to Layout */}
        <BottomNavigation value={hash} sx={{ height: '5rem' }}>
          {links
            .filter(({ href }) => hashNonEmpty(href))
            .map(({ icon, href, label }) => (
              <BottomNavigationAction
                key={label}
                icon={icon}
                href={href}
                label={capitalize(label)}
              />
            ))}
        </BottomNavigation>
      </Paper>
    )
  }

  return (
    <>
      <Fade in={!isSideNavVisible}>
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
          <Typography variant="h6">{title}</Typography>
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
      </Fade>
      <Slide in={isSideNavVisible} direction="right">
        <SideNavigation value={hash}>
          {links.map(({ icon, href, label }) => (
            <SideNavigationAction
              key={label}
              icon={icon}
              label={label}
              {...(hashNonEmpty(href)
                ? { href }
                : {
                    showLabel: false,
                    onClick: () => window.scrollTo({ top: 0 }),
                  })}
            />
          ))}
        </SideNavigation>
      </Slide>
    </>
  )
}
