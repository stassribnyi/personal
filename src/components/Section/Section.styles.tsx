
import { styled } from '@linaria/react';

const Container = styled.section`
    padding: 2.25rem 0;
`;

const Title = styled.h2`
  /* TODO */
  font-size: 2em;
  font-weight: 400;
  line-height: 1.65;
  text-align: center;
  text-transform: uppercase;

  margin: 0 auto 1.25em auto;

  &::after {
    content: "";
    width: 5em;
    height: 0.1em;
    display: flex;
    margin: 0.25rem auto 0 auto;

    background-color: var(--color-light-accent, rgb(244, 121, 124));
  }
`;

const Content = styled.div`
  margin: 0 1rem;
`;

export const Styled = {
  Container,
  Content,
  Title
}