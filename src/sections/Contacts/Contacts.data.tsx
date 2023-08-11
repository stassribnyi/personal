import React from 'react';

import {
  Email,
  Facebook,
  GitHub,
  Instagram,
  LinkedIn,
} from '@mui/icons-material';

export const LINKS = [
  {
    href: 'https://www.linkedin.com/in/stassribnyi',
    label: 'linkedin.com/in/stassribnyi',
    icon: <LinkedIn />,
    ariaLabel: 'LinkedIn',
  },
  {
    href: 'mailto:stas.sribnyi@gmail.com',
    label: 'stas.sribnyi@gmail.com',
    icon: <Email />,
    ariaLabel: 'E-Mail',
  },
  {
    href: 'https://github.com/stassribnyi',
    label: 'github.com/stassribnyi',
    icon: <GitHub />,
    ariaLabel: 'GitHub',
  },
  {
    href: 'https://instagr.am/stas.sribnyi',
    label: 'instagr.am/stas.sribnyi',
    icon: <Instagram />,
    ariaLabel: 'Instagram',
  },
  {
    href: 'https://www.fb.com/stassribnyi',
    label: 'fb.com/stassribnyi',
    icon: <Facebook />,
    ariaLabel: 'Facebook',
  },
];
