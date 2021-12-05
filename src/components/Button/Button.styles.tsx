import styled  from 'styled-components';

type ButtonProps = Readonly<{ 'data-variant': 'primary' | 'secondary' }>;

const Button = styled.button<ButtonProps>`
    &,
    &:link,
    &:visited {
        min-width: 6em;
        margin-right: 1em;
        display: inline-block;
        padding: 0.4em 0.6em;

        cursor: pointer;
        font-size: 1em;
        font-weight: 400;
        text-align: center;
        text-decoration: none;
        color: var(--color-light, rgb(243, 242, 239));

        border: 0.1em solid var(--color-light, rgb(243, 242, 239));

        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);
        text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);

        transition: background-color 0.5s ease-in-out, box-shadow 0.5s ease-in-out;
        will-change: transform;


        &[data-variant="primary"]{
            background-color: var(--color-light-accent, rgb(244, 121, 124));
        }

        &[data-variant="secondary"]{
            background-color: var(--color-dark-accent, rgb(50, 89, 99));
        }
    }

    &:hover,
    &:link:hover,
    &:visited:hover {
        animation-name: btn-up-down;
        animation-duration: 1.5s;
        animation-timing-function: ease-in-out;

        background-color: var(--color-active, rgb(40, 150, 130));
    }

    &:last-child {
        margin-right: 0;
    }

    @keyframes btn-up-down {
        from {
            transform: translateY(0%);
        }

        50% {
            transform: translateY(-10%);
        }

        to {
            transform: translateY(0%);
        }
    }
`;

export const Styled = {
  Button,
};
