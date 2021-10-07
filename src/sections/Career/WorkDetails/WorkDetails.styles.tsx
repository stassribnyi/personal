import { styled } from '@linaria/react';
import { ChipList } from '../../../components';

const Title = styled.h4`
  /*TODO*/
  line-height: 1.45em;
  margin-bottom: 0.5em;
  color: var(--color-dark-accent, rgb(50, 89, 99));
  text-align: center;

  @media screen and (min-width: 768px)  {
    text-align: initial;
  }
`;

const ResponsibilitiesList = styled.ul`
  list-style: disc;

  padding-left: 1em;
  margin-bottom: 1em;

  font-size: 0.9em;
  line-height: 1.45em;
`;

const Technologies = styled(ChipList)`
  justify-content: center;
  color: var(--color-dark-accent, rgb(50, 89, 99));

  @media screen and (min-width: 768px)  {
    justify-content: initial;
  }
`;

export const Styled = {
  ResponsibilitiesList,
  Technologies,
  Title,
}