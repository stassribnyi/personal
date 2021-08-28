import React from 'react';

import { Timeline, TimelineLogo } from '../../../components';
import { Details } from './Details';

import { EDUCATION_STAGES } from './EducationTimeline.data';

export const EducationTimeline: React.FC = () => {
    const timeline = EDUCATION_STAGES.map((institution) => {
        const left = <TimelineLogo
            src={institution.logoUrl}
            alt={institution.institution}
            period={institution.period}
        />;

        const right = <Details
            title={institution.institution}
            degree={institution.degree}
            fieldOfStudy={institution.fieldOfStudy}
        />

        return ({ left, right });
    });

    return <Timeline items={timeline} />;
}