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
    description: {
      opening: "막연하게만 느껴지는 재무 계획, 어디서부터 시작하고 있나요?",
      body: "MONEAR는 사회초년생의 재무 목표를 구체적인 로드맵으로 설계하고, 이를 실천 가능한 금융 행동으로 연결하는 서비스입니다. 현재의 수입과 지출, 목표와 상황을 바탕으로 나에게 필요한 방향을 찾고, 예상치 못한 변화에도 유연하게 계획을 조정하며 원하는 미래에 한 걸음씩 가까워질 수 있도록 돕습니다.",
      closing: "작은 금융 행동으로 미래의 목표를 가까이, MONEAR.",
    },
    hideOpeningOnMobile: true,
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
    description: {
      opening: "Tea-ka는 차를 매개로 오피스 속 자연스러운 소통을 만드는",
      body: "블렌딩 티 브랜드입니다. 리추얼 키트와 라포\u00A0형성\u00A0카드\u00A0등 다양한 브랜드 경험을 통해 사람과 사람을 연결하고, 바쁜 업무 환경 속에서도 부담없이 대화를 시작할 수 있는 새로운 오피스 티 문화를 만들어갑니다.",
    },
    mobileBody: [
      "블렌딩 티 브랜드입니다.",
      "리추얼 키트와 라포\u00A0형성\u00A0카드\u00A0등 다양한 브랜드 경험을 통해 사람과 사람을 연결하고, 바쁜 업무 환경 속에서도 부담없이 대화를 시작할 수 있는 새로운 오피스 티 문화를 만들어갑니다.",
    ],
    compactDescription: true,
    joinDescriptionOnMobile: true,
    image: "/tea-ka-webportfolio.png",
    imageWidth: 1566,
    imageHeight: 1860,
    imageAlt: "Tea-ka 오피스 티 구독 서비스 브랜드 웹 포트폴리오",
  },
  "EDITORIAL DESIGN": {
    name: "戀人",
    type: "Personal project",
    year: "2026",
    category: "Editorial Design",
    date: "2026",
    subtitle: [
      "자우림의 2집 타이틀곡 「미안해 널 미워해」를",
      "바탕으로 제작한 뮤직북",
    ],
    description: {
      opening: "곡에 담긴 사랑과 미움, 애정과 체념이 공존하는 복합적인 감정을 텍스트의 배치와 그리드의 변주를 통해 시각적으로 해석하였다.",
      body: "원문 가사와 해석을 분리해 구성함으로써 곡의 서사와 감정의 층위를 드러내고, 반복적으로 등장하는 선을 활용해 분절된 문장들을 하나의 감정선으로 연결하였다.",
      closing: "이 책은 음악을 읽는 경험과 디자인을 보는 경험이 교차하는 지점에서, 쉽게 사라지지 않는 애증의 감정을 드러낸다.",
    },
    darkMedia: true,
    media: [
      {
        type: "video",
        src: "/musicbook_video.mp4",
        label: "戀人 뮤직북 영상",
      },
      {
        type: "image",
        src: "/musicbook_image.png",
        width: 1920,
        height: 1080,
        alt: "戀人 뮤직북 작업 이미지",
      },
    ],
  },
};

export default function Home() {
  const [activeFolder, setActiveFolder] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const selectedProject = activeProject ? projects[activeProject] : null;
  const selectedMedia = selectedProject?.media ?? (selectedProject?.image ? [{
    type: "image",
    src: selectedProject.image,
    width: selectedProject.imageWidth,
    height: selectedProject.imageHeight,
    alt: selectedProject.imageAlt,
  }] : []);
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
            {(["INTERACTION"].includes(folder) || projects[folder]) && <button type="button" className={styles.folderHitArea} aria-label={`${folder} 폴더 열기`} onClick={() => setActiveFolder(folder)} />}
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
            <p className={styles.detailSubtitle}>
              {Array.isArray(selectedProject.subtitle) ? selectedProject.subtitle.map((line) => (
                <span className={styles.detailSubtitleLine} key={line}>{line}</span>
              )) : selectedProject.subtitle}
            </p>
            <dl className={styles.detailFacts}>
              <div><dt>Category</dt><dd>{selectedProject.category}</dd></div>
              <div><dt>Type</dt><dd>{selectedProject.type}</dd></div>
              <div><dt>Date</dt><dd>{selectedProject.date}</dd></div>
            </dl>
            </div>
            </div>
            <div className={styles.detailBody}>
            <p className={`${styles.detailCopy} ${selectedProject.compactDescription ? styles.detailCopyCompact : ""} ${selectedProject.joinDescriptionOnMobile ? styles.detailCopyJoinMobile : ""}`}>
              {typeof selectedProject.description === "string" ? selectedProject.description : (
                <>
                  {selectedProject.description.opening && (
                    <span className={`${styles.detailSentence} ${selectedProject.hideOpeningOnMobile ? styles.detailOpeningDesktop : ""}`}>{selectedProject.description.opening}</span>
                  )}
                  {selectedProject.description.body && (selectedProject.mobileBody ? (
                    <>
                      <span className={styles.detailBodyDesktop}>{selectedProject.description.body}</span>
                      <span className={styles.detailBodyMobile}>
                        {selectedProject.mobileBody.map((line) => <span key={line}>{line}</span>)}
                      </span>
                    </>
                  ) : <span>{selectedProject.description.body}</span>)}
                  {selectedProject.description.closing && <span className={styles.detailSentence}>{selectedProject.description.closing}</span>}
                </>
              )}
            </p>
            </div>
          </aside>
          <div
            className={`${styles.portfolioViewer} ${selectedProject.darkMedia ? styles.portfolioViewerDark : ""}`}
            tabIndex={0} role="region" aria-label={`${selectedProject.name} 작업 이미지 영역`}
          >
            <div className={`${styles.portfolioMediaStack} ${selectedProject.darkMedia ? styles.portfolioMediaStackDark : ""}`}>
              {selectedMedia.map((media) => media.type === "video" ? (
                <video key={media.src} className={styles.portfolioMedia} autoPlay muted loop playsInline preload="metadata" aria-label={media.label}>
                  <source src={media.src} type="video/mp4" />
                </video>
              ) : (
                <Image key={media.src} src={media.src} alt={media.alt} width={media.width} height={media.height} unoptimized draggable={false} className={styles.portfolioMedia} />
              ))}
            </div>
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
