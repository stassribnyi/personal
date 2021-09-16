import { styled } from '@linaria/react';

const SEPARATOR_WIDTH = '0.2rem';
const COLUMN_GAP = '1.5rem';

const MARKER_LEFT_SHIFT = `calc(25% + ${COLUMN_GAP} + ${SEPARATOR_WIDTH} / 2)`;

type ItemProps = Readonly<{ 'data-root'?: boolean }>;

const List = styled.ul<ItemProps>`
    &[data-root] > li {
        &:first-child:before{
            border: none;
            background-size: cover;
            background-image: url(/css/img/first-point.svg);
        }
    }
`;

const Item = styled.li`
    display: grid;
    grid-template-rows: auto auto;
    position: relative;

    @media screen and (min-width: 768px)  {
        grid-template-rows: unset;

        grid-template-columns: 25% ${SEPARATOR_WIDTH} auto;
        grid-column-gap: 1.5rem;

        &:before {
            top: 0;
            left: ${MARKER_LEFT_SHIFT};

            width: 1.25em;
            height: 1.25em;

            content: "";

            display: flex;
            position: absolute;
            box-sizing: border-box;
            transform: translateX(-50%);

            border-radius: 50%;
            background-color: var(--color-white);
            border: 0.25em solid var(--color-light-accent, rgb(244, 121, 124));
        }

        &:last-child > hr {
            background: linear-gradient(
                to bottom,
                var(--color-light, rgb(243, 242, 239)) 80%,
                rgba(var(--white, 255, 255, 255), 0) 100%
            );
        }
    }
`;

const Separator = styled.hr`
    border: none;
    background: var(--color-light, rgb(243, 242, 239));
`;

const Content = styled.div`
    padding-bottom: 1.5rem;
`;

export const Styled = {
    Item,
    List,
    Separator,
    Content
}