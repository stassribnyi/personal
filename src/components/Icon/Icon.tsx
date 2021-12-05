import React from 'react';

import { Styled, IconProps } from './Icon.styles';

export const Icon: React.FC<IconProps> = ({ name, className, disabled }) => (
    <Styled.Icon name={name} className={className} disabled={disabled} />
)