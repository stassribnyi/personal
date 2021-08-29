import React from 'react';

import { Styled } from './EducationDetails.styles';

type DetailsProps = Readonly<{
    title: string;
    degree: string;
    fieldOfStudy: string;
}>;

export const EducationDetails: React.FC<DetailsProps> = ({ title, degree, fieldOfStudy }) => (
    <>
        <Styled.Title>{title}</Styled.Title>
        <Styled.Degree>{degree},</Styled.Degree>
        <Styled.FieldOfStudy>{fieldOfStudy}</Styled.FieldOfStudy>
    </>
)
