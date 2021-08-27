import React from 'react';

import { Styled, IconProps } from './Icon.styles';

export const Icon: React.FC<IconProps> = ({ name, disabled }) => (
    <Styled.Icon name={name} disabled={disabled} />
)