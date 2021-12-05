import styled  from 'styled-components';

import { Image } from '../../Image';

const Title = styled.p`
    /* TODO */
    font-weight: 400;
`;

const Logo = styled(Image)`
    width: 100px;
    height: 100px;
    margin-bottom: 1em;
`;

const Figure = styled.figure`
    text-align: center;
`;

export const Styled = {
    Figure,
    Logo,
    Title
}