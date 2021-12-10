import {
  Construction,
  Email,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Person,
  Science,
  Work,
} from '@mui/icons-material';
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Container,
  Link,
  Paper,
  Stack,
  Theme,
  Toolbar,
  useMediaQuery,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import {
  useScrollamaContext,
  MoveDirection,
  StepDirection,
} from '../../../contexts';

const LINKS = [
  { href: '#about', label: 'about', icon: <Person /> },
  { href: '#skills', label: 'skills', icon: <Construction /> },
  { href: '#career', label: 'career', icon: <Work /> },
  { href: '#projects', label: 'projects', icon: <Science /> },
  { href: '#contacts', label: 'contacts', icon: <Email /> },
];

const capitalize = (str: string): string =>
  `${str[0].toUpperCase()}${str.slice(1)}`;

export const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const isDesktop = useMediaQuery<Theme>((theme) => theme.breakpoints.up('lg'));
  
  const current = useScrollamaContext();
  const { hash } = useLocation();
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const { data: section, direction, step } = current;

    if (section.id === 'about') {
      if (
        (direction === MoveDirection.UP && step === StepDirection.EXIT) ||
        (direction === MoveDirection.DOWN && step === StepDirection.ENTER)
      ) {
        setShowNav(direction === MoveDirection.DOWN);

        // toggleNav(direction);
      }

      if (direction === MoveDirection.UP && step === StepDirection.EXIT) {
        // selectLinksBySection(`#`, navLinks);

        return;
      }
    }

    if (step !== StepDirection.ENTER) {
      return;
    }

    console.log('selectLinksBySection', section);
    navigate('#' + section.id);
  }, [current]);

  if (isDesktop) {
    return (
      <AppBar
        position='sticky'
        sx={{
          mt: '-48px',
          bgcolor: showNav ? 'common.dark' : 'transparent',
        }}
      >
        <Toolbar variant='dense'>
          <Container>
            <Stack direction='row'>
              <Stack flex='1' direction='row' justifyContent='space-around'>
                <Link
                  href='#about'
                  underline='none'
                  variant='h6'
                  sx={{ color: hash === '#about' ? 'red' : 'white' }}
                >
                  /about
                </Link>
                <Link
                  href='#skills'
                  underline='none'
                  variant='h6'
                  sx={{ color: hash === '#skills' ? 'red' : 'white' }}
                >
                  /skills
                </Link>
                <Link
                  href='#career'
                  underline='none'
                  variant='h6'
                  sx={{ color: hash === '#abcareerout' ? 'red' : 'white' }}
                >
                  /career
                </Link>
              </Stack>
              {showNav ? (
                <Link href='#' underline='none'>
                  <KeyboardArrowUp sx={{ fontSize: 48 }} />
                </Link>
              ) : (
                <Link href='#about' underline='none'>
                  <KeyboardArrowDown sx={{ fontSize: 48 }} />
                </Link>
              )}
              <Stack flex='1' direction='row' justifyContent='space-around'>
                <Link
                  href='#projects'
                  underline='none'
                  variant='h6'
                  sx={{ color: hash === '#projects' ? 'red' : 'white' }}
                >
                  /projects
                </Link>
                <Link
                  href='#contacts'
                  underline='none'
                  variant='h6'
                  sx={{ color: hash === '#contacts' ? 'red' : 'white' }}
                >
                  /contacts
                </Link>
                <Link href='#cv' underline='none' variant='h6'>
                  /cv
                </Link>
              </Stack>
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9999 }}
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
  );
};
