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
    <Styled.List>
        {items.map(({ label, value }, idx) => (
            <Styled.Item key={idx}>
                <Styled.Label>{label}:</Styled.Label>
                <Styled.Text>{value}</Styled.Text>
            </Styled.Item>
        ))}
    </Styled.List>
);