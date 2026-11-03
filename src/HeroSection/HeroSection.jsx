import {
  useLayoutEffect,
  useRef,
} from "react"

import {
  gsap,
} from "gsap"

import Experience from "../Experience/Experience"

import "./HeroSection.css"

const HeroSection = () => {
  const heroRef = useRef(null)

  const contentRef = useRef(null)

  const buttonsRef = useRef(null)

  const content02Ref = useRef(null)

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        delay: 0.1,
      })

      timeline.from(
        contentRef.current.querySelector("h1"),
        {
          x: -90,
          opacity: 0,

          duration: 2,

          ease: "power3.out",
        },
        0
      )

      timeline.from(
        content02Ref.current.querySelector("h1"),
        {
          x: 90,
          opacity: 0,

          duration: 2,

          ease: "power3.out",
        },
        0
      )

      timeline.from(
        contentRef.current.querySelector("p"),
        {
          x: -45,
          opacity: 0,

          duration: 2,

          ease: "power3.out",
        },
        0.8
      )

      timeline.from(
        content02Ref.current.querySelector("p"),
        {
          x: 45,
          opacity: 0,

          duration: 2,

          ease: "power3.out",
        },
        0.8
      )

timeline.from(
  buttonsRef.current.querySelectorAll("button"),
  {
    opacity: 0,

    duration: 1.2,
    stagger: 0.1,

    ease: "power3.out",
  },
  0.8
);
    }, heroRef)

    return () => {
      context.revert()
    }
  }, [])

  return (
    <section
      className="hero-section"
      ref={heroRef}
    >
      <div
        className="hero-section-content"
        ref={contentRef}
      >
        <h1>
          Let's Build a Brighter
          <br />
          Greener World Together!
        </h1>

        <p>
          Discover inspiring ideas and embrace
          sustainable habits.
        </p>
      </div>

      <div
        className="hero-btn-container"
        ref={buttonsRef}
      >
        <button type="button">
          Sign In
        </button>

        <button
          type="button"
          className="hero-btn-2"
        >
          Projects
        </button>
      </div>

      <div
        className="hero-section-content-02"
        ref={content02Ref}
      >
        <h1>
          Little Actions, Big Impact
        </h1>

        <p>
          Become part of a community that cares
          for our planet and its future.
        </p>
      </div>

      <Experience />
    </section>
  )
}

export default HeroSection