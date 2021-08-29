import { styled } from "@linaria/react"

const Item = styled.li`
    /*TODO*/
    padding: 0.2em 0.6em;

    line-height: 1;
    font-size: 0.9em;
    color: var(--color-dark-accent, rgb(50, 89, 99));

    border-radius: 16px;
    border: 1px solid var(--color-dark-accent, rgb(50, 89, 99));
`;

export const Styled = {
    Item
}