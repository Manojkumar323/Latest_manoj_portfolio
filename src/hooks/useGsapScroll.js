import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function useGsapScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-gsap-reveal]').forEach((element) => {
        const direction = element.dataset.gsapReveal
        const x = direction === 'left' ? -64 : direction === 'right' ? 64 : 0
        const y = direction === 'up' ? 56 : 0

        gsap.from(element, {
          autoAlpha: 0,
          x,
          y,
          duration: 0.95,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 84%',
            toggleActions: 'play none none reverse',
          },
        })
      })

      gsap.utils.toArray('[data-gsap-stagger]').forEach((group) => {
        gsap.from(group.children, {
          autoAlpha: 0,
          y: 42,
          duration: 0.78,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: group,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        })
      })

      gsap.utils.toArray('[data-gsap-parallax]').forEach((element) => {
        gsap.to(element, {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.7,
          },
        })
      })
    })

    return () => ctx.revert()
  }, [])
}

export default useGsapScroll
