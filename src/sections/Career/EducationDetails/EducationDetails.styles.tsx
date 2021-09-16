import { styled } from '@linaria/react';

const Title = styled.h4`
  /*TODO*/
  text-align: center;

  @media screen and (min-width: 768px)  {
    text-align: initial;
  }

  line-height: 1.45;
  margin-bottom: 0.5rem;
  color: var(--color-dark-accent, rgb(50, 89, 99));
`;


const FieldOfStudy = styled.p`
  /*TODO*/
  text-align: center;

  @media screen and (min-width: 768px)  {
    text-align: initial;
  }
`;


const Degree = styled.p`
  /*TODO*/
  text-align: center;

  @media screen and (min-width: 768px)  {
    text-align: initial;
  }

  font-weight: 400;
`;

export const Styled = {
  FieldOfStudy,
  Degree,
  Title,
}