import React from 'react';

import { Section, Layout } from '../components';
import { About } from '../sections';


const Home: React.FC = () => (
  <Layout>
    <Section id="about" title="About">
      <About />
    </Section>
  </Layout>
)

export default Home;

