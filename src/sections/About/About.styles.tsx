import { styled } from '@linaria/react';
import { Image } from '../../components';

const Description = styled.p`
  font-size: 1em;
  text-indent: 2em;
  margin-bottom: 2em;
  line-height: 1.45em;
  text-align: justify;
`;

const Figure = styled.figure`
    display: grid;
    align-items: center;
    grid-column-gap: 1rem;
    grid-template-columns: auto auto;

    margin-bottom: 1rem;
`;

const Photo = styled(Image)`
  width: 150px;
  height: 150px;
`

export const Styled = {
  Description,
  Figure,
  Photo
}