import { styled } from '@linaria/react';
import React from 'react';


import { Section, Timeline, TimelineLogo } from '../../components';

import { Recommendations } from './Recommendations';
import { EducationDetails } from './EducationDetails';
import { EDUCATION_STAGES, WORK_STAGES } from './Career.data';
import { WorkDetails } from './WorkDetails';

const List = styled.ul`
  list-style: none;

.career__group-title {
  /*TODO*/
  font-size: 1.5em;
  font-weight: 300;
  text-align: center;
  line-height: 1.25em;
  margin-bottom: 1em;
  text-transform: uppercase;
}

.career__group-title::after {
  content: "";
  width: 10em;
  display: flex;
  height: 0.05em;
  margin: 0.1em auto 0;
  background-color: var(--color-light-accent, rgb(244, 121, 124));
}

.career__recommendation {
  display: flex;
  margin: 0 auto;
  align-items: center;
  flex-direction: column-reverse;

  font-size: 1em;
  text-indent: 1em;
  text-align: center;
  line-height: 1.45em;
}

.recommendation__details {
  display: flex;
  margin-bottom: 1em;
  align-items: center;
  flex-direction: column;
}

.recommendation__details:link,
.recommendation__details:visited {
  text-decoration: none;
  color: var(--color-dark, rgb(51, 51, 51));
}

.recommendation__author-photo {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  margin-bottom: 1em;
  border: 2px solid var(--color-dark-accent, rgb(50, 89, 99));
}

.recommendation__author-photo img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.recommendation__author-info > h4,
.recommendation__author-info > p {
  /*TODO*/
  text-indent: 0;
  text-align: center;
  line-height: 1.45em;
}

.recommendation__author-info > h4 {
  font-style: normal;
  margin-bottom: 0.5em;
  color: var(--color-dark-accent, rgb(50, 89, 99));
}

.recommendation__details:hover .recommendation__author-info > h4 {
  text-decoration: underline;
}
`;


const Title = styled.h3<{ 'data-variant'?: 'underlined' }>`
  /*TODO*/
  font-size: 1.5em;
  font-weight: 300;
  text-align: center;
  line-height: 1.25em;
  margin-bottom: 1em;
  text-transform: uppercase;

  &[data-variant="underlined"]::after {
    content: "";
    width: 10em;
    display: flex;
    height: 0.05em;
    margin: 0.1em auto 0;
    background-color: var(--color-light-accent, rgb(244, 121, 124));
  }
`;


const Item = styled.li`
  margin-bottom: 2.5em;
`;

export const Career: React.FC = () => {
  const educationTimeline = EDUCATION_STAGES.map((institution) => {
    const left = <TimelineLogo
      src={institution.logoUrl}
      alt={institution.institution}
      period={institution.period}
    />;

    const right = <EducationDetails
      title={institution.institution}
      degree={institution.degree}
      fieldOfStudy={institution.fieldOfStudy}
    />

    return ({ left, right });
  });

  const workTimeline = WORK_STAGES.map((company) => {
    const left = <TimelineLogo
      src={company.logoUrl}
      alt={company.name}
      title={company.name}
      period={company.period}
    />;

    const right = <WorkDetails
      position={company.position}
      responsibilities={company.responsibilities}
      technologies={company.technologies}
    />

    return ({ left, right });
  });

  return (
    <Section id="career" title="Career" >
      <List>
        <Item>
          <Title data-variant="underlined">Work</Title>
          <Timeline isRoot items={workTimeline} />
        </Item>

        <Item>
          <Title data-variant="underlined">Education</Title>
          <Timeline items={educationTimeline} />
        </Item>

        <Item>
          <Title data-variant="underlined">Recommendations</Title>
          <Recommendations />
        </Item>
      </List>
    </Section>
  )
}