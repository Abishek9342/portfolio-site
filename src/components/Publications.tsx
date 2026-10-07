import { datasets, publications, profile, type Publication } from '../data/content';
import { ArrowUpRightIcon } from './Icons';
import { SectionEyebrow } from './SectionEyebrow';
import './Publications.css';

function PubCard({ pub }: { pub: Publication }) {
  return (
    <div className="pub-item card">
      <h4 className="pub-title">{pub.title}</h4>
      <p className="pub-detail">{pub.detail}</p>
      {pub.link && (
        <a href={pub.link} target="_blank" rel="noreferrer" className="pub-link">
          {pub.linkLabel}
          <ArrowUpRightIcon size={11} />
        </a>
      )}
    </div>
  );
}

export function Publications() {
  return (
    <section id="publications" className="section publications-section">
      <div className="container">
        <SectionEyebrow num="03" label="Publications & open source" />
        <h2 className="section-title">Publications</h2>

        <div className="publications-grid publications-grid-2">
          {publications.map((pub) => (
            <PubCard pub={pub} key={pub.title} />
          ))}
        </div>

        <div className="pub-subhead">
          <h3>Kaggle datasets</h3>
          <a href={profile.kaggle} target="_blank" rel="noreferrer">
            4 datasets · 500+ downloads
            <ArrowUpRightIcon size={11} />
          </a>
        </div>
        <div className="publications-grid">
          {datasets.map((pub) => (
            <PubCard pub={pub} key={pub.title} />
          ))}
        </div>
      </div>
    </section>
  );
}
