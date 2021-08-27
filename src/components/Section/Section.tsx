import React from 'react';

import { Styled } from './Section.styles';

export type SectionProps = Readonly<{
  id: string,
  title: string,
  className?: string
}>;

export const Section: React.FC<SectionProps> = ({ id, title, children, className }) => (
  <Styled.Container id={id} className={className}>
    <Styled.Title>{title}</Styled.Title>
    <Styled.Content>{children}</Styled.Content>
  </Styled.Container>
)