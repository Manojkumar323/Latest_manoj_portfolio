import portfolio from '../data/portfolio.json'

function Contact() {
  const { contact } = portfolio
  const formEndpoint = `https://formsubmit.co/${contact.email}`

  return (
    <section className="contact-section" id="contact">
      <div className="contact-copy" data-gsap-reveal="left">
        <p className="contact-eyebrow">{contact.eyebrow}</p>
        <h2>{contact.title}</h2>
        <p>{contact.summary}</p>

        <div className="contact-details" data-gsap-stagger>
          <a href={`mailto:${contact.email}`}>
            <span>Email</span>
            {contact.email}
          </a>
          <a href={`tel:${contact.phone.replaceAll(' ', '')}`}>
            <span>Phone</span>
            {contact.phone}
          </a>
          <div>
            <span>Location</span>
            {contact.location}
          </div>
          <div>
            <span>Status</span>
            {contact.availability}
          </div>
        </div>

        <div className="contact-links">
          {contact.links.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <form
        className="contact-form"
        action={formEndpoint}
        method="POST"
        data-gsap-reveal="right"
      >
        <input type="hidden" name="_subject" value="New portfolio contact message" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="text" name="_honey" tabIndex="-1" autoComplete="off" aria-hidden="true" />
        <label>
          Name
          <input type="text" name="name" placeholder="Your name" required />
        </label>
        <label>
          Email
          <input type="email" name="email" placeholder="your@email.com" required />
        </label>
        <label>
          Message
          <textarea name="message" placeholder="Tell me about your project or role" rows="6" required></textarea>
        </label>
        <button type="submit">Send Message</button>
      </form>
    </section>
  )
}

export default Contact
