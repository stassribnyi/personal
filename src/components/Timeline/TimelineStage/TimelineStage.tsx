import React from 'react';

import { Styled } from './TimelineStage.styles';

export type TimelineStageProps = Readonly<{
    left: React.ReactNode,
    right: React.ReactNode,
    variant?: 'primary',
}>;

export const TimelineStage: React.FC<TimelineStageProps> = ({ left, right, variant }) => (
    <Styled.Item data-variant={variant}>
        <Styled.Content>{left}</Styled.Content>
        <Styled.Separator />
        <Styled.Content>{right}</Styled.Content>
    </Styled.Item>
);