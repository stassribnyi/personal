type EducationStageItem = Readonly<{
    logoUrl: string;
    institution: string;
    period: {
        from: string;
        to: string;
    }
    degree: string;
    fieldOfStudy: string;
}>;


type WorkStageItem = Readonly<{
    logoUrl: string;
    name: string;
    period: {
        from: string;
        to: string;
    };
    position: string;
    responsibilities: Array<string>;
    technologies: Array<string>;
}>;

export const WORK_STAGES: Array<WorkStageItem> = [
    {
        logoUrl: "/img/career/innovecs.png",
        name: "Innovecs",
        period: {
            from: 'Oct 2019',
            to: 'Present'
        },
        position: 'Senior Software Engineer',
        responsibilities: [
            'Project architecture design and researches',
            'Delivering of new functionality',
            'Code reviews and mentoring',
            'GraphQL server support',
        ],
        technologies: [
            'Javascript',
            'Typescript',
            'HTML5',
            'Styled Components',
            'Material UI',
            'React',
            'React Hooks',
            'React Context API',
            'Bulma',
            'NextJS',
            'Apollo GraphQL',
            'NodeJS',
        ]
    },
    {
        logoUrl: "/img/career/innovecs.png",
        name: "Innovecs",
        period: {
            from: 'Apr 2019',
            to: 'Oct 2019'
        },
        position: 'Senior Software Engineer',
        responsibilities:
            [
                'Development of new functionality and support for older ones',
                'Project architecture and code quality maintenance',
                'Requirement gathering and clarifications',
                'Research of best suitable technologies for upcoming projects',
            ],
        technologies: [
            'Javascript',
            'Typescript',
            'HTML5',
            'CSS3',
            'SCSS',
            'Ionic',
            'Angular',
            'NgRx',
        ]
    },
    {
        logoUrl: "/img/career/caspio.png",
        name: "Caspio",
        period: {
            from: 'Aug 2017',
            to: 'Apr 2019'
        },
        position: 'Middle Software Engineer',
        responsibilities:
            [
                'Researching and implementation of delivering user applications with PWAs using Angular and React',
                'Development of the application designer and application builder based on Angular to provide users with ability to create their own dynamic applications in case of Caspio Platform',
                'Work with team to develop application architecture',
                'Development of new site builder to replace obsolete server-based mechanism',
            ],
        technologies: [
            'Javascript',
            'Typescript',
            'HTML5',
            'Semantic HTML',
            'JSON',
            'XML',
            'AJAX',
            'CSS3',
            'SCSS',
            'React',
            'Redux',
            'Redux Thunk',
            'Angular',
            'RxJS',
            'NodeJS',
        ]
    },
    {
        logoUrl: "/img/career/altexsoft.png",
        name: "AltexSoft",
        period: {
            from: 'Jul 2015',
            to: 'Aug 2017'
        },
        position: 'Junior Software Engineer',
        responsibilities:
            [
                'Development of .NET desktop and web applications',
                'Working with customers to establish requirements and determine priorities',
                'Developing new applications, components & functionality to existing systems',
                'Developing new functionalities, both back-end and front-end',
                'Investigating alternate configurations & implementing better solutions',

            ],
        technologies: [
            '.NET',
            'C#',
            'ASP.NET MVC',
            'ASP.NET WebApi',
            'ASP.NET Web Pages',
            'Entity Framework',
            'LINQ',
            'T-SQL',
            'HTML5',
            'CSS3',
            'AngularJS',
            'JQuery',
            'JQueryUI',
            'WPF',
            'SilverLight',
        ]
    }
];

export const EDUCATION_STAGES: Array<EducationStageItem> = [
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

