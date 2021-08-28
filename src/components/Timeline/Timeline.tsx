import React from 'react';

import { TimelineStage, TimelineStageProps } from './TimelineStage';

export type TimelineProps = Readonly<{
    items: Array<TimelineStageProps>
}>;

export const Timeline: React.FC<TimelineProps> = ({ items }) => (
    <ul>
        {items.map((stageProps, idx) => (
            <TimelineStage key={idx} {...stageProps} />
        ))}
    </ul>
);