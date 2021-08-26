import React from 'react';
import { styled } from 'linaria/react';

const Heading = styled.h1`
  color: red;
`

const Home: React.FC = () => <Heading>Hello Gatsby!</Heading>

export default Home;

