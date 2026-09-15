import styles from "./page.module.css";

const projects = ["Project 1", "Project 2", "Project 3", "Project 4"];

export default function Home() {
  return (
    <main className={styles.pageFlow}>
      <section className={styles.slide} aria-labelledby="intro-title">
        <div className={styles.introHeader}>
          <h1 id="intro-title">WON JIYEON</h1>

          <div className={styles.profileInfo}>
            <div>
              <p>Based in Seoul, KR</p>
              <p>Hongik University</p>
              <p>Visual Communication Design</p>
            </div>
            <div className={styles.contact}>
              <p>[ Contact ]</p>
              <p>+82 10-3160-8240</p>
              <p>jiyeon.direct@gmail.com</p>
            </div>
          </div>
        </div>

        <a className={styles.startButton} href="#projects">
          Click to Start !
        </a>
      </section>

      <section className={`${styles.slide} ${styles.projectSlide}`} id="projects" aria-label="프로젝트 목록">
        <nav className={styles.projectList} aria-label="프로젝트">
          {projects.map((project) => (
            <a href={`#${project.toLowerCase().replace(" ", "-")}`} key={project}>
              [ {project} ]
            </a>
          ))}
        </nav>
      </section>
    </main>
  );
}
