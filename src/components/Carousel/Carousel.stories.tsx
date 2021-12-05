import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Carousel, DEFAULT_OPTIONS } from './Carousel';

export default {
  title: 'Carousel',
  component: Carousel,
} as ComponentMeta<typeof Carousel>;

const Template: ComponentStory<typeof Carousel> = (args) => <Carousel {...args} />;

export const Default = Template.bind({});

Default.args = {
  options: DEFAULT_OPTIONS,
  children: [
    'First slide',
    'Second slide',
    'Third slide',
    'Fourth slide',
  ],
};
