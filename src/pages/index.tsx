import React from 'react';
import { Step } from 'react-scrollama';
import { Layout } from '../components';
import { ScrollamaProvider } from '../contexts';
import {
  About,
  Career,
  Projects,
  Skills,
  Contacts,
  Welcome,
} from '../sections';
import { Navigation } from '../sections/Welcome/Navigation';

const Home: React.FC = () => {
  return (
    <Layout>
      <ScrollamaProvider>
        <Step data={{ id: '' }}>
          <div>
            <Welcome />
          </div>
        </Step>

        <Step data={{ id: 'about' }}>
          <div>
            <About />
          </div>
        </Step>

        <Step data={{ id: 'skills' }}>
          <div>
            <Skills />
          </div>
        </Step>

        <Step data={{ id: 'career' }}>
          <div>
            <Career />
          </div>
        </Step>

        <Step data={{ id: 'projects' }}>
          <div>
            <Projects />
          </div>
        </Step>

        <Step data={{ id: 'contacts' }}>
          <div>
            <Contacts />
          </div>
        </Step>
      </ScrollamaProvider>
    </Layout>
  );
};

export default Home;
