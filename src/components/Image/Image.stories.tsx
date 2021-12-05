import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Image } from './Image';

export default {
  title: 'Image',
  component: Image,
  argTypes: {
    variant: {
      label: 'Variant',
      options: ['none', 'rounded'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof Image>;

const Template: ComponentStory<typeof Image> = (args) => <Image {...args} />;

export const Default: ComponentStory<typeof Image> = Template.bind({});

Default.args = {
  src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.fineartamerica.com%2Fimages-medium-large-5%2Fgrumpy-cat-olga-shvartsur.jpg&f=1&nofb=1',
};

export const Avatar: ComponentStory<typeof Image> = Template.bind({});

Avatar.args = {
 ...Default.args,
 variant: 'rounded'
};
