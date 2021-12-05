import { styled } from '@linaria/react';

const ICON_NAMES = [
    'at',
    'link',
    'flash',
    'person',
    'construct',
    'briefcase',
    'chevron-up',
    'chevron-down',
    'flask',
    'logo-github',
    'logo-facebook',
    'logo-linkedin',
    'logo-instagram'
] as const;

type IconName = typeof ICON_NAMES[number];

export type IconProps = Readonly<{
    name: IconName;
    className?:string;
    disabled?: boolean;
}>;

const Icon = styled.span<IconProps>`
    height: 1em;
    width: 1em;

    &::before {
        content: "";
        width: 100%;
        height: 100%;
        display: inline-block;
        background-color: currentColor;

        mask-repeat: no-repeat;
        mask-position: center;
    }

    &[disabled] {
        opacity: 0.5;
        color:var(--color-light, rgb(243, 242, 239));
    }

    ${ICON_NAMES.map(icon => `
        &[name="${icon}"]::before {
            mask-image: url(/css/img/ionicons/${icon}.svg);
        }
    `).join('\n')}
`;

export const Styled = {
    Icon
}