
import { SkillsListProps } from './SkillsList';

const frontEndSkills: SkillsListProps['items'] = [
    {
        skill: 'Javascript / Typescript',
        strength: 5
    },
    {
        skill: 'CSS3 / SASS / SCSS',
        strength: 5
    },
    {
        skill: 'HTML5 / Semantic HTML',
        strength: 5
    },
    {
        skill: 'JSON / XML',
        strength: 5
    },
    {
        skill: 'AJAX',
        strength: 5
    },
    {
        skill: 'React / Redux / Redux Thunk',
        strength: 4
    },

    {
        skill: 'Styled Components',
        strength: 4
    },
    {
        skill: 'Angular / RxJs / NgRx',
        strength: 4
    },
    {
        skill: 'Bootstrap / Bulma',
        strength: 4
    },
    {
        skill: 'JQuery / JQueryUI',
        strength: 3
    },
    {
        skill: 'WPF / Silverlight',
        strength: 2
    },
];

const backEndSkills: SkillsListProps['items'] = [
    {
        skill: '.NET Framework / C#',
        strength: 5
    },
    {
        skill: 'ASP.NET / Web Api / Web Pages / MVC',
        strength: 5
    },
    {
        skill: 'Entity Framework / LINQ',
        strength: 4
    },
    {
        skill: 'RESTful WebServices',
        strength: 3
    },
    {
        skill: 'T-SQL',
        strength: 3
    },
    {
        skill: 'WCF',
        strength: 2
    },

    {
        skill: 'NodeJS',
        strength: 2
    },
    {
        skill: 'NextJS',
        strength: 1
    }
];

const toolsSkills: SkillsListProps['items'] = [
    {
        skill: 'Node Package Manager (NPM)',
        strength: 5
    },
    {
        skill: 'Visual Studio Code',
        strength: 5
    },
    {
        skill: 'Visual Studio 2012 and higher',
        strength: 5
    },
    {
        skill: 'Git',
        strength: 5
    },
    {
        skill: 'SVN',
        strength: 4
    },
    {
        skill: 'MS SQL Server',
        strength: 3
    },

    {
        skill: 'Parcel',
        strength: 3
    },
    {
        skill: 'Webpack',
        strength: 2
    },
    {
        skill: 'IIS',
        strength: 2
    },
    {
        skill: 'Grunt',
        strength: 1
    }
];

const technicsAndApproachesSkills: SkillsListProps['items'] = [
    {
        skill: 'Object Oriented Programming (OOP)',
        strength: 5
    },
    {
        skill: 'SOLID Principles',
        strength: 5
    },
    {
        skill: 'DRY Principles',
        strength: 5
    },
    {
        skill: 'KISS Principles',
        strength: 5
    },
    {
        skill: 'Code Refactoring',
        strength: 5
    },
    {
        skill: 'Clean Code',
        strength: 5
    },

    {
        skill: 'Block Element Modifier (BEM)',
        strength: 4
    },
    {
        skill: 'Unit Testing',
        strength: 4
    },
    {
        skill: 'Design Patterns',
        strength: 4
    },
    {
        skill: 'Test Driven Development (TDD)',
        strength: 3
    },
    {
        skill: 'Functional Programming',
        strength: 3
    }
];


export const SKILL_GROUPS = [
    [
        { name: 'Front-End', skills: frontEndSkills },
        { name: 'Back-End', skills: backEndSkills }
    ],
    [
        { name: 'Techniques & Approaches', skills: technicsAndApproachesSkills },
        { name: 'Tools', skills: toolsSkills }
    ]
]
