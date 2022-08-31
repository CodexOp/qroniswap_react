import React from 'react'
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { Main } from '../../styled-components';
import Hero from './Hero';
import Movers from './Movers';
import Partners from './Partners';
import Features from './Features';
import Roadmap from './Roadmap';
import Stats from './Stats';
import Trending from './Trending';
import CallToAction from './CallToAction';
import TextImage from './TextImage';

const Home =()=> {
  return (
    <Main className='bg-black'>
      <Header types="transparent"/>
      <Hero />
      <Stats />
      <Movers />
      <Trending />
      <Features />
      <TextImage />
      <Roadmap />
      <Partners />
      <CallToAction />
      <Footer />
    </Main>
  )
}

export default Home;