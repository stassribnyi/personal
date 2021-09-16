import React from 'react';

import { Rating } from '../../../components';

import { Styled } from './SkillsList.styles';

type Skill = Readonly<{
    skill: string;
    strength: number;
}>

export type SkillsListProps = Readonly<{
    items: Array<Skill>
}>;

export const SkillsList: React.FC<SkillsListProps> = ({ items }) => (
    <Styled.List>
        {items.map(({ skill, strength }, idx) => (
            <Styled.Item key={idx}>
                <p>{skill}</p>
                <Rating rating={strength} />
            </Styled.Item>
        ))}
    </Styled.List>
)
