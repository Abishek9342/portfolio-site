import { experience } from '../data/content';
import { ArrowUpRightIcon } from './Icons';
import { SectionEyebrow } from './SectionEyebrow';
import './Experience.css';

// Renders **bold** segments from the content strings.
function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : part
      )}
    </>
  );
}

export function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionEyebrow num="01" label="Work experience" />
        <h2 className="section-title">Experience</h2>

        <div className="timeline">
          {experience.map((job) => (
            <article className="job card" key={job.company}>
              <header className="job-header">
                <div>
                  <h3 className="job-company">{job.company}</h3>
                  <span className="job-role">{job.role}</span>
                </div>
                <span className="job-dates">{job.dates}</span>
              </header>
              <div className="job-projects">
                {job.projects.map((project) => (
                  <div className="job-project" key={project.title}>
                    <div className="job-project-head">
                      <h4 className="job-project-title">
                        {project.link ? (
                          <a href={project.link} target="_blank" rel="noreferrer">
                            {project.title}
                            <ArrowUpRightIcon size={11} />
                          </a>
                        ) : (
                          project.title
                        )}
                      </h4>
                      <div className="job-project-tags">
                        {project.tags.map((tag) => (
                          <span className="job-project-tag" key={tag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="job-project-desc">
                      <RichText text={project.description} />
                    </p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
