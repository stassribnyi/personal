import React from 'react';
import { Link, Stack } from '@mui/material';

export type LinksProps = Readonly<{
  variant: 'compact' | 'full';
  items: Array<
    Readonly<{
      href: string;
      label: string;
      icon: React.JSX.Element;
      ariaLabel: string;
    }>
  >;
}>;

export const Links: React.FC<LinksProps> = ({ variant, items }) => (
  <Stack direction={variant === 'compact' ? 'row' : 'column'} gap={2}>
    {items.map(({ href, icon, label, ariaLabel }, idx) => (
      <Link key={idx} href={href} aria-label={ariaLabel}>
        {icon}
        {variant === 'full' && label}
      </Link>
    ))}
  </Stack>
);
