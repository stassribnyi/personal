import React from 'react';

import { Layout } from '../components';
import { About, Career, Projects, Skills, Contacts } from '../sections';


const Home: React.FC = () => (
  <Layout>
    {/* <Welcome /> */}
    <About />
    <Skills />
    <Career />
    <Projects />
    <Contacts />
  </Layout >
)

export default Home;

