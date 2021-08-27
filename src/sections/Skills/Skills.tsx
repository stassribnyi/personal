import React from 'react';
import { styled } from '@linaria/react';

import { SkillsList, SkillsListProps } from './SkillsList';
import { Section } from '../../components';

const Container = styled(Section)`
    display: flex;
    color: var(--color-light, rgb(243, 242, 239));
    background-color: var(--color-dark-accent, rgb(50, 89, 99));

    & > div  {
        flex-direction: column;
    }
`;

const SkillCategoryGroupContainer = styled.div`
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 5%;
    padding-bottom: 5%;
    justify-content: space-between;
    border-bottom: 1px solid var(--color-light, rgb(243, 242, 239));

    &:last-child {
        margin-bottom: 0;
    }
`;

const SkillCategoryContainer = styled.div`
    flex: 0 1 47.5%;
    display: flex;
    flex-direction: column;

    &:not(:nth-child(2n + 0)) {
        margin-right: 5%;
    }
`;

const SkillCategoryTitle = styled.h3`
  /*TODO*/
  font-size: 1.4em;
  font-weight: 300;
  text-align: center;
  line-height: 1.45em;
  margin-bottom: 0.5em;
`;

const frontEndSkills: SkillsListProps['skills'] = [
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

const backEndSkills: SkillsListProps['skills'] = [
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

const toolsSkills: SkillsListProps['skills'] = [
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

const technicsAndApproachesSkills: SkillsListProps['skills'] = [
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


const SKILL_GROUPS = [
    [
        { name: 'Front-End', skills: frontEndSkills },
        { name: 'Back-End', skills: backEndSkills }
    ],
    [
        { name: 'Techniques & Approaches', skills: technicsAndApproachesSkills },
        { name: 'Tools', skills: toolsSkills }
    ]
]

export const Skills: React.FC = () => (
    <Container id="skills" title="Skills">
        {SKILL_GROUPS.map((groups, idx) => (
            <SkillCategoryGroupContainer key={idx}>
                {groups.map(({ name, skills }, idx) => (
                    <SkillCategoryContainer key={idx}>
                        <SkillCategoryTitle>{name}</SkillCategoryTitle>
                        <SkillsList skills={skills} />
                    </SkillCategoryContainer>
                ))}
            </SkillCategoryGroupContainer>
        ))}
    </Container>
)
