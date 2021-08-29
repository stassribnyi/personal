import { styled } from '@linaria/react';

const Title = styled.h4`
  /*TODO*/
  line-height: 1.45em;
  margin-bottom: 0.5em;
  color: var(--color-dark-accent, rgb(50, 89, 99));

`;

const ResponsibilitiesList = styled.ul`
  list-style: disc;

  padding-left: 1em;
  margin-bottom: 1em;

  font-size: 0.9em;
  line-height: 1.45em;
`;


export const Styled = {
  Title,
  ResponsibilitiesList,
}