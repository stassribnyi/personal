import React from 'react';

import { Styled } from './Timeline.styles';

export type TimelineStageProps = Readonly<{
    left: React.ReactNode,
    right: React.ReactNode,
    variant?: 'primary',
}>;


export type TimelineProps = Readonly<{
    items: Array<TimelineStageProps>
    isRoot?: boolean;
}>;

export const Timeline: React.FC<TimelineProps> = ({ items, isRoot }) => (
    <Styled.List data-root={isRoot}>
        {items.map(({ left, right }, idx) => (
            <Styled.Item key={idx}>
                <Styled.Content>{left}</Styled.Content>
                <Styled.Separator />
                <Styled.Content>{right}</Styled.Content>
            </Styled.Item>
        ))}
    </Styled.List>
);