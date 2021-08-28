type EducationStage = Readonly<{
    logoUrl: string;
    institution: string;
    period: {
        from: string;
        to: string;
    }
    degree: string;
    fieldOfStudy: string;
}>;

export const EDUCATION_STAGES: Array<EducationStage> = [
    {
        logoUrl: "/img/career/krnu.png",
        institution: "Kremenchuk State Polytechnical University",
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
        institution: "AltexSoft Lab (.NET Tech Full-Stack)",
        degree: "Junior Software Engineer",
        fieldOfStudy: "Full-Stack .NET (C#/ASP.NET/EF/ADO.NET/WPF) and UI (HTML5, CSS3, JS, AngularJS) platforms development",
    },
    {
        logoUrl: "/img/career/krnu.png",
        institution: "Kremenchuk State Polytechnical University",
        period: {
            from: "Sept 2012",
            to: "Aug 2016",
        },
        degree: "Bachelor's degree",
        fieldOfStudy: "Automation Engineer Technology/Technician",
    },
]

