import { styled } from '@linaria/react';

const SEPARATOR_WIDTH = '0.2rem';
const COLUMN_GAP = '1.5rem';

const MARKER_LEFT_SHIFT = `calc(25% + ${COLUMN_GAP} + ${SEPARATOR_WIDTH} / 2)`;

type ItemProps = Readonly<{ 'data-variant'?: 'primary' }>;

const Item = styled.li<ItemProps>`
    display: grid;
    grid-template-columns: 25% ${SEPARATOR_WIDTH} auto;
    grid-column-gap: 1.5rem;
    position: relative;


    &::before {
        top: 0;
        left: ${MARKER_LEFT_SHIFT};

        width: 1.25em;
        height: 1.25em;

        content: "";
        
        display: flex;
        position: absolute;
        box-sizing: border-box;
        transform: translateX(-50%);
      }

      &:not([data-variant="primary"]):before{
            border-radius: 50%;
            background-color: var(--color-white);
            border: 0.25em solid var(--color-light-accent, rgb(244, 121, 124));
      }

    &[data-variant="primary"]:before {
        background-size: cover;
        background-image: url(/css/img/first-point.svg);
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