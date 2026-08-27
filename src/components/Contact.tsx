import { profile } from '../data/content';
import { GithubIcon, KaggleIcon, LinkedInIcon, MailIcon, WhatsAppIcon } from './Icons';
import { SectionEyebrow } from './SectionEyebrow';
import './Contact.css';

const WHATSAPP_PREFILL = "Hi Abishek, I saw your portfolio and I'd like to connect.";

function whatsappUrl(number: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(WHATSAPP_PREFILL)}`;
}

export function Contact() {
  const year = new Date().getFullYear();
  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <SectionEyebrow num="06" label="Get in touch" />
        <div className="contact-card card">
          <h2 className="contact-title">Let's talk</h2>
          <p className="contact-sub">
            Reach out directly by email, or find me on GitHub, LinkedIn, WhatsApp and Kaggle.
          </p>

          <div className="contact-social">
            <a href={`mailto:${profile.email}`} aria-label="Email">
              <MailIcon size={18} />
              <span>Email</span>
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <GithubIcon size={18} />
              <span>GitHub</span>
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <LinkedInIcon size={18} />
              <span>LinkedIn</span>
            </a>
            {profile.whatsappNumber && (
              <a href={whatsappUrl(profile.whatsappNumber)} target="_blank" rel="noreferrer" aria-label="WhatsApp">
                <WhatsAppIcon size={18} />
                <span>WhatsApp</span>
              </a>
            )}
            <a href={profile.kaggle} target="_blank" rel="noreferrer" aria-label="Kaggle">
              <KaggleIcon size={18} />
              <span>Kaggle</span>
            </a>
          </div>
        </div>

        <footer className="footer">
          <span>© {year} {profile.name}</span>
          <span>{profile.location}</span>
        </footer>
      </div>
    </section>
  );
}
