import { styled } from '@linaria/react';

const SEPARATOR_WIDTH = '0.2rem';
const COLUMN_GAP = '1.5rem';

const Item = styled.li`
    display: grid;
    grid-template-columns: 25% ${SEPARATOR_WIDTH} auto;
    grid-column-gap: 1.5rem;
    position: relative;


    &::before {
        top: 0;
        left: calc(25% + ${COLUMN_GAP} + ${SEPARATOR_WIDTH} / 2);
        content: "";
        width: 0.8em;
        height: 0.8em;
        display: flex;
        position: absolute;
        border-radius: 50%;
        transform: translateX(-50%);
        background-color: var(--color-white);
        border: 0.25em solid var(--color-light-accent, rgb(244, 121, 124));
    }
`;

const Separator = styled.div`
    background-image: linear-gradient(
        to bottom,
        var(--color-light, rgb(243, 242, 239)) 90%,
        rgba(var(--white, 255, 255, 255), 0) 100%
    );
`;

const Content = styled.div`
    padding-bottom: 1.5rem;
`;

export const Styled = {
    Item,
    Separator,
    Content
}