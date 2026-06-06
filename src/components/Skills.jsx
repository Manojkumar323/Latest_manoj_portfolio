import portfolio from '../data/portfolio.json'

function Skills() {
  const { skills } = portfolio

  return (
    <section className="skills-section" id="skills">
      <div className="skills-intro" data-gsap-reveal="up">
        <p className="skills-eyebrow">{skills.eyebrow}</p>
        <h2>{skills.title}</h2>
        <p>{skills.summary}</p>
      </div>

      <div className="skills-stats" data-gsap-stagger>
        {skills.stats.map((stat) => (
          <div className="skill-stat" key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="skill-groups">
        {skills.groups.map((group) => (
          <article
            className="skill-card"
            key={group.title}
            data-gsap-reveal="up"
          >
            <div className="skill-card-head">
              <span>{group.accent}</span>
              <h3>{group.title}</h3>
            </div>

            <div className="skill-tags">
              {group.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Skills
