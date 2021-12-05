import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Icon } from './Icon';
import { ICON_NAMES } from './Icon.styles';

export default {
  title: 'Icon',
  component: Icon,
  argTypes: {
    name: {
      label: 'Name',
      options: ICON_NAMES,
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const Default = Template.bind({});

Default.args = {
  name: ICON_NAMES[0],
};
