"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

const folders = ["UXUI", "INTERACTION", "BRANDING", "EDITORIAL DESIGN"];

export default function Home() {
  const [showUxui, setShowUxui] = useState(false);
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

      {!showUxui ? <section className={styles.folderGrid} aria-label="Project folders">
        {folders.map((folder) => (
          <article className={styles.folder} key={folder}>
            {folder === "UXUI" && <button type="button" className={styles.folderHitArea} aria-label="UXUI 폴더 열기" onClick={() => setShowUxui(true)} />}
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
      </section> : (
        <section className={styles.projectWindow} aria-label="Archive / UXUI">
          <div className={styles.windowBar}>
            <h1>Archive / UXUI</h1>
            <button type="button" aria-label="UXUI 폴더 닫기" onClick={() => setShowUxui(false)}>[ X ]</button>
          </div>
          <aside className={styles.sidebar}>
            <div className={styles.sidebarFolder}>
              <Image src="/folder.png" alt="" width={736} height={736} />
              <p className={styles.folderLabel}>UXUI</p>
            </div>
            <p className={styles.projectCount}>01 projects</p>
          </aside>
          <div className={styles.projectContent}>
            <h2>select a project</h2>
            <div className={styles.projectColumns} aria-hidden="true">
              <span /><span>Name</span><span>Type</span><span>Date</span><span />
            </div>
            <div className={styles.projectRow} tabIndex={0} aria-label="01 MONEAR, Team project, 2026">
              <span>01</span><span>MONEAR</span><span>Team project</span><span>2026</span><span aria-hidden="true">→</span>
            </div>
          </div>
        </section>
      )}

      <p className={styles.archiveTitle}>Archive</p>
    </main>
  );
}
