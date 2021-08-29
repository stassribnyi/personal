import React from 'react';
import { ChipList } from '../../../components';

import { Styled } from './WorkDetails.styles';

type DetailsProps = Readonly<{
    position: string;
    responsibilities: Array<string>;
    technologies: Array<string>;
}>;

export const WorkDetails: React.FC<DetailsProps> = ({ position, responsibilities, technologies }) => (
    <>
        <Styled.Title>{position}</Styled.Title>
        <Styled.ResponsibilitiesList>
            {responsibilities.map((r, idx) => (
                <li key={idx}>{r}.</li>
            ))}
        </Styled.ResponsibilitiesList>
        <ChipList items={technologies} />
    </>
)
