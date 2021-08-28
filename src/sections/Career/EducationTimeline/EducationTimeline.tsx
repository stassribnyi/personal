import React from 'react';

import { Timeline, TimelineLogo } from '../../../components';

const InstitutionDetails: React.FC<{
    institutionName: string;
    degree: string;
    fieldOfStudy: string;
}> = ({ institutionName, degree, fieldOfStudy }) => (
    <div className="career__education">
        <h4 className="career__institution-name">
            {institutionName}
        </h4>
        <p className="career__education-degree">
            {degree}
        </p>
        <p className="career__education-field-of-study">
            {fieldOfStudy}
        </p>
    </div>
)

type EducationTimelineStage = Readonly<{
    logoUrl: string;
    name: string;
    period: {
        from: string;
        to: string;
    }
    degree: string;
    fieldOfStudy: string;
}>;

export const EducationTimeline: React.FC = () => {
    const educationTimelineData: Array<EducationTimelineStage> = [
        {
            logoUrl: "/img/career/krnu.png",
            name: "Kremenchuk State Polytechnical University",
            period: {
                from: "Sept 2016",
                to: "Aug 2018",
            },
            degree: "Master's degree",
            fieldOfStudy: "Automation Engineer Technology/Technician",
        },
        {
            logoUrl: "/img/career/altexsoft-labs.png",
            period: {
                from: "Oct 2014",
                to: "Jul 2015",
            },
            name: "AltexSoft Lab (.NET Tech Full-Stack)",
            degree: "Junior Software Engineer",
            fieldOfStudy: "Full-Stack .NET (C#/ASP.NET/EF/ADO.NET/WPF) and UI (HTML5, CSS3, JS, AngularJS) platforms development",
        },
        {
            logoUrl: "/img/career/krnu.png",
            name: "Kremenchuk State Polytechnical University",
            period: {
                from: "Sept 2012",
                to: "Aug 2016",
            },
            degree: "Bachelor's degree",
            fieldOfStudy: "Automation Engineer Technology/Technician",
        },
    ]


    const timeline = educationTimelineData.map((institution) => {
        const left = <TimelineLogo
            src={institution.logoUrl}
            alt={institution.name}
            period={institution.period}
        />;

        const right = <InstitutionDetails
            institutionName={institution.name}
            degree={institution.degree}
            fieldOfStudy={institution.fieldOfStudy}
        />

        return ({ left, right });
    });

    return <Timeline items={timeline} />;
}