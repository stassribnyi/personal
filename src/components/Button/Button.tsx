import React, { MouseEventHandler } from 'react';

import { Styled } from './Button.styles';

export type ButtonProps = Readonly<{
    href?: string;
    onClick?: MouseEventHandler;
    variant?: 'primary' | 'secondary';
}>;

export const Button: React.FC<ButtonProps> = ({ variant = "primary", ...props }) => {
    if (props.href) {
        return <Styled.Button as="a" data-variant={variant} {...props} />;
    }

    return <Styled.Button data-variant={variant}  {...props} />;
}

