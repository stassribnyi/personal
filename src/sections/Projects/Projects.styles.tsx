import { styled } from '@linaria/react';

import { Section as DefaultSection } from '../../components';

const Section = styled(DefaultSection)`
    background-color: var(--color-light, rgb(243, 242, 239));
`;

export const Styled = {
    Section,
}