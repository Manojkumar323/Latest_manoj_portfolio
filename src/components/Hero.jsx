import { useEffect, useState } from 'react'
import portfolio from '../data/portfolio.json'

const { brand, hero, nav, social } = portfolio
const roles = hero.roles
const socialIcons = {
  gh: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.2-3.37-1.2a2.65 2.65 0 0 0-1.11-1.46c-.91-.62.07-.61.07-.61a2.1 2.1 0 0 1 1.53 1.03 2.13 2.13 0 0 0 2.91.83 2.14 2.14 0 0 1 .63-1.34c-2.22-.25-4.56-1.11-4.56-4.94a3.86 3.86 0 0 1 1.03-2.68 3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.48 9.48 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64a3.86 3.86 0 0 1 1.03 2.68c0 3.84-2.34 4.69-4.57 4.93a2.4 2.4 0 0 1 .68 1.86v2.76c0 .26.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  ),
  in: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M6.94 8.98H3.78V20h3.16V8.98ZM5.36 4a1.83 1.83 0 1 0 0 3.66 1.83 1.83 0 0 0 0-3.66Zm15.18 9.68c0-3.2-1.7-4.98-4.27-4.98a3.68 3.68 0 0 0-3.31 1.82V8.98H9.93V20h3.15v-5.45c0-1.44.27-2.83 2.05-2.83 1.76 0 1.79 1.64 1.79 2.92V20h3.16l.46-6.32Z" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm8 7.58L20 8V7.7l-8 4.58L4 7.7V8l8 4.58Zm-8-2.27V17h16v-6.69l-8 4.58-8-4.58Z" />
    </svg>
  ),
}

const socialLabels = {
  gh: 'GitHub',
  in: 'LinkedIn',
  mail: 'Email',
}

function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [typedText, setTypedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const getScrollTop = () =>
      window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0

    const handleScroll = () => setIsScrolled(getScrollTop() > 0)
    const handleWheel = (event) => {
      if (event.deltaY > 0) setIsScrolled(true)
      if (event.deltaY < 0 && getScrollTop() <= 0) setIsScrolled(false)
    }
    const handleTouchMove = () => setIsScrolled(true)

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    document.addEventListener('scroll', handleScroll, true)
    window.addEventListener('wheel', handleWheel)
    window.addEventListener('touchmove', handleTouchMove)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('scroll', handleScroll, true)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  useEffect(() => {
    const currentRole = roles[roleIndex]
    const typingSpeed = isDeleting ? 55 : 95
    const pauseTime = typedText === currentRole ? 1200 : typingSpeed

    const timer = setTimeout(() => {
      if (!isDeleting && typedText === currentRole) {
        setIsDeleting(true)
        return
      }

      if (isDeleting && typedText === '') {
        setIsDeleting(false)
        setRoleIndex((current) => (current + 1) % roles.length)
        return
      }

      setTypedText((current) =>
        isDeleting
          ? currentRole.slice(0, current.length - 1)
          : currentRole.slice(0, current.length + 1),
      )
    }, pauseTime)

    return () => clearTimeout(timer)
  }, [isDeleting, roleIndex, typedText])

  return (
    <main className="hero-page">
      <header
        className={`header ${isScrolled || isMenuOpen ? 'scrolled' : ''}`}
        data-gsap-reveal="up"
      >
        <a className="logo" href="/">
          <span>{brand.mark}</span> {brand.name}
        </a>

        <button
          className={`menu-btn ${isMenuOpen ? 'active' : ''}`}
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={isMenuOpen ? 'open' : ''}>
          {nav.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </nav>

        <a className="cv-btn" href={hero.cv.href} download>
          {hero.cv.label}
        </a>
      </header>

      <section className="hero">
        <div className="shape circle"></div>
        <div className="shape polygon"></div>

        <div className="hero-text">
          <p data-gsap-reveal="left">{hero.eyebrow}</p>
          <h1 data-gsap-reveal="left">
            {hero.firstName}
            <span>{hero.lastName}</span>
          </h1>
          <h2 data-gsap-reveal="left">
            {hero.prefix}
            <strong className="typed-role">{typedText}</strong>
            <span></span>
          </h2>
          <a
            className="hello-btn"
            href={hero.cta.href}
            data-gsap-reveal="up"
          >
            {hero.cta.label}
          </a>
        </div>

        <div className="hero-image" data-gsap-reveal="right" data-gsap-parallax>
          <img src="/hero image.png" alt={hero.imageAlt} />
        </div>

        <div className="social">
          {social.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={item.href.startsWith('mailto:') ? undefined : 'noreferrer'}
              aria-label={socialLabels[item.label] || item.label}
              title={socialLabels[item.label] || item.label}
            >
              {socialIcons[item.label] || item.label}
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Hero
