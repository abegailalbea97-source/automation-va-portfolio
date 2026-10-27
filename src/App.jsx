import { useCallback, useEffect, useState } from 'react';
import MatrixBackground from './components/MatrixBackground';
import LogoCursor from './components/LogoCursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import { About, Skills, Certificates, Projects, Services, Experience } from './components/Sections';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import DemoModal from './components/DemoModal';
import RobotGuide from './components/RobotGuide';
import { track } from './lib/track';

export default function App() {
  const [demo, setDemo] = useState(null);

  useEffect(() => {
    track('page_view');
  }, []);

  const openDemo = useCallback((id) => {
    setDemo(id);
    track('demo_open', `demo_${id}`);
  }, []);
  const closeDemo = useCallback(() => setDemo(null), []);

  return (
    <>
      <MatrixBackground paused={demo !== null} />
      <div className="bg-glow" aria-hidden="true" />
      <LogoCursor />
      <Nav />
      <main inert={demo !== null ? '' : undefined}>
        <Hero />
        <About />
        <Skills />
        <Certificates />
        <Projects onDemo={openDemo} />
        <Services />
        <Testimonials />
        <Experience />
        <Contact />
      </main>
      <footer className="footer">
        <p>GAIL.SYS // AUTOMATION VA PORTFOLIO</p>
        <p>© {new Date().getFullYear()} Abegail Albea · Built for a smarter digital future.</p>
      </footer>
      <RobotGuide hidden={demo !== null} />
      <DemoModal id={demo} onClose={closeDemo} />
    </>
  );
}
