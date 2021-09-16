
import { styled } from '@linaria/react';

const List = styled.ul`
  list-style: none;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  flex-direction: column;

  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

const Label = styled.span`
    font-weight: 700;
    margin-bottom: 0.25rem;
`;

const Text = styled.span`
    font-size: 0.9em;
    line-height: 1.25em;
`;

export const Styled = {
  Label,
  Item,
  List,
  Text
};