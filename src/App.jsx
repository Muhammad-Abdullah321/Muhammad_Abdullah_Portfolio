import { useEffect, useRef, useState } from "react";

const portfolioEmail = "abdullah03362@gmail.com";
const roleWords = ["Backend Developer", "Problem Solver", "lifelong learner"];

const sections = [
  { id: "home", number: "01", label: "Home" },
  { id: "about", number: "02", label: "About" },
  { id: "skills", number: "03", label: "Skills" },
  { id: "work", number: "04", label: "Work" },
  { id: "journey", number: "05", label: "Journey" },
  { id: "contact", number: "06", label: "Contact" },
];

const skills = [
  { name: "React", className: "bubble--large" },
  { name: "JavaScript", className: "bubble--orange" },
  { name: "CSS", className: "bubble--small" },
  { name: "UI / UX", className: "bubble--cream" },
  { name: "HTML", className: "bubble--small bubble--outline" },
  { name: "Git", className: "bubble--orange bubble--small" },
  { name: "Responsive", className: "bubble--cream bubble--wide" },
];

const projects = [
  {
    number: "01",
    name: "Your project name",
    type: "WEB DESIGN · DEVELOPMENT",
    description:
      "A short introduction to your project: what you made, who it helps, and what makes it special.",
    tags: ["React", "Design"],
    theme: "project-card--coral",
    visual: "store",
    url: "https://github.com/",
  },
  {
    number: "02",
    name: "Another good idea",
    type: "PRODUCT · FRONTEND",
    description:
      "Tell the story behind a project and the thoughtful details you brought to the experience.",
    tags: ["JavaScript", "UI"],
    theme: "project-card--lime",
    visual: "music",
    url: "https://github.com/",
  },
  {
    number: "03",
    name: "A little experiment",
    type: "CREATIVE DEVELOPMENT",
    description:
      "Show another piece of work, a side project, or something you built just to learn.",
    tags: ["Creative code", "Web"],
    theme: "project-card--blue",
    visual: "studio",
    url: "https://github.com/",
  },
];

const journey = [
  {
    year: "NOW",
    title: "Making things for the web",
    text: "Building useful, good-looking digital experiences and always finding something new to learn.",
  },
  {
    year: "RECENTLY",
    title: "Learning by doing",
    text: "Growing my skills by turning ideas into real projects, one small detail at a time.",
  },
  {
    year: "ALWAYS",
    title: "Curious about what’s next",
    text: "Exploring the overlap between thoughtful design, friendly technology, and everyday life.",
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
        <p>good<br />things<span>.</span></p>
        <div className="store-button">EXPLORE THE SHOP <span>↗</span></div>
      </div>
    );
  }

  if (visual === "music") {
    return (
      <div className="project-art project-art--music" aria-hidden="true">
        <div className="music-disc"><span /></div>
        <div className="music-note music-note--one">♪</div>
        <div className="music-note music-note--two">♫</div>
        <div className="music-title">SIDE A<br /><i>good days</i></div>
        <div className="music-bars"><i /><i /><i /><i /><i /><i /><i /><i /></div>
      </div>
    );
  }

  return (
    <div className="project-art project-art--studio" aria-hidden="true">
      <div className="studio-frame">
        <span>AN EXERCISE IN</span>
        <strong>making<br /><i>space</i></strong>
        <span>FOR GOOD IDEAS</span>
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
    <a
      className={`project-card ${project.theme}`}
      href={project.url}
      target="_blank"
      rel="noreferrer"
      ref={cardRef}
      onMouseMove={tiltCard}
      onMouseLeave={resetTilt}
      onBlur={resetTilt}
      aria-label={`Open ${project.name} (replace this link with your project)`}
    >
      <div className="project-card-art">
        <ProjectArtwork visual={project.visual} />
        <span className="project-card-open"><Arrow diagonal /></span>
      </div>
      <div className="project-card-copy">
        <div className="project-card-meta">
          <span>{project.number} / {project.type}</span>
          <span>{project.tags.join(" · ")}</span>
        </div>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
      </div>
    </a>
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

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];
        if (visibleSection) setActiveSection(visibleSection.target.id);
      },
      { root: container, threshold: [0.45, 0.65, 0.85] },
    );

    container.querySelectorAll(".panel").forEach((panel) => observer.observe(panel));
    return () => observer.disconnect();
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
                <span className="availability-dot" />
                AVAILABLE FOR OPPORTUNITIES
              </div>
              <p className="hero-kicker">HEY, I’M ABDULLAH —</p>
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
                I turn thoughtful ideas into friendly digital experiences —
                one detail, one interaction, one line of code at a time.
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
              <div className="hero-vertical-note">INDEPENDENT THINKER · INTENTIONAL BUILDER</div>
            </div>
            <div className="hero-bottom">
              <span>BASED ON EARTH · AVAILABLE WORLDWIDE</span>
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
                <p className="small-overline">A DEVELOPER WITH A SOFT SPOT FOR DETAILS</p>
                <h2>
                  Good work<br />
                  starts with<br />
                  <span>good questions.</span>
                </h2>
              </div>
              <div className="about-story">
                <span className="story-quote">“</span>
                <p>
                  I believe the best digital experiences don’t ask for
                  attention — they earn it by feeling just right.
                </p>
                <p>
                  I’m Abdullah, a web developer who enjoys making complex
                  things feel simple. I care about the people on the other side
                  of the screen and the little details that make a product
                  welcoming, useful, and memorable.
                </p>
                <p>
                  I’m always learning, always experimenting, and always up for
                  a good conversation about making the internet a little
                  better.
                </p>
                <a className="inline-link" href={`mailto:${portfolioEmail}`}>
                  LET’S MAKE SOMETHING GOOD <Arrow />
                </a>
              </div>
            </div>
            <div className="about-facts">
              <div><span>01</span><strong>Thoughtful<br />by design</strong></div>
              <div><span>02</span><strong>Curious<br />by nature</strong></div>
              <div><span>03</span><strong>Always<br />learning</strong></div>
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
                A mix of skills I use to bring ideas from a first sketch to
                something you can click, use, and love.
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
              <p>A small selection of projects, experiments, and ideas made real.</p>
            </div>
            <div className="project-grid">
              {projects.map((project) => <ProjectCard key={project.number} project={project} />)}
            </div>
            <p className="work-note">STARTER PROJECTS — ADD YOUR OWN WORK, LINKS, AND STORIES HERE.</p>
          </div>
          <span className="panel-index">04 <i>/</i> 06</span>
        </section>

        <section className="panel panel-journey" id="journey">
          <div className="panel-inner journey-layout">
            <SectionLabel number="04" light>THE JOURNEY SO FAR</SectionLabel>
            <div className="journey-heading">
              <p className="small-overline small-overline--light">NOT A STRAIGHT LINE. A GOOD ONE.</p>
              <h2>Still figuring it out.<br /><span>And loving that.</span></h2>
              <p className="journey-intro">
                Every project teaches me something. Here’s the part of the
                story I’m writing right now.
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
              <span>THE NEXT CHAPTER IS ALWAYS THE INTERESTING PART.</span>
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
                  Have a project in mind, a question, or just want to say hi?
                  My inbox is open.
                </p>
                <a className="contact-email" href={`mailto:${portfolioEmail}`}>
                  {portfolioEmail} <Arrow diagonal />
                </a>
                <div className="social-links">
                  <a href="https://github.com/" target="_blank" rel="noreferrer">GITHUB <Arrow diagonal /></a>
                  <a href="https://linkedin.com/" target="_blank" rel="noreferrer">LINKEDIN <Arrow diagonal /></a>
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
              <span>© {new Date().getFullYear()} ABDULLAH</span>
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
