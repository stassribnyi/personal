import React from 'react';

import { Styled } from './Photo.styles';

export type PhotoProps = Readonly<{
    src: string;
    alt: string;
}>

export const Photo: React.FC<PhotoProps> = ({ alt, src }) => (
    <Styled.Container>
        <Styled.Image src={src} alt={alt} />
    </Styled.Container>
);