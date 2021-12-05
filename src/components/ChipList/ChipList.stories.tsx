import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ChipList } from './ChipList';

export default {
  title: 'ChipList',
  component: ChipList,
} as ComponentMeta<typeof ChipList>;

const Template: ComponentStory<typeof ChipList> = (args) => (
  <ChipList {...args} />
);

export const Default = Template.bind({});

Default.args = {
  items: Array(10).fill(1).map((item, idx) => `${item + idx} chip`),
};
