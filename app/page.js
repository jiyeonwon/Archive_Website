"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

const folders = ["UXUI", "INTERACTION", "BRANDING", "EDITORIAL DESIGN"];

const projects = {
  UXUI: {
    name: "MONEAR",
    type: "Team project",
    year: "2026",
    category: "UXUI Design",
    date: "2026.09",
    subtitle: "사회초년생을 위한 금융 로드맵 서비스",
    description: "막연하게만 느껴지는 재무 계획, 어디서부터 시작하고 있나요? MONEAR는 사회초년생의 재무 목표를 구체적인 로드맵으로 설계하고, 이를 실천 가능한 금융 행동으로 연결하는 서비스입니다. 현재의 수입과 지출, 목표와 상황을 바탕으로 나에게 필요한 방향을 찾고, 예상치 못한 변화에도 유연하게 계획을 조정하며 원하는 미래에 한 걸음씩 가까워질 수 있도록 돕습니다. 작은 금융 행동으로 미래의 목표를 가까이, MONEAR.",
    image: "/monear-archiving-hd.png",
    imageWidth: 1920,
    imageHeight: 3694,
    imageAlt: "머니어 아카이빙: 금융 로드맵 서비스 MONEAR의 표지, 앱 화면과 프로젝트 팀 소개",
  },
  BRANDING: {
    name: "Tea-ka",
    type: "Team project",
    year: "2026",
    category: "Branding",
    date: "2026.06",
    subtitle: "업무 공간에 감각적인 휴식과 팀의 소통을 더하는 오피스 티(Tea) 구독 서비스",
    description: "Tea-ka는 차를 매개로 오피스 속 자연스러운 소통을 만드는 블렌딩 티 브랜드입니다. 리추얼 키트와 라포 형성 카드 등 다양한 브랜드 경험을 통해 사람과 사람을 연결하고, 바쁜 업무 환경 속에서도 부담없이 대화를 시작할 수 있는 새로운 오피스 티 문화를 만들어갑니다.",
  },
};

export default function Home() {
  const [activeFolder, setActiveFolder] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const selectedProject = activeProject ? projects[activeProject] : null;
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
          <p><a href="mailto:jiyeon.direct@gmail.com" aria-label="jiyeon.direct@gmail.com으로 메일 보내기">jiyeon.direct@gmail.com</a></p>
        </address>
      </header>

      {!activeFolder ? <section className={styles.folderGrid} aria-label="Project folders">
        {folders.map((folder) => (
          <article className={styles.folder} key={folder}>
            {["UXUI", "INTERACTION", "BRANDING"].includes(folder) && <button type="button" className={styles.folderHitArea} aria-label={`${folder} 폴더 열기`} onClick={() => setActiveFolder(folder)} />}
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
      </section> : selectedProject ? (
        <section className={styles.detailWindow} aria-label={`${selectedProject.name} 상세 작업`}>
          <div className={styles.windowBar}>
            <p>Archive / {activeProject}</p>
            <button type="button" aria-label={`${selectedProject.name} 상세 작업 닫기`} onClick={() => setActiveProject(null)}>[ X ]</button>
          </div>
          <div className={styles.detailLayout}>
          <aside className={styles.detailDescription}>
            <div className={styles.detailContent}>
            <div className={styles.detailSummary}>
            <h1>{selectedProject.name}</h1>
            <p className={styles.detailSubtitle}>{selectedProject.subtitle}</p>
            <dl className={styles.detailFacts}>
              <div><dt>Category</dt><dd>{selectedProject.category}</dd></div>
              <div><dt>Type</dt><dd>{selectedProject.type}</dd></div>
              <div><dt>Date</dt><dd>{selectedProject.date}</dd></div>
            </dl>
            </div>
            <p className={styles.detailCopy}>{selectedProject.description}</p>
            </div>
          </aside>
          <div
            className={styles.portfolioViewer}
            tabIndex={0} role="region" aria-label={`${selectedProject.name} 작업 이미지 영역`}
          >
            {selectedProject.image && <Image src={selectedProject.image} alt={selectedProject.imageAlt} width={selectedProject.imageWidth} height={selectedProject.imageHeight} unoptimized draggable={false} className={styles.portfolioImage} />}
          </div>
          </div>
        </section>
      ) : (
        <section className={styles.projectWindow} aria-label={`Archive / ${activeFolder}`}>
          <div className={styles.windowBar}>
            <h1>Archive / {activeFolder}</h1>
            <button type="button" aria-label={`${activeFolder} 폴더 닫기`} onClick={() => setActiveFolder(null)}>[ X ]</button>
          </div>
          <aside className={styles.sidebar}>
            <div className={styles.sidebarFolder}>
              <Image src="/folder.png" alt="" width={736} height={736} />
              <p className={styles.folderLabel}>{activeFolder}</p>
            </div>
            <p className={styles.projectCount}>{projects[activeFolder] ? "01" : "00"} projects</p>
          </aside>
          <div className={styles.projectContent}>
            <h2>select a project</h2>
            <div className={styles.projectColumns} aria-hidden="true">
              <span /><span>Name</span><span>Type</span><span>Date</span><span />
            </div>
            {projects[activeFolder] && <button type="button" className={styles.projectRow} onClick={() => setActiveProject(activeFolder)} aria-label={`${projects[activeFolder].name} 상세 작업 열기`}>
              <span>01</span><span>{projects[activeFolder].name}</span><span>{projects[activeFolder].type}</span><span>{projects[activeFolder].year}</span><span aria-hidden="true">→</span>
            </button>}
          </div>
        </section>
      )}

      {!selectedProject && <p className={styles.archiveTitle}>Archive</p>}
    </main>
  );
}
