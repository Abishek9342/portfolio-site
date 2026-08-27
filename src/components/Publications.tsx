import { publications } from '../data/content';
import { ArrowUpRightIcon } from './Icons';
import { SectionEyebrow } from './SectionEyebrow';
import './Publications.css';

export function Publications() {
  return (
    <section className="section publications-section">
      <div className="container">
        <SectionEyebrow num="05" label="Publications" />
        <div className="publications-grid">
          {publications.map((pub) => (
            <div className="pub-item card" key={pub.title}>
              <h4 className="pub-title">{pub.title}</h4>
              <p className="pub-detail">{pub.detail}</p>
              {pub.link && (
                <a href={pub.link} target="_blank" rel="noreferrer" className="pub-link">
                  {pub.linkLabel}
                  <ArrowUpRightIcon size={11} />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
