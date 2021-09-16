import { styled } from '@linaria/react';

const List = styled.ul`
    list-style: none;
`;

const Item = styled.li`
    gap: 1rem;
    display: flex;
    align-items: center;
    margin-bottom: 0.25rem;
    justify-content: space-between;

    transform: scale(1);
    background-color: transparent;
    transition: transform 0.5s, background-color 0.5s;

    will-change: transform;

    &:hover {
        transform: scale(1.05);
        background-color: rgba(var(--black, 0, 0, 0), 0.1);
    }
`;

export const Styled = {
    Item,
    List,
}