import React from 'react';

import { styled } from '@linaria/react';
import { Icon } from '../../../components';
import { IconProps } from '../../../components/Icon/Icon.styles';

const LINKS: Array<{
  icon: IconProps['name'],
  href: string,
  label: string
}> = [
    { href: '#about', label: 'about', icon: 'person' },
    { href: '#skills', label: 'skills', icon: 'construct' },
    { href: '#career', label: 'career', icon: 'briefcase' },
    { href: '#projects', label: 'projects', icon: 'flask' },
    { href: '#contacts', label: 'contacts', icon: 'at' },
    // { href: '#cv', label: 'cv', icon: 'person' },
  ];

const Links = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-around;

  & a {
    color: white;
  }
`;

const Panel = styled.nav`
    width: 100%;
    padding: 0.5rem;
    position: fixed;
    z-index: 9999;

    font-size: 1.125rem;;

    background-color: var(--color-dark, rgb(51, 51, 51));
    box-shadow: 0 0px 0.25rem var(--color-black);

    @media screen and (min-width: 341px) and (max-width: 700px) {
        bottom: 0;
    }
`;

const Link = styled.a`
    display: flex;
    flex-direction: column;
    align-items: center;

    font-size: 1em;
    text-decoration: none;
`;

const LinkContent = styled.span`
    font-size: 0.5em;
    font-weight: 400;
    line-height: 1.25;
`;

const NavLink: React.FC<{ icon?: IconProps['name'], href: string }> = ({ href, children, icon }) => (
  <Link href={href}>
    {icon && <Icon name={icon} />}
    <LinkContent>{children}</LinkContent>
  </Link>
)

const capitalize = (str: string): string =>
  `${str[0].toUpperCase()}${str.slice(1)}`

export const Navigation: React.FC<{ links: Array<{ icon: IconProps['name'], href: string, label: string }> }> = ({ links }) => (
  <Panel>
    <Links>
      {links.map(({ icon, href, label }) => (
        <li key={label}>
          <NavLink href={href} icon={icon}>
            {capitalize(label)}
          </NavLink>
        </li>
      ))}
    </Links>
  </Panel>
)

Navigation.defaultProps = {
  links: LINKS
}