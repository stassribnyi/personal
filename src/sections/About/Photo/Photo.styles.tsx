
import { styled } from 'linaria/react';

const Container = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 0.2em solid var(--color-dark-accent, rgb(50, 89, 99));
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

export const Styled = {
  Container,
  Image
}