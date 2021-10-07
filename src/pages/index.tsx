import React from 'react';

import { Layout } from '../components';
import { About, Career, Projects, Skills, Welcome } from '../sections';


const Home: React.FC = () => (
  <Layout>
    {/* <Welcome /> */}
    <About />
    <Skills />
    <Career />
    <Projects />
  </Layout >
)

export default Home;

