import { styled } from '@linaria/react';

const Description = styled.p`
  font-size: 1em;
  text-indent: 2em;
  margin-bottom: 2em;
  line-height: 1.45em;
  text-align: justify;
`;

const Figure = styled.figure`
    display: grid;
    grid-column-gap: 1rem;
    grid-template-columns: auto auto;

    margin-bottom: 1rem;
`;

export const Styled = {
  Description,
  Figure
}