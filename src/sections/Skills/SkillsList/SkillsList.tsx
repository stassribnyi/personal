import React from 'react';

import { Rating } from '../../../components';

import { Styled } from './SkillsList.styles';

type Skill = Readonly<{
    skill: string;
    strength: number;
}>

export type SkillsListProps = Readonly<{
    skills: Array<Skill>
}>;

export const SkillsList: React.FC<SkillsListProps> = ({ skills }) => (
    <Styled.List>
        {skills.map((i, idx) => (
            <Styled.Item key={idx}>
                <Styled.Skill>{i.skill}</Styled.Skill>
                <Rating rating={i.strength} />
            </Styled.Item>
        ))}
    </Styled.List>
)
