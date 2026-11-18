import { freelanceProjects, freelanceWhatsappUrl, type FreelanceProject } from '../data/content';
import { ArrowUpRightIcon, WhatsAppIcon } from './Icons';
import { SectionEyebrow } from './SectionEyebrow';
import './Freelance.css';

function SiteCard({ p, featured }: { p: FreelanceProject; featured?: boolean }) {
  const url = `/work/${p.slug}/`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className={`fl-card card${featured ? ' fl-card-featured' : ''}`}
      aria-label={`Open the ${p.niche.toLowerCase()} sample: ${p.name}`}
    >
      <div className="fl-browser">
        <div className="fl-bar" aria-hidden="true">
          <span className="fl-dots">
            <i />
            <i />
            <i />
          </span>
          <span className="fl-url">/work/{p.slug}</span>
        </div>
        <div className="fl-shot">
          {/* Tall full-page capture: pans from top to bottom on hover */}
          <picture>
            <source media="(max-width: 640px)" srcSet={`/work/thumbs/${p.slug}-phone.jpg`} />
            <img src={`/work/thumbs/${p.slug}-long.jpg`} alt="" loading="lazy" decoding="async" />
          </picture>
        </div>
      </div>
      <div className="fl-body">
        <span className="fl-niche">{p.niche}</span>
        <h3 className="fl-name">{p.name}</h3>
        <p className="fl-pitch">{p.pitch}</p>
        <ul className="fl-features">
          {p.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <span className="fl-open">
          Open live site <ArrowUpRightIcon size={12} />
        </span>
      </div>
    </a>
  );
}

export function Freelance() {
  return (
    <section id="freelance" className="section freelance-section">
      <div className="container">
        <SectionEyebrow num="02" label="Freelance work" />
        <div className="fl-head">
          <h2 className="section-title">Explore freelance projects</h2>
          <p className="fl-lead">
            Five live sample websites for small businesses. Open one on your phone and tap around: ordering, booking and
            enquiries all land on WhatsApp. The businesses are fictional; the sites are real.
          </p>
        </div>

        <div className="fl-grid">
          {freelanceProjects.map((p, i) => (
            <SiteCard key={p.slug} p={p} featured={i === 0} />
          ))}
        </div>

        <div className="fl-cta card">
          <div>
            <h3>Your business could be next.</h3>
            <p>Fast on phones, WhatsApp-ready, live in about 3 days, no monthly hosting fee.</p>
          </div>
          <a href={freelanceWhatsappUrl} target="_blank" rel="noreferrer" className="fl-cta-btn">
            <WhatsAppIcon size={16} /> Get a website
          </a>
        </div>
      </div>
    </section>
  );
}
