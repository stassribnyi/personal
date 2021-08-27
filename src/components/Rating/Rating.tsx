import React from 'react';

import { Icon } from '../Icon';

import { Styled } from './Rating.styles';

export type RatingProps = Readonly<{
    rating: number
}>

export const Rating: React.FC<RatingProps> = ({ rating }) => {
    const items = Array(5).fill(0).map((_, idx) => idx >= rating);

    return (
        <Styled.Container>
            {items.map((disabled, idx) =>
                <Icon name="flash" key={idx} disabled={disabled} />
            )}
        </Styled.Container>
    )
}