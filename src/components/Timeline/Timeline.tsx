import React from 'react';

import { TimelineStage, TimelineStageProps } from './TimelineStage';

export type TimelineProps = Readonly<{
    items: Array<TimelineStageProps>
    isRoot?: boolean;
}>;

export const Timeline: React.FC<TimelineProps> = ({ items, isRoot }) => (
    <ul>
        {items.map((stageProps, idx) => (
            <TimelineStage
                key={idx}
                variant={isRoot && idx === 0 ? 'primary' : undefined}
                {...stageProps} />
        ))}
    </ul>
);