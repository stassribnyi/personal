import React from 'react';

import { Styled } from './Details.styles';

type DetailsProps = Readonly<{
    title: string;
    degree: string;
    fieldOfStudy: string;
}>;

export const Details: React.FC<DetailsProps> = ({ title, degree, fieldOfStudy }) => (
    <>
        <Styled.Title>{title}</Styled.Title>
        <Styled.Degree>{degree},</Styled.Degree>
        <Styled.FieldOfStudy>{fieldOfStudy}</Styled.FieldOfStudy>
    </>
)
