import React from 'react';

import { SkillsList } from './SkillsList';

import { Styled } from './Skills.styles';
import { SKILL_GROUPS } from './Skills.data';

export const Skills: React.FC = () => (
    <Styled.Section id="skills" title="Skills">
        {SKILL_GROUPS.map((group, idx) => (
            <Styled.Group key={idx}>
                {group.map(({ name, skills }, idx) => (
                    <div key={idx}>
                        <Styled.Title>{name}</Styled.Title>
                        <SkillsList items={skills} />
                    </div>
                ))}
            </Styled.Group>
        ))}
    </Styled.Section>
)
