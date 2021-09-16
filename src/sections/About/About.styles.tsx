import { styled } from '@linaria/react';
import { Image } from '../../components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Description = styled.p`
  font-size: 1em;
  text-indent: 2em;
  margin-bottom: 2rem;
  line-height: 1.45;
  text-align: justify;
`;

const Figure = styled.figure`
    display: grid;
    align-items: center;
    grid-column-gap: 1rem;
    grid-template-columns: auto auto;

    margin-bottom: 1.5rem;
`;

const Photo = styled(Image)`
  width: 7.8125rem;
  height: 7.8125rem;
`

export const Styled = {
  Container,
  Description,
  Figure,
  Photo
}