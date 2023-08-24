import React from 'react'
import { Scrollama, Step } from 'react-scrollama'

import { About, Career, Projects, Skills, Contacts, Welcome } from '../sections'
import { Layout, Navigation } from '../components'

import {
  Construction,
  Email,
  Person,
  Science,
  Work,
  KeyboardArrowUp,
} from '@mui/icons-material'

import { useNavigate } from 'react-router-dom'

const LINKS = [
  {
    href: '#',
    label: 'go to top',
    icon: <KeyboardArrowUp fontSize="large" />,
    section: <Welcome />,
  },
  {
    href: '#about',
    label: 'about',
    icon: <Person />,
    section: <About />,
  },
  // {
  //   href: '#skills',
  //   label: 'skills',
  //   icon: <Construction />,
  //   section: <Skills />,
  // },
  {
    href: '#career',
    label: 'career',
    icon: <Work />,
    section: <Career />,
  },
  {
    href: '#projects',
    label: 'projects',
    icon: <Science />,
    section: <Projects />,
  },
  {
    href: '#contacts',
    label: 'contacts',
    icon: <Email />,
    section: <Contacts />,
  },
]

const Home: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Scrollama onStepEnter={({ data }) => navigate(data.id)}>
      <Navigation title="Whanna know more about me?" links={LINKS} />
      {LINKS.map(({ href, section }) => (
        <Step key={href} data={{ id: href }}>
          <div>{section}</div>
        </Step>
      ))}
    </Scrollama>
  )
}

export default () => (
  <Layout>
    <Home />
  </Layout>
)
