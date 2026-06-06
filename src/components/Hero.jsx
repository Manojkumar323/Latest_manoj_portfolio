import { useEffect, useState } from 'react'
import portfolio from '../data/portfolio.json'

const { brand, hero, nav, social } = portfolio
const roles = hero.roles

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
            <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
              {item.label}
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Hero
