import React from 'react';

import { Section, Layout } from '../components';
import { About, Skills } from '../sections';


const Home: React.FC = () => (
  <Layout>
    <Section id="about" title="About">
      <About />
    </Section>
    <Skills />
  </Layout >
)

export default Home;

