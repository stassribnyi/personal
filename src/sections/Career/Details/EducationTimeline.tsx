import { styled } from '@linaria/react';
import React from 'react';

import { Timeline, TimelineLogo } from '../../../components';
import { EDUCATION_STAGES } from './EducationTimeline.data';

const DetailsTitle = styled.h4`
  /*TODO*/
  line-height: 1.45em;
  margin-bottom: 0.5em;
  color: var(--color-dark-accent, rgb(50, 89, 99));
`;


const FieldOfStudy = styled.p`
  /*TODO*/
  text-indent: 0;
`;


const Degree = styled.p`
  /*TODO*/
  text-indent: 0;
  font-weight: 400;
`;

const InstitutionDetails: React.FC<{
    title: string;
    degree: string;
    fieldOfStudy: string;
}> = ({ title: institutionName, degree, fieldOfStudy }) => (
    <>
        <DetailsTitle>
            {institutionName}
        </DetailsTitle>
        <Degree>
            {degree},
        </Degree>
        <FieldOfStudy>
            {fieldOfStudy}
        </FieldOfStudy>
    </>
)

export const EducationTimeline: React.FC = () => {
    const timeline = EDUCATION_STAGES.map((institution) => {
        const left = <TimelineLogo
            src={institution.logoUrl}
            alt={institution.institution}
            period={institution.period}
        />;

        const right = <InstitutionDetails
            title={institution.institution}
            degree={institution.degree}
            fieldOfStudy={institution.fieldOfStudy}
        />

        return ({ left, right });
    });

    return <Timeline items={timeline} />;
}