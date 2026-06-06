import portfolio from '../data/portfolio.json'

function About() {
  const { about } = portfolio

  return (
    <section className="about-section" id="about">
      <div className="about-art" data-gsap-reveal="left" data-gsap-parallax>
        <div className="dot-pattern"></div>
        <div className="frame-line"></div>
        <div className="about-photo">
          <img src="/about.webp" alt="" />
        </div>
      </div>

      <div className="about-content" data-gsap-reveal="right">
        <p className="about-eyebrow" data-gsap-reveal="up">
          {about.eyebrow}
        </p>
        <h2 data-gsap-reveal="up">
          {about.title}
        </h2>

        {about.paragraphs.map((paragraph) => (
          <p
            className="about-copy"
            key={paragraph}
            data-gsap-reveal="up"
          >
            {paragraph}
          </p>
        ))}

        <div className="about-details" data-gsap-stagger>
          {about.details.map((item) => (
            <div className="detail-row" key={item.label}>
              <strong>{item.label}</strong>
              <span>{item.value}</span>
            </div>
          ))}
        </div>

        <div className="signature-row" data-gsap-reveal="up">
          <span>{about.signature}</span>
          <p>{about.designation}</p>
        </div>
      </div>
    </section>
  )
}

export default About
