import { styled } from '@linaria/react';

const List = styled.ul`
    display: flex;
    list-style: none;
    flex-direction: column;
`;

const Item = styled.li`
    display: flex;
    padding: 0 0.1em;
    align-items: center;
    margin-bottom: 0.2em;
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

const Skill = styled.p`
    /*TODO*/
    margin: 0;
    text-indent: 0;
    margin-right: 1em;
`;

export const Styled = {
    Item,
    List,
    Skill
}