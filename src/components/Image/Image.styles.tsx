
import styled  from 'styled-components';

type ContainerProps = Readonly<{
  'data-variant'?: 'rounded';
}>;

const Container = styled.div<ContainerProps>`
  display: inline-block;

  &[data-variant="rounded"] {
    overflow: hidden;
    border-radius: 50%;
    border: 0.25rem solid var(--color-dark-accent, rgb(50, 89, 99));
  }
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
`;

export const Styled = {
  Container,
  Image
}