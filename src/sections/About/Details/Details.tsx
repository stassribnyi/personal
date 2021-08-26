import React from 'react';

import { Styled } from './Details.styles';

type DetailItem = Readonly<{
    label: string;
    value: string
}>;

export type DetailsProps = Readonly<{
    items: Array<DetailItem>;
}>

export const Details: React.FC<DetailsProps> = ({ items }) => (
    <Styled.DetailsList>
        {items.map(({ label, value }, idx) => (
            <Styled.DetailItem key={idx}>
                <span>{label}:</span>
                <span>{value}</span>
            </Styled.DetailItem>
        ))}
    </Styled.DetailsList>
);