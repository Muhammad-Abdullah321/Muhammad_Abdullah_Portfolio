import { useEffect, useRef, useState } from "react";

const portfolioEmail = "abdullah03362@gmail.com";
const portfolioPhone = "+923287037013";
const githubUrl = "https://github.com/Muhammad-Abdullah321";
const linkedinUrl = "https://linkedin.com/in/m-abdullah-hammad-8392642ab";
const roleWords = ["Backend Developer", "Software Engineering Student"];

const sections = [
  { id: "home", number: "01", label: "Home" },
  { id: "about", number: "02", label: "About" },
  { id: "skills", number: "03", label: "Skills" },
  { id: "work", number: "04", label: "Work" },
  { id: "journey", number: "05", label: "Journey" },
  { id: "contact", number: "06", label: "Contact" },
];

const skills = [
  { name: "Node.js", className: "bubble--large" },
  { name: "JavaScript", className: "bubble--orange" },
  { name: "MongoDB", className: "bubble--small" },
  { name: "Express.js", className: "bubble--cream" },
  { name: "PostgreSQL", className: "bubble--small bubble--outline" },
  { name: "Python", className: "bubble--orange bubble--small" },
  { name: "React.js", className: "bubble--cream bubble--wide" },
];

const projects = [
  {
    number: "01",
    name: "BugNest — Bug Tracking & Management System",
    type: "BUG TRACKING",
    description:
      "Built a REST API to create, track, categorize, and manage bugs through their lifecycle. Added authentication, protected routes, validation, and structured error handling.",
    tags: ["Node.js", "Express.js", "MongoDB", "React.js"],
    theme: "project-card--coral",
    visual: "store",
  },
  {
    number: "02",
    name: "Authentication API — Secure Authentication System",
    type: "AUTHENTICATION API",
    description:
      "Created a reusable API for registration and login with password hashing, JWT authentication, and protected routes. Implemented role-based access control and validation.",
    tags: ["Node.js", "Express.js", "MongoDB", "JWT", "bcrypt"],
    theme: "project-card--lime",
    visual: "music",
  },
  {
    number: "03",
    name: "Job Management System — Full-Stack Web Application",
    type: "FULL-STACK APPLICATION",
    description:
      "A centralized job tracker for applications, follow-ups, interview progress, and history. Includes per-application resume versions, PostgreSQL/Prisma data models, and weekly/monthly analytics for applications, employer responses, ghosting, and interviews.",
    tags: ["React", "TypeScript", "Node.js", "Express.js", "PostgreSQL", "Prisma ORM"],
    theme: "project-card--blue",
    visual: "studio",
  },
];

const journey = [
  {
    year: "07/2026 — CURRENT",
    title: "Backend Developer · Revolix Technology",
    text: "Built Node.js/Express APIs for user, tenant, staff, property, complaint, and booking workflows. Implemented JWT, bcrypt, OTP, refresh-token, HTTP-only-cookie authentication and RBAC; contributed to a MongoDB-to-PostgreSQL migration; integrated Stripe; tested with Postman; and connected React.js with Axios. Separately developed and tested FastAPI/Python APIs with validation, database integration, and structured errors; used Git/GitHub.",
  },
  {
    year: "05/2026 — 06/2026",
    title: "Backend Developer Intern · Revolix Technology",
    text: "Studied an existing Node.js/Express/MongoDB codebase; tested REST APIs in Postman, documented bugs, and reported backend issues with suggested fixes. Implemented password-hash/JWT authentication and protected routes within existing RBAC, and built or modified CRUD APIs with request validation, error handling, and Git/GitHub conventions.",
  },
  {
    year: "09/2024 — EXPECTED 09/2028",
    title: "BS Software Engineering (In Progress) · Virtual University of Pakistan",
    text: "Karachi, Pakistan. Coursework: Programming, Database Management, Web Development, Software Design, Computer Networks, Operating Systems, and Software Engineering Practices.",
  },
];

function Arrow({ diagonal = false }) {
  return (
    <svg
      aria-hidden="true"
      className="arrow-icon"
      viewBox="0 0 20 20"
      fill="none"
    >
      {diagonal ? (
        <path d="M5 15 15 5M6 5h9v9" />
      ) : (
        <path d="M3.5 10h12m-5-5 5 5-5 5" />
      )}
    </svg>
  );
}

function useTypewriter(words) {
  const [text, setText] = useState(words[0]);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const word = words[wordIndex];
    let timeout;

    if (text === word) {
      timeout = window.setTimeout(() => {
        setText("");
        setWordIndex((current) => (current + 1) % words.length);
      }, 1800);
    } else {
      timeout = window.setTimeout(() => {
        setText(word.slice(0, text.length + 1));
      }, 85);
    }

    return () => window.clearTimeout(timeout);
  }, [text, wordIndex, words]);

  return text;
}

function SectionLabel({ number, children, light = false }) {
  return (
    <div className={`section-label${light ? " section-label--light" : ""}`}>
      <span>{number} / {children}</span>
      <span className="section-label-line" />
    </div>
  );
}

function ProjectArtwork({ visual }) {
  if (visual === "store") {
    return (
      <div className="project-art project-art--store" aria-hidden="true">
        <div className="store-orbit store-orbit--one" />
        <div className="store-orbit store-orbit--two" />
        <div className="store-sun" />
        <p>BUG<br />NEST<span>.</span></p>
        <div className="store-button">TRACK THE BUGS <span>↗</span></div>
      </div>
    );
  }

  if (visual === "music") {
    return (
      <div className="project-art project-art--music" aria-hidden="true">
        <div className="music-disc"><span /></div>
        <div className="music-note music-note--one">JWT</div>
        <div className="music-note music-note--two">AUTH</div>
        <div className="music-title">SECURE API<br /><i>auth flows</i></div>
        <div className="music-bars"><i /><i /><i /><i /><i /><i /><i /><i /></div>
      </div>
    );
  }

  return (
    <div className="project-art project-art--studio" aria-hidden="true">
      <div className="studio-frame">
        <span>APPLICATION TRACKER</span>
        <strong>job<br /><i>history</i></strong>
        <span>FOLLOW-UPS &amp; INTERVIEWS</span>
      </div>
      <div className="studio-spark">✳</div>
    </div>
  );
}

function ProjectCard({ project }) {
  const cardRef = useRef(null);

  function tiltCard(event) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const card = cardRef.current;
    if (!card) return;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    card.style.setProperty("--tilt-x", `${(0.5 - y) * 5}deg`);
    card.style.setProperty("--tilt-y", `${(x - 0.5) * 7}deg`);
  }

  function resetTilt() {
    cardRef.current?.style.setProperty("--tilt-x", "0deg");
    cardRef.current?.style.setProperty("--tilt-y", "0deg");
  }

  return (
    <article
      className={`project-card ${project.theme}`}
      ref={cardRef}
      onMouseMove={tiltCard}
      onMouseLeave={resetTilt}
    >
      <div className="project-card-art">
        <ProjectArtwork visual={project.visual} />
      </div>
      <div className="project-card-copy">
        <div className="project-card-meta">
          <span>{project.number} / {project.type}</span>
          <span>{project.tags.join(" · ")}</span>
        </div>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
      </div>
    </article>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const scrollContainer = useRef(null);
  const typedRole = useTypewriter(roleWords);

  useEffect(() => {
    const container = scrollContainer.current;
    if (!container) return undefined;

    function updateActiveSection() {
      const center = container.getBoundingClientRect().top + container.clientHeight / 2;
      const activePanel = Array.from(container.querySelectorAll(".panel")).find((panel) => {
        const bounds = panel.getBoundingClientRect();
        return bounds.top <= center && bounds.bottom > center;
      });
      if (activePanel) setActiveSection(activePanel.id);
    }

    container.addEventListener("scroll", updateActiveSection, { passive: true });
    updateActiveSection();
    return () => container.removeEventListener("scroll", updateActiveSection);
  }, []);

  function goToSection(event, id) {
    event.preventDefault();
    scrollContainer.current
      ?.querySelector(`#${id}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  }

  function submitContact(event) {
    event.preventDefault();
    const subject = `Portfolio hello from ${form.name}`;
    const body = `${form.message}\n\nFrom: ${form.name}\nReply to: ${form.email}`;
    window.location.href = `mailto:${portfolioEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  function updateForm(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  return (
    <div className="portfolio">
      <header className={`topbar${["about", "work", "contact"].includes(activeSection) ? " topbar--light" : ""}`}>
        <a className="wordmark" href="#home" onClick={(event) => goToSection(event, "home")}>
          <span className="wordmark-symbol">a<span>.</span></span>
          <span>ABDULLAH</span>
        </a>
        <button
          className={`menu-toggle${menuOpen ? " menu-toggle--open" : ""}`}
          type="button"
          aria-label={menuOpen ? "Close section menu" : "Open section menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
        <nav className={`top-links${menuOpen ? " top-links--open" : ""}`} aria-label="Main navigation">
          {["about", "work", "contact"].map((id) => (
            <a
              key={id}
              className={activeSection === id ? "top-link--active" : ""}
              href={`#${id}`}
              onClick={(event) => goToSection(event, id)}
            >
              {id === "work" ? "Projects" : id}
            </a>
          ))}
          <a
            className="top-contact"
            href={`mailto:${portfolioEmail}`}
          >
            Let’s talk <Arrow diagonal />
          </a>
        </nav>
      </header>

      <nav className={`side-nav${["about", "work", "contact"].includes(activeSection) ? " side-nav--light" : ""}`} aria-label="Portfolio sections">
        {sections.map((section) => (
          <a
            key={section.id}
            className={`side-nav-link${activeSection === section.id ? " side-nav-link--active" : ""}`}
            href={`#${section.id}`}
            aria-label={`${section.number} ${section.label}`}
            aria-current={activeSection === section.id ? "location" : undefined}
            onClick={(event) => goToSection(event, section.id)}
          >
            <span className="side-nav-number">{section.number}</span>
            <span className="side-nav-dot" />
          </a>
        ))}
      </nav>

      <main className="panel-scroller" ref={scrollContainer}>
        <section className="panel panel-home" id="home">
          <div className="panel-inner hero-layout">
            <div className="hero-copy">
              <div className="eyebrow eyebrow--light">
                BACKEND DEVELOPER · KARACHI, PAKISTAN
              </div>
              <p className="hero-kicker">HEY, I’M MUHAMMAD ABDULLAH HAMMAD —</p>
              <h1>
                I make<br />
                the web feel<br />
                <span className="hero-highlight">more human.</span>
              </h1>
              <p className="hero-role">
                <span className="role-prefix">I’m a </span>
                <span className="role-value">{typedRole}</span>
                <span className="type-cursor" aria-hidden="true" />
              </p>
              <p className="hero-description">
                I build backend APIs and full-stack applications, with a focus
                on authentication, data design, and useful integrations.
              </p>
              <div className="hero-actions">
                <a className="button button--accent" href="#work" onClick={(event) => goToSection(event, "work")}>
                  See what I make <Arrow />
                </a>
                <a className="hero-secondary" href="#about" onClick={(event) => goToSection(event, "about")}>
                  A little about me <span>↓</span>
                </a>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-visual-grid" />
              <div className="hero-sticker hero-sticker--top">DESIGN<br />WITH INTENTION</div>
              <div className="portrait-shape">
                <div className="portrait-halo" />
                <div className="portrait-head"><span /></div>
                <div className="portrait-body" />
                <div className="portrait-orbit" />
              </div>
              <div className="hero-sticker hero-sticker--bottom">
                <span>GOOD IDEAS<br />GROW HERE</span>
                <span className="sticker-star">✳</span>
              </div>
              <div className="hero-vertical-note">REST API DEVELOPMENT · DATABASE DESIGN</div>
            </div>
            <div className="hero-bottom">
              <span>BASED IN KARACHI, PAKISTAN</span>
              <span>SCROLL TO EXPLORE ↓</span>
            </div>
          </div>
          <span className="panel-index">01 <i>/</i> 06</span>
        </section>

        <section className="panel panel-about" id="about">
          <div className="panel-inner about-layout">
            <SectionLabel number="01">A LITTLE ABOUT ME</SectionLabel>
            <div className="about-main">
              <div className="about-title">
                <p className="small-overline">BACKEND DEVELOPER &amp; SOFTWARE ENGINEERING STUDENT</p>
                <h2>
                  Good work<br />
                  starts with<br />
                  <span>good questions.</span>
                </h2>
              </div>
              <div className="about-story">
                <span className="story-quote">“</span>
                <p>
                  I’m Muhammad Abdullah Hammad, a Backend Developer and
                  Software Engineering student based in Karachi, Pakistan.
                </p>
                <p>
                  I build REST APIs using Node.js, Express.js, and FastAPI,
                  working across authentication, role-based access control,
                  database design, and integrations. I have contributed to a
                  MongoDB-to-PostgreSQL migration and integrated backend
                  services with React front ends and Stripe.
                </p>
                <p>
                  Urdu is my native language. I have professional working
                  proficiency in English: B2 reading, listening, and writing,
                  and B1 spoken.
                </p>
                <a className="inline-link" href={`mailto:${portfolioEmail}`}>
                  CONTACT ME <Arrow />
                </a>
              </div>
            </div>
            <div className="about-facts">
              <div><span>01</span><strong>Karachi,<br />Pakistan</strong></div>
              <div><span>02</span><strong>Urdu<br />Native</strong></div>
              <div><span>03</span><strong>English<br />B2 written · B1 spoken</strong></div>
            </div>
          </div>
          <span className="panel-index">02 <i>/</i> 06</span>
        </section>

        <section className="panel panel-skills" id="skills">
          <div className="panel-inner skills-layout">
            <SectionLabel number="02" light>THINGS I LIKE TO WORK WITH</SectionLabel>
            <div className="skills-heading">
              <div>
                <p className="small-overline small-overline--light">MY TOOLKIT, ALWAYS GROWING</p>
                <h2>Good tools.<br /><span>Better ideas.</span></h2>
              </div>
              <p className="skills-intro">
                Languages: JavaScript, Python, TypeScript. Backend: Node.js,
                Express.js, FastAPI, REST API development. Databases: MongoDB,
                PostgreSQL, MySQL. Authentication &amp; API: JWT, bcrypt, RBAC,
                OTP verification, sessions, Stripe API, Postman. Tools: Git,
                GitHub, GitLab, Docker. Frontend: React.js, Axios, HTML, CSS,
                Tailwind CSS.
              </p>
            </div>
            <div className="skill-field" aria-label="Skills and technologies">
              {skills.map((skill, index) => (
                <span
                  key={skill.name}
                  className={`skill-bubble ${skill.className}`}
                  style={{ "--bubble-index": index }}
                >
                  {skill.name}
                </span>
              ))}
              <span className="skill-caption skill-caption--one">THOUGHTFUL<br />FRONTENDS</span>
              <span className="skill-caption skill-caption--two">BUILT TO<br />WORK EVERYWHERE</span>
              <span className="skill-orbit skill-orbit--one" />
              <span className="skill-orbit skill-orbit--two" />
            </div>
            <div className="skills-footer">
              <span>DESIGN · DEVELOP · REFINE</span>
              <span>AND THERE’S ALWAYS MORE TO LEARN <span className="footer-star">✳</span></span>
            </div>
          </div>
          <span className="panel-index">03 <i>/</i> 06</span>
        </section>

        <section className="panel panel-work" id="work">
          <div className="panel-inner work-layout">
            <SectionLabel number="03">A FEW THINGS I’VE MADE</SectionLabel>
            <div className="work-heading">
              <h2>Made with care.<br /><span>Built to be useful.</span></h2>
              <p>Projects from my experience building backend APIs and full-stack applications.</p>
            </div>
            <div className="project-grid">
              {projects.map((project) => <ProjectCard key={project.number} project={project} />)}
            </div>
            <p className="work-note">PROJECT DETAILS SUMMARIZED FROM MY RESUME.</p>
          </div>
          <span className="panel-index">04 <i>/</i> 06</span>
        </section>

        <section className="panel panel-journey" id="journey">
          <div className="panel-inner journey-layout">
            <SectionLabel number="04" light>EXPERIENCE &amp; EDUCATION</SectionLabel>
            <div className="journey-heading">
              <p className="small-overline small-overline--light">BACKEND DEVELOPMENT &amp; SOFTWARE ENGINEERING</p>
              <h2>Building my practice.<br /><span>Studying software.</span></h2>
              <p className="journey-intro">
                Backend experience at Revolix Technology alongside my ongoing
                Software Engineering degree.
              </p>
            </div>
            <div className="timeline">
              {journey.map((step, index) => (
                <article className="timeline-item" key={step.year}>
                  <div className="timeline-marker">
                    <span>0{index + 1}</span>
                    <i />
                  </div>
                  <div className="timeline-copy">
                    <span>{step.year}</span>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="journey-note">
              <span className="journey-note-star">✳</span>
              <span>VIRTUAL UNIVERSITY OF PAKISTAN · EXPECTED GRADUATION SEPTEMBER 2028</span>
            </div>
          </div>
          <span className="panel-index">05 <i>/</i> 06</span>
        </section>

        <section className="panel panel-contact" id="contact">
          <div className="panel-inner contact-layout">
            <SectionLabel number="05">YOUR TURN</SectionLabel>
            <div className="contact-content">
              <div className="contact-copy">
                <p className="small-overline">SOMETHING GOOD STARTS WITH A HELLO</p>
                <h2>Have an idea?<br /><span>Let’s talk.</span></h2>
                <p className="contact-description">
                  Based in Karachi, Pakistan. Contact me by email or phone, or
                  find me on GitHub and LinkedIn.
                </p>
                <div className="contact-links">
                  <a className="contact-email" href={`mailto:${portfolioEmail}`}>
                    {portfolioEmail} <Arrow diagonal />
                  </a>
                  <a className="contact-email" href={`tel:${portfolioPhone}`}>
                    +92 328 7037013 <Arrow diagonal />
                  </a>
                </div>
                <div className="social-links">
                  <a href={githubUrl} target="_blank" rel="noreferrer">GITHUB <Arrow diagonal /></a>
                  <a href={linkedinUrl} target="_blank" rel="noreferrer">LINKEDIN <Arrow diagonal /></a>
                </div>
              </div>
              <form className="contact-form" onSubmit={submitContact}>
                <label>
                  YOUR NAME
                  <input
                    name="name"
                    autoComplete="name"
                    placeholder="What should I call you?"
                    value={form.name}
                    onChange={updateForm}
                    required
                  />
                </label>
                <label>
                  YOUR EMAIL
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Where can I reply?"
                    value={form.email}
                    onChange={updateForm}
                    required
                  />
                </label>
                <label>
                  YOUR MESSAGE
                  <textarea
                    name="message"
                    placeholder="Tell me a little about it..."
                    rows="3"
                    value={form.message}
                    onChange={updateForm}
                    required
                  />
                </label>
                <button className="button button--accent form-submit" type="submit">
                  Open your email app <Arrow diagonal />
                </button>
                <p className="form-note">NO BACKEND NEEDED — THIS OPENS A PRE-FILLED EMAIL.</p>
              </form>
            </div>
            <footer className="contact-footer">
              <a className="wordmark wordmark--footer" href="#home" onClick={(event) => goToSection(event, "home")}>
                <span className="wordmark-symbol">a<span>.</span></span>
                <span>ABDULLAH</span>
              </a>
              <span>DESIGNED & BUILT WITH CARE</span>
              <span>© {new Date().getFullYear()} MUHAMMAD ABDULLAH HAMMAD</span>
              <a href="#home" onClick={(event) => goToSection(event, "home")}>BACK TO TOP ↑</a>
            </footer>
          </div>
          <span className="panel-index">06 <i>/</i> 06</span>
        </section>
      </main>
    </div>
  );
}

export default App;
