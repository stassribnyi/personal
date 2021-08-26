import React from 'react';

import { Styled } from './Section.styles';

export type SectionProps = Readonly<{
  id: string,
  title: string,
  className?: string
}>;

export const Section: React.FC<SectionProps> = ({ id, title, children }) => (
  <Styled.Container id={id}>
    <Styled.Title>{title}</Styled.Title>
    <Styled.Content>{children}</Styled.Content>
  </Styled.Container>
)