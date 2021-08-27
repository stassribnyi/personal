import React from 'react';

import { Styled } from './Image.styles';

export type ImageProps = Readonly<{
    src: string;
    alt: string;
    className?: string;
    variant?: 'rounded';
}>

export const Image: React.FC<ImageProps> = ({ className, variant, ...imageProps }) => (
    <Styled.Container className={className} data-variant={variant}>
        <Styled.Image {...imageProps} />
    </Styled.Container>
);