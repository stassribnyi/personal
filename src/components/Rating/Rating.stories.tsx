import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Rating } from './Rating';

export default {
  title: 'Rating',
  component: Rating,
  argTypes: {
    rating: {
      label: 'Rating',
      control: { type: 'range', min: 0, max: 5, step: 1 },
    },
  },
} as ComponentMeta<typeof Rating>;

const Template: ComponentStory<typeof Rating> = (args) => (
    <Rating {...args} />
);

export const Default: ComponentStory<typeof Rating> = Template.bind({});

Default.args = {
  rating: 4,
};
