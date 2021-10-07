import React from 'react';
import { Chip } from '../Chip';

import { Styled } from './ChipList.styles';

export type ChipListProps = Readonly<{
    className?: string;
    items: Array<React.ReactNode>;
}>;

export const ChipList: React.FC<ChipListProps> = ({ className, items }) => (
    <Styled.List className={className}>
        {items.map((item, idx) => (
            <Chip key={idx}>{item}</Chip>
        ))}
    </Styled.List>
)