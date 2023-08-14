import React from 'react';

import { List, ListItem, ListItemText, Rating, Stack } from '@mui/material';
import { Bolt } from '@mui/icons-material';

export type SkillsListProps = Readonly<{
  items: Array<
    Readonly<{
      skill: string;
      strength: number;
    }>
  >;
}>;

export const SkillsList: React.FC<SkillsListProps> = ({ items }) => (
  <List>
    {items.map(({ skill, strength }, idx) => (
      <ListItem
        key={idx}
        disablePadding
        sx={{
          transition: 'transform 0.5s, background-color 0.5s',

          willChange: 'transform',

          '&:hover': {
            transform: 'scale(1.05)',
            backgroundColor: ' rgba(var(--black, 0, 0, 0), 0.1)',
          },
        }}
      >
        <ListItemText>
          <Stack
            alignItems='center'
            component='span'
            direction='row'
            justifyContent='space-between'
          >
            {skill}
            <Rating
              emptyIcon={
                <Bolt
                  fontSize='inherit'
                  sx={{ color: 'common.light', opacity: 0.5 }}
                />
              }
              icon={<Bolt fontSize='inherit' />}
              readOnly
              size='small'
              sx={{
                // TODO: use color from theme
                color: 'rgb(244, 121, 124)',
              }}
              value={strength}
            />
          </Stack>
        </ListItemText>
      </ListItem>
    ))}
  </List>
);
