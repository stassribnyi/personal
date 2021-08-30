
import { styled } from '@linaria/react';

const Container = styled.section`
  padding: 7% 0;
  /* display: flex;
  align-items: center;
  flex-direction: column; */
`;


const Title = styled.h2`
  font-size: 2em;
  font-weight: 400;
  line-height: 1.45;
  text-align: center;
  text-transform: uppercase;

  width: 70%;
  margin: 0 auto 1.25em auto;
  max-width: var(--max-content-width, 1140px);

  &::after {
    content: "";
    width: 5em;
    height: 0.1em;
    display: flex;
    margin: 0.2em auto 0 auto;
    background-color: var(--color-light-accent, rgb(244, 121, 124));
  }
`;

const Content = styled.div`
  width: 70%;
  margin: 0 auto;
 
  max-width: var(--max-content-width, 1140px);

  /* display: flex; 
  align-items: center;
  flex-direction: column; */
`;

export const Styled = {
  Container,
  Content,
  Title
}