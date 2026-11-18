import { useEffect } from 'react';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Freelance } from './components/Freelance';
import { Skills } from './components/Skills';
import { Publications } from './components/Publications';
import { Contact } from './components/Contact';
import { Buddy } from './components/Buddy';

function App() {
  // Links like /#freelance (from the sample sites) arrive before React has rendered the
  // section, so the browser can't jump there itself. Scroll once the page is painted.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const t = window.setTimeout(() => document.getElementById(id)?.scrollIntoView(), 120);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Experience />
        <Freelance />
        <Skills />
        <Publications />
        <Contact />
      </main>
      <Buddy />
    </>
  );
}

export default App;
