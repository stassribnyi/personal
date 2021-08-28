import React from 'react';
import { Styled } from './TimelineLogo.styles';

export type TimelineLogoProps = Readonly<{
    src: string;
    alt: string;
    period: {
        from: string;
        to: string;
    },
    title?: string;
}>;

export const TimelineLogo: React.FC<TimelineLogoProps> = ({ alt, src, title, period }) => (
    <Styled.Figure>
        <Styled.Logo src={src} alt={alt} />
        <figcaption>
            {title && <Styled.Title>{title}</Styled.Title>}
            <p>{period.from} &mdash; {period.to}</p>
        </figcaption>
    </Styled.Figure>
)