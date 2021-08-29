import React from 'react';

import { Styled } from './Chip.styles';

export type ChipProps = Readonly<{
    className?: string;
}>;

export const Chip: React.FC<ChipProps> = ({ className, children }) => (
    <Styled.Item className={className}>
        {children}
    </Styled.Item>
)