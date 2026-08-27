import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { FeaturedProject } from './components/FeaturedProject';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Publications } from './components/Publications';
import { Contact } from './components/Contact';

function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Experience />
        <FeaturedProject />
        <Projects />
        <Skills />
        <Publications />
        <Contact />
      </main>
    </>
  );
}

export default App;
