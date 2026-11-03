import {
  useState,
} from "react"

import "./Navbar.css"

const Navbar = () => {
  const [
    isMenuOpen,
    setIsMenuOpen,
  ] = useState(false)

  const navigationLinks = [
    {
      name: "Home",
      href: "#home",
    },
    {
      name: "About",
      href: "#about",
    },
    {
      name: "Projects",
      href: "#projects",
    },
    {
      name: "3D Models",
      href: "#models",
    },
  ]

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="navbar">
      <nav className="navbar-inner">
        <a
          href="#home"
          className="navbar-logo"
          aria-label="Home"
        >
          EcoWorld
        </a>

        <div className="navbar-desktop-links">
          {navigationLinks.map(
            (link, index) => (
              <a
                key={link.name}
                href={link.href}
                className={`
                  navbar-link
                  ${
                    index === 0
                      ? "navbar-link-active"
                      : ""
                  }
                `}
              >
                {link.name}
              </a>
            )
          )}
        </div>

        <a
          href="#contact"
          className="navbar-contact-button"
        >
          Contact
        </a>

        <button
          type="button"
          className={`
            navbar-hamburger
            ${
              isMenuOpen
                ? "navbar-hamburger-open"
                : ""
            }
          `}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          onClick={() => {
            setIsMenuOpen(
              !isMenuOpen
            )
          }}
        >
          <span />
          <span />
          <span />
        </button>

        <div
          className={`
            navbar-mobile-menu
            ${
              isMenuOpen
                ? "navbar-mobile-menu-open"
                : ""
            }
          `}
        >
          {navigationLinks.map(
            (link, index) => (
              <a
                key={link.name}
                href={link.href}
                className={`
                  navbar-mobile-link
                  ${
                    index === 0
                      ? "navbar-mobile-link-active"
                      : ""
                  }
                `}
                onClick={closeMenu}
              >
                {link.name}
              </a>
            )
          )}

          <a
            href="#contact"
            className="navbar-mobile-contact"
            onClick={closeMenu}
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  )
}

export default Navbar