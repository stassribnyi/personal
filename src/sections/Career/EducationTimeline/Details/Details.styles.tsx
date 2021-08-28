import { styled } from '@linaria/react';

const Title = styled.h4`
  /*TODO*/
  line-height: 1.45em;
  margin-bottom: 0.5em;
  color: var(--color-dark-accent, rgb(50, 89, 99));
`;


const FieldOfStudy = styled.p`
  /*TODO*/
  text-indent: 0;
`;


const Degree = styled.p`
  /*TODO*/
  text-indent: 0;
  font-weight: 400;
`;

export const Styled = {
    FieldOfStudy,
    Degree,
    Title,
}