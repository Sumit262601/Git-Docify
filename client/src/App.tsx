// import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import CallToAction from './components/CallToAction';
import Roadmap from './components/Roadmap';
import Pricing from './components/Pricing';
import Community from './components/Community';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Features />
      <CallToAction />
      <Roadmap />
      <Pricing />
      <Community />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;