"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

const folders = ["UXUI", "INTERACTION", "BRANDING", "EDITORIAL DESIGN"];

export default function Home() {
  const [showUxui, setShowUxui] = useState(false);
  const [showMonear, setShowMonear] = useState(false);
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
      </section> : showMonear ? (
        <section className={styles.detailWindow} aria-label="MONEAR 상세 작업">
          <div className={styles.windowBar}>
            <p>Archive / UXUI</p>
            <button type="button" aria-label="MONEAR 상세 작업 닫기" onClick={() => setShowMonear(false)}>[ X ]</button>
          </div>
          <div className={styles.detailLayout}>
          <aside className={styles.detailDescription}>
            <div className={styles.detailSummary}>
            <h1>MONEAR</h1>
            <p className={styles.detailSubtitle}>사회초년생을 위한 금융 로드맵 서비스</p>
            <dl className={styles.detailFacts}>
              <div><dt>Category</dt><dd>UXUI Design</dd></div>
              <div><dt>Type</dt><dd>Team project</dd></div>
              <div><dt>Date</dt><dd>2026.09</dd></div>
            </dl>
            </div>
            <p className={styles.detailCopy}>막연하게만 느껴지는 재무 계획, 어디서부터 시작하고 있나요?<br />MONEAR는 사회초년생의 재무 목표를 구체적인<br />로드맵으로 설계하고, 이를 실천 가능한 금융 행동으로<br />연결하는 서비스입니다. 현재의 수입과 지출, 목표와 상황을<br />바탕으로 나에게 필요한 방향을 찾고, 예상치 못한 변화에도<br />유연하게 계획을 조정하며 원하는 미래에 한 걸음씩<br />가까워질 수 있도록 돕습니다.<br />작은 금융 행동으로 미래의 목표를 가까이, MONEAR.</p>
          </aside>
          <div
            className={styles.portfolioViewer}
            tabIndex={0} role="region" aria-label="머니어 아카이빙 스크롤 영역"
          >
            <Image src="/monear-archiving.png" alt="머니어 아카이빙: 금융 로드맵 서비스 MONEAR의 표지, 앱 화면과 프로젝트 팀 소개" width={960} height={1847} unoptimized draggable={false} className={styles.portfolioImage} />
          </div>
          </div>
        </section>
      ) : (
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
            <button type="button" className={styles.projectRow} onClick={() => setShowMonear(true)} aria-label="MONEAR 상세 작업 열기">
              <span>01</span><span>MONEAR</span><span>Team project</span><span>2026</span><span aria-hidden="true">→</span>
            </button>
          </div>
        </section>
      )}

      {!showMonear && <p className={styles.archiveTitle}>Archive</p>}
    </main>
  );
}
