import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Publications } from './components/Publications';
import { Contact } from './components/Contact';
import { Buddy } from './components/Buddy';

function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Experience />
        <Skills />
        <Publications />
        <Contact />
      </main>
      <Buddy />
    </>
  );
}

export default App;
