import {
  Construction,
  Email,
  Person,
  Science,
  Work,
} from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import React from 'react';

// import styled from 'styled-components';
// import { Icon } from '../../../components';
// import { IconProps } from '../../../components/Icon/Icon.styles';

const LINKS = [
  { href: '#about', label: 'about', icon: <Person /> },
  { href: '#skills', label: 'skills', icon: <Construction /> },
  { href: '#career', label: 'career', icon: <Work /> },
  { href: '#projects', label: 'projects', icon: <Science /> },
  { href: '#contacts', label: 'contacts', icon: <Email /> },
];

// const Links = styled.ul`
//   list-style: none;
//   display: flex;
//   justify-content: space-around;

//   & a {
//     color: white;
//   }
// `;

// const Panel = styled.nav`
//   width: 100%;
//   padding: 0.5rem;
//   position: fixed;
//   z-index: 9999;

//   font-size: 1.125rem;

//   background-color: var(--color-dark, rgb(51, 51, 51));
//   box-shadow: 0 0px 0.25rem var(--color-black);

//   @media screen and (min-width: 341px) and (max-width: 700px) {
//     bottom: 0;
//   }
// `;

// const Link = styled.a`
//   display: flex;
//   flex-direction: column;
//   align-items: center;

//   font-size: 1em;
//   text-decoration: none;
// `;

// const LinkContent = styled.span`
//   font-size: 0.5em;
//   font-weight: 400;
//   line-height: 1.25;
// `;

// const NavLink: React.FC<{ icon?: IconProps['name']; href: string }> = ({
//   href,
//   children,
//   icon,
// }) => (
//   <Link href={href}>
//     {icon && <Icon name={icon} />}
//     <LinkContent>{children}</LinkContent>
//   </Link>
// );

const capitalize = (str: string): string =>
  `${str[0].toUpperCase()}${str.slice(1)}`;

export const Navigation: React.FC<{
  links: Array<{ icon: JSX.Element; href: string; label: string }>;
}> = ({ links }) => (
  // <Panel>
  //   <Links>
  //     {links.map(({ icon, href, label }) => (
  //       <li key={label}>
  //         <NavLink href={href} icon={icon}>
  //           {capitalize(label)}
  //         </NavLink>
  //       </li>
  //     ))}
  //   </Links>
  // </Panel>
  <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
    <BottomNavigation value={links[0].label}>
      {links.map(({ icon, href, label }) => (
        <BottomNavigationAction
          key={label}
          icon={icon}
          href={href}
          label={capitalize(label)}
          value={label}
        />
      ))}
    </BottomNavigation>
  </Paper>
);

Navigation.defaultProps = {
  links: LINKS,
};

