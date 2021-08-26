
import { styled } from 'linaria/react';

const DetailsList = styled.ul`
  list-style: none;
`;

const DetailItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 0.5em;
  flex-direction: column;

  &:first-child {
    margin-bottom: 1em;
  }

  & > span {
    font-size: 0.9em;
    line-height: 1.25em;
  }

  & > span:first-child {
    font-weight: 700;
    margin-bottom: 0.2em;
  }
`;

export const Styled = {
  DetailsList,
  DetailItem
};