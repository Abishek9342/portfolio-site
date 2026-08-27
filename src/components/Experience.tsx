import { experience } from '../data/content';
import { SectionEyebrow } from './SectionEyebrow';
import './Experience.css';

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
                  <span className="job-role">
                    {job.role} · {job.mode}
                  </span>
                </div>
                <span className="job-dates">{job.dates}</span>
              </header>
              <ul className="job-bullets">
                {job.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
