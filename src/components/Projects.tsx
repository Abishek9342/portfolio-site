import { projects } from '../data/content';
import { ArrowUpRightIcon } from './Icons';
import { SectionEyebrow } from './SectionEyebrow';
import './Projects.css';

export function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionEyebrow num="03" label="More projects" />
        <h2 className="section-title">Projects</h2>

        <div className="projects-grid">
          {projects.map((p) => (
            <article className="project-card card card-interactive" key={p.slug}>
              <div className="project-card-top">
                <h3 className="project-title">{p.title}</h3>
                <span className="project-tagline">{p.tagline}</span>
              </div>
              <p className="project-desc">{p.description}</p>

              {p.metric && (
                <div className="project-metric">
                  <span className="project-metric-value">{p.metric.value}</span>
                  <span className="project-metric-label">{p.metric.label}</span>
                </div>
              )}

              <div className="project-footer">
                <div className="project-tags">
                  {p.tags.map((tag) => (
                    <span className="tag-pill tag-pill-sm" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>

                {p.link && (
                  <a className="project-link" href={p.link} target="_blank" rel="noreferrer">
                    {p.linkLabel}
                    <ArrowUpRightIcon size={12} />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
