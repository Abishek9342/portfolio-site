import { skillGroups } from '../data/content';
import { techIcons } from '../data/techIcons';
import { SectionEyebrow } from './SectionEyebrow';
import './Skills.css';

function SkillTile({ label }: { label: string }) {
  const icon = techIcons[label];

  return (
    <div className="skill-tile">
      <span className="skill-tile-icon" style={icon ? { background: `#${icon.hex}` } : undefined}>
        {icon ? (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="#fff">
            <path d={icon.path} />
          </svg>
        ) : (
          <span className="skill-tile-fallback">{label.slice(0, 2).toUpperCase()}</span>
        )}
      </span>
      <span className="skill-tile-label">{label}</span>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionEyebrow num="04" label="Technical skills" />
        <h2 className="section-title">Skills</h2>

        <div className="skills-panel card">
          {skillGroups.map((group) => (
            <div className="skills-group" key={group.label}>
              <h3 className="skills-group-title">{group.label}</h3>
              <div className="skills-tiles">
                {group.items.map((item) => (
                  <SkillTile label={item} key={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
