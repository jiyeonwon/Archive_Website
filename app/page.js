import Image from "next/image";
import styles from "./page.module.css";

const folders = ["UXUI", "INTERACTION", "BRANDING", "EDITORIAL DESIGN"];

export default function Home() {
  return (
    <main className={styles.archive}>
      <header className={styles.header}>
        <p className={styles.name}>WON JIYEON</p>

        <div className={styles.profile}>
          <p>Based in Seoul, KR</p>
          <p>Hongik University</p>
          <p>Visual Communication Design</p>
        </div>

        <address className={styles.contact}>
          <p>[ Contact ]</p>
          <p>+82 10-3160-8240</p>
          <p>jiyeon.direct@gmail.com</p>
        </address>
      </header>

      <section className={styles.folderGrid} aria-label="Project folders">
        {folders.map((folder) => (
          <article className={styles.folder} key={folder}>
            <Image
              className={styles.folderIcon}
              src="/folder.png"
              alt=""
              width={736}
              height={736}
              priority
            />
            <p className={styles.folderLabel}>{folder}</p>
          </article>
        ))}
      </section>

      <p className={styles.archiveTitle}>Archive</p>
    </main>
  );
}
