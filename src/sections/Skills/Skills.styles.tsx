import { styled } from '@linaria/react';

import { Section as DefaultSection } from '../../components';

const Section = styled(DefaultSection)`
    display: flex;
    color: var(--color-light, rgb(243, 242, 239));
    background-color: var(--color-dark-accent, rgb(50, 89, 99));
`;

const Group = styled.div`
    display: grid;
    grid-column-gap: 1.5rem;
    grid-template-columns: 1fr 1fr;

    &:not(:last-child) {
        margin-bottom: 1.5rem;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid var(--color-light, rgb(243, 242, 239));
    }
`;

const Title = styled.h3`
  /*TODO*/
  font-size: 1.4em;
  font-weight: 300;
  text-align: center;
  line-height: 1.45em;
  margin-bottom: 0.5em;
`;

export const Styled = {
    Section,
    Group,
    Title
}