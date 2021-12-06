import { List, ListItem, ListItemText } from '@mui/material';
import React from 'react';

import { Styled } from './Details.styles';

type DetailItem = Readonly<{
  label: string;
  value: string;
}>;

export type DetailsProps = Readonly<{
  items: Array<DetailItem>;
}>;

export const Details: React.FC<DetailsProps> = ({ items }) => (
  <List disablePadding>
    {items.map(({ label, value }, idx) => (
      <ListItem key={idx} disablePadding>
        <ListItemText
          primary={`${label}:`}
          secondary={value}
          primaryTypographyProps={{ align: 'center' }}
          secondaryTypographyProps={{ align: 'center' }}
        />
      </ListItem>
    ))}
  </List>
);
