import React from 'react';

import { Layout } from '../components';
import { About, Career, Skills, Welcome } from '../sections';


const Home: React.FC = () => (
  <Layout>
    <Welcome />
    <About />
    <Skills />
    <Career />
  </Layout >
)

export default Home;

