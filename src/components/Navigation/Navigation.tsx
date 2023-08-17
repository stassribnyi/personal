import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'

import {
  BottomNavigation,
  BottomNavigationAction,
  Link,
  Theme,
  Typography,
  Slide,
  useMediaQuery,
  Fade,
  Stack,
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
      <BottomNavigation
        value={hash}
        sx={{
          bottom: 0,
          zIndex: 1,
          width: '100%',
          height: '5rem',
          position: 'fixed',
        }}
      >
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
    )
  }

  return (
    <>
      <Fade in={!isSideNavVisible}>
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            zIndex: 1,
            left: '50%',
            top: '100vh',
            position: 'absolute',
            transform: 'translate(-50%, -100%)',
          }}
        >
          <Typography variant="h6" color="white">
            {title}
          </Typography>
          <Link
            href="#about"
            underline="none"
            sx={{
              animation: 'chevronUpDown 1s ease-in-out 0s infinite alternate',
            }}
          >
            <KeyboardArrowDown fontSize="large" />
          </Link>
        </Stack>
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
