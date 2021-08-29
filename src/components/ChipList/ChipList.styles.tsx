import { styled } from "@linaria/react"

import { Chip } from "../Chip";

const List = styled.li`
    display: flex;
  flex-wrap: wrap;
  list-style: none;
`;

const Item = styled(Chip)`
  margin: 0 0.5em 0.3em 0;
`;

export const Styled = {
    Item,
    List
}