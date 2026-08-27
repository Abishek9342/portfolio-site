import { featuredProject } from '../data/content';
import { ArrowUpRightIcon } from './Icons';
import { SectionEyebrow } from './SectionEyebrow';
import './FeaturedProject.css';

export function FeaturedProject() {
  const p = featuredProject;
  return (
    <section className="section featured-section">
      <div className="container">
        <SectionEyebrow num="02" label="Featured open-source project" />
        <div className="featured-card card">
          <div className="featured-main">
            <div className="featured-heading">
              <h3 className="featured-title">{p.title}</h3>
              <span className="tag-pill tag-pill-accent">In development</span>
            </div>
            <span className="featured-tagline">{p.tagline}</span>
            <p className="featured-desc">{p.description}</p>
            <ul className="featured-bullets">
              {p.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
            <div className="featured-tags">
              {p.tags.map((tag) => (
                <span className="tag-pill" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            {p.link && (
              <a className="btn btn-primary featured-link" href={p.link} target="_blank" rel="noreferrer">
                {p.linkLabel}
                <ArrowUpRightIcon size={13} />
              </a>
            )}
          </div>

          <aside className="featured-metric">
            <span className="featured-metric-label">Benchmark result</span>
            <span className="featured-metric-value tabular">{p.metric?.value}</span>
            <span className="featured-metric-caption">{p.metric?.label}</span>

            <div className="metric-compare">
              <div className="metric-row">
                <span className="metric-row-label">Ensemble (this project)</span>
                <div className="metric-bar-track">
                  <div className="metric-bar metric-bar-accent" style={{ width: '28%' }} />
                </div>
                <span className="metric-row-value tabular">0.031 CER</span>
              </div>
              <div className="metric-row">
                <span className="metric-row-label">Best single engine</span>
                <div className="metric-bar-track">
                  <div className="metric-bar metric-bar-muted" style={{ width: '100%' }} />
                </div>
                <span className="metric-row-value tabular">0.111 CER</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
