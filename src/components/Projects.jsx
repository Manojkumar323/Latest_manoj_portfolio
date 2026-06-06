import portfolio from '../data/portfolio.json'

function Projects() {
  const { projects } = portfolio

  return (
    <section className="projects-section" id="works">
      <div className="projects-heading" data-gsap-reveal="up">
        <div className="projects-kicker">
          <span>{projects.eyebrow}</span>
        </div>
        <h2>{projects.title}</h2>
        <div className="projects-summary">
          <strong>{String(projects.items.length).padStart(2, '0')}</strong>
          <p>{projects.summary}</p>
        </div>
      </div>

      <div className="projects-grid">
        {projects.items.map((project, index) => (
          <article
            className={`project-card ${project.featured ? 'featured-project' : ''}`}
            key={project.name}
            data-gsap-reveal="up"
          >
            <div className="project-index">{String(index + 1).padStart(2, '0')}</div>
            <div className="project-body">
              <div>
                <span className="project-type">{project.type}</span>
                <h3>{project.name}</h3>
              </div>

              <p>{project.description}</p>

              <div className="project-stack">
                {project.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>

            <div className="project-highlight">{project.highlight}</div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Projects
