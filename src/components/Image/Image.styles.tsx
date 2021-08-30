
import { styled } from 'linaria/react';

type ContainerProps = Readonly<{
  'data-variant'?: 'rounded';
}>;

const Container = styled.div<ContainerProps>`
  display: inline-block;

  &[data-variant="rounded"] {
    border-radius: 50%;
    border: 0.15em solid var(--color-dark-accent, rgb(50, 89, 99));
  }
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

export const Styled = {
  Container,
  Image
}