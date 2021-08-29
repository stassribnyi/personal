import React from 'react';

import { Styled } from './ChipList.styles';

export type ChipListProps = Readonly<{
    items: Array<React.ReactNode>;
}>;

export const ChipList: React.FC<ChipListProps> = ({ items }) => (
    <Styled.List>
        {items.map((item, idx) => (
            <Styled.Item key={idx}>
                {item}
            </Styled.Item>
        ))}
    </Styled.List>
)