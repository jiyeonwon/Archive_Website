# Archive Website Design System

이 문서는 현재 `Archive_Website`에 구현된 화면 흐름, 레이아웃, 타이포그래피, 간격, 이미지 영역과 인터랙션을 기록한다. 구현 기준 파일은 `app/page.js`, `app/page.module.css`, `app/globals.css`이다.

## 1. 화면 흐름

```text
홈 / 폴더 선택
├─ UXUI 클릭
│  └─ UXUI 프로젝트 목록
│     ├─ MONEAR 클릭 → MONEAR 상세 화면
│     │  └─ [ X ] 클릭 → UXUI 프로젝트 목록
│     └─ [ X ] 클릭 → 홈
├─ INTERACTION 클릭
│  └─ INTERACTION 프로젝트 목록 (00 projects)
│     └─ [ X ] 클릭 → 홈
├─ BRANDING 클릭
│  └─ BRANDING 프로젝트 목록
│     ├─ Tea-ka 클릭 → Tea-ka 상세 화면
│     │  └─ [ X ] 클릭 → BRANDING 프로젝트 목록
│     └─ [ X ] 클릭 → 홈
└─ EDITORIAL DESIGN 클릭
   └─ EDITORIAL DESIGN 프로젝트 목록
      ├─ 戀人 클릭 → 戀人 상세 화면
      │  └─ [ X ] 클릭 → EDITORIAL DESIGN 프로젝트 목록
      └─ [ X ] 클릭 → 홈

우측 상단 이메일 클릭
└─ mailto:jiyeon.direct@gmail.com → 기본 메일 앱 작성 창
```

상태값은 다음 두 가지로 관리한다.

- `activeFolder`: `null`, `UXUI`, `INTERACTION`
- `activeProject`: `null`, `UXUI`, `BRANDING`, `EDITORIAL DESIGN`

## 2. 디자인 원칙

- 기준 캔버스: Figma Desktop 1920 × 1080
- 데스크톱 크기 환산: 주로 `vw`, 세로 위치는 `svh`
- 반응형 전환점: `1024px`
- 기본 배경: `#ffffff`
- 기본 글자: `#000000` (글로벌 foreground는 `#080808`)
- 기본 테두리: `1px solid #000000`
- 보조 구분선: `#b5b5b5`
- 스크롤바: thumb `#c8c8c8`, track `#ffffff`, 너비 `8px`
- 페이지 가로 넘침은 숨김: `overflow-x: hidden`

## 3. 타이포그래피

### 서체

| 용도 | 서체 | 굵기 | 파일 |
|---|---|---:|---|
| 일반 UI | Pretendard | 400 / 500 / 600 | `/public/fonts/pretendard-*.woff2` |
| Archive 장식 글자 | Are You Serious | 400 | `/public/fonts/are-you-serious.ttf` |

### 데스크톱 글자 크기

아래 px 값은 1920px 화면에서의 환산값이다.

| 요소 | CSS 값 | 1920px 기준 | 굵기 | 행간 |
|---|---:|---:|---:|---:|
| 상단 프로필/연락처 | `0.8333vw` | 16px | 500 | 1.7 |
| 폴더 이름 | `0.9375vw` | 18px | 500 | `1.7627vw` ≈ 33.84px |
| 창 상단바 | `1.04167vw` | 20px | 400 | 1.7 상속 |
| 프로젝트 수 | `0.83333vw` | 16px | 기본 | `1.61vw` ≈ 30.91px |
| `select a project` | `1.45833vw` | 28px | 400 | `2.5vw` = 48px |
| 프로젝트 표/행 | `0.83333vw` | 16px | 600 | `1.61vw` ≈ 30.91px |
| 상세 제목 MONEAR | `1.66667vw` | 32px | 500 | 1.7 |
| 상세 부제 | `1.04167vw` | 20px | 400 | 1.7 |
| 상세 메타 정보 | `1.04167vw` | 20px | 400 | 1.7 |
| 상세 설명 | `0.9375vw` | 18px | 400 | 1.7 |
| Archive 장식 글자 | `min(12.822vw, 246.184px)` | 최대 246.184px | 400 | 1.7 |

### 모바일 글자 크기 (`≤1024px`)

| 요소 | 크기 |
|---|---:|
| 상단 정보 | `clamp(11px, 2.9vw, 14px)` |
| 이름 WON JIYEON | 15px |
| 폴더 이름 | `clamp(10px, 2.8vw, 16px)` |
| 창 상단바 | 14px |
| 프로젝트 수 | 12px |
| `select a project` | 20px / 행간 30px |
| 프로젝트 표/행 | `clamp(11px, 3vw, 14px)` |
| 상세 제목 | 24px |
| 상세 부제/메타 | 16px |
| 상세 설명 | 15px / 행간 1.8 |
| Archive 장식 글자 | 28vw |

## 4. 공통 상단 정보 영역

### 데스크톱

- 위치: 화면 상단에서 `7.87svh`
- 수평 중앙 정렬: `left: 50%`, `translateX(-50%)`
- 3개 그룹: 이름 / 프로필 / 연락처
- 그룹 사이 간격: `33.8021vw`
- 프로필 너비: `11.6667vw`
- 연락처 너비: `9.3229vw`

### 모바일

- 상단 정보 전체를 하나의 공통 mobile header container로 관리한다.
- 컨테이너는 `width: 100%`, `box-sizing: border-box`, `padding-inline: 20px`를 사용해 좌우 여백을 동일하게 유지한다.
- 바깥 여백: 상 24px, 좌우 0, 하 32px
- 이름은 첫 줄의 전체 폭을 사용하고, 아래 줄에는 프로필/학교 정보와 연락처를 2열로 배치한다.
- 2열 사이 간격은 16px, 이름과 아래 정보 행 사이 간격은 20px이다.
- 각 블록은 `text-align: left`를 사용하며 개별 좌우 margin을 두지 않는다.
- 이메일은 긴 문자열이 화면 밖으로 나가지 않도록 줄바꿈 허용
- iPhone Safe Area의 좌우 값 중 더 큰 값을 페이지 양쪽에 동일하게 적용해 기기 방향이 달라져도 전체 레이아웃의 좌우 여백이 대칭을 유지한다.

## 5. 홈 / 폴더 선택 화면

### 데스크톱 레이아웃

- 폴더 영역 시작: `top: 36.9444svh`, `left: 11.7708vw`
- 전체 너비: `76.4583vw`
- 4열 Grid
- 각 열/폴더 너비: `14.4544vw`
- 열 사이 간격: `justify-content: space-between`
- 폴더 이미지: `14.4544vw × 14.4544vw`
- 이미지와 이름표 겹침: 이름표를 위로 `2.3878vw` 당김
- 이름표 패딩: 세로 `0.2644vw`, 가로 `1.1014vw`
- 이름표 그림자: `0 3.384px 3.384px rgb(0 0 0 / 40%)`

### 모바일 레이아웃

- 2열 Grid
- 좌우 바깥 여백: 20px
- 행 간격: 24px, 열 간격: 12px
- 전체 최대 너비: 600px
- 폴더 이미지: 열 너비를 따르되 최대 200px, 정사각형 비율 유지
- 이미지와 이름표 겹침: -24px
- 이름표 패딩: 5px 8px

### 상태

- 클릭 가능한 폴더: UXUI, INTERACTION, BRANDING, EDITORIAL DESIGN
- 클릭 가능한 폴더에 hover/focus 시 이름표가 검은 배경/흰 글자로 전환

## 6. 프로젝트 목록 창

### 창 컨테이너 — 데스크톱

- 상단 여백: `24.35185svh`
- 너비: `86.97917vw`
- 높이: `26.40625vw`
- 화면 중앙 배치
- 상단바 높이: `3.54167vw` (1920px 기준 68px)
- 상단바 좌우 패딩: `2.29167vw` (약 44px)

### 좌측 사이드바

- 너비: `15.625vw` (300px)
- 위: `4.27083vw`, 아래: `0.83333vw`
- 우측 1px 구분선
- 폴더 위 여백: `2.34375vw` (45px)
- 폴더 이미지: `13.20219vw` 정사각형
- 이미지/이름표 겹침: `-2.17807vw`
- 프로젝트 수 위 여백: `0.9124vw`

### 우측 프로젝트 영역

- 시작 위치: `top: 5.36458vw`, `left: 18.95833vw`
- 너비: `63.33333vw`
- 제목 아래 간격: `0.78125vw` (15px)
- 컬럼 헤더 높이: `4.58333vw` (88px)
- 프로젝트 행 최소 높이: `8.28125vw` (159px)
- 행 hover/focus: 검은 배경, 흰 글자, 160ms 전환

컬럼 비율:

```text
번호 23.28% | 이름 23.91% | 유형 26.78% | 날짜 22.27% | 화살표 3.76%
```

### 모바일

- 창: 좌우 16px, 높이 자동, 최소 높이 340px
- 상단바: 48px
- 사이드바와 프로젝트 영역을 위아래로 배치
- 사이드바 구분선 제거
- 폴더 이미지: 130px
- 프로젝트 영역 여백: 상하 24px, 좌우 12px
- 컬럼 헤더: 48px
- 프로젝트 행: 최소 80px
- 터치 가능한 닫기 버튼: 최소 44 × 44px

## 7. 프로젝트 상세 화면

### 창 컨테이너 — 데스크톱

- 상단 여백: `22.03704svh`
- 너비: `86.97917vw`
- 높이: `69.35185svh`
- 행 구성: 상단바 `3.54167vw` + 콘텐츠 나머지
- 창 외부 콘텐츠는 숨김

### 콘텐츠 배치

```text
┌────────────────────────────────────────────┬─────────────────────┐
│ 머니어 아카이빙 이미지 / 내부 스크롤 영역 │ 프로젝트 작업 설명 │
│ 가변 너비                                  │ 전체의 33.35329%    │
└────────────────────────────────────────────┴─────────────────────┘
```

- 왼쪽: 머니어 아카이빙 프레임
- 오른쪽: 제목, 부제, Category/Type/Date, 설명
- 설명 칸 왼쪽에 `#b5b5b5` 1px 구분선

### 작업 설명 간격

- 설명 칸 바깥 여백: 상 `0.57292vw`, 하 `0.83333vw`
- 설명 칸 내부 패딩: 상 `0.98958vw`, 좌우 `1.25vw`
- 공통 content block 최대 너비: `--project-detail-content-width: 25.3125vw` (1920px 기준 486px)
- 공통 content block 정렬: `margin-inline: auto`로 설명 패널 안에서 수평 중앙 정렬
- 상단 요약 영역은 콘텐츠 높이에 맞게 늘어나는 `height: auto` 방식
- 제목과 한 줄 소개 사이 간격: `0.20833vw` (1920px 기준 약 4px)
- 한 줄 소개 아래 여백: `0.72917vw` (1920px 기준 약 14px)
- 한 줄 소개 아래 1px 검은 선
- 메타 정보 위 간격: `2.5vw` (48px)
- 메타 영역과 본문 너비: 설명 칸 콘텐츠 영역의 `100%`
- 메타 행 사이 간격: `0.46875vw` (9px)
- 메타 영역과 본문 사이: `2.08333vw` (40px)

### Project Detail Body / Alignment

- **기본 기준:** MONEAR 작업 설명 본문의 content grid와 가로 폭을 Project Detail Body의 기본값으로 사용한다.
- MONEAR 기준값은 데스크톱 `detailContent` 최대 폭 `25.3125vw` 안에서 본문 `width: 100%`, `max-width: 100%`이다.
- 제목, 한 줄 소개, divider, 메타정보는 공통 `detailContent`에 배치하고, 작업 설명 본문은 별도의 공통 `detailBody` 컨테이너에 배치한다.
- `detailContent`와 `detailBody`는 데스크톱에서 동일한 `width: 100%`, `max-width: var(--project-detail-content-width)`, `margin-inline: auto`를 사용해 같은 content grid에 놓는다.
- 설명 패널의 좌우 패딩은 동일한 `1.25vw`이며, content block의 실제 바깥 여백도 좌우가 동일하게 유지된다.
- content block만 중앙 정렬하고 내부 텍스트는 모두 `text-align: left`를 유지한다.
- 내부 요소에 서로 다른 좌우 패딩, 음수 마진, 임의 offset을 적용하지 않는다.
- 모바일에서는 설명 패널의 좌우 16px 패딩 안에서 공통 content 최대 폭과 본문 `width`/`max-width`를 모두 `100%`로 사용한다.
- 모바일의 `detailContent`와 `detailBody`는 `min-width: 0`, `margin-inline: 0`을 사용해 좁은 아이폰 폭에서도 부모 영역을 밀어내지 않는다.
- 모바일 작업 설명 본문은 `white-space: normal`, `word-break: keep-all`, `overflow-wrap: break-word`, `text-wrap: pretty`를 공통 적용해 단어 단위로 자연스럽게 reflow한다.
- 모바일 MONEAR 도입 문장은 예외적으로 `막연하게만 느껴지는 재무계획,`과 `어디서 부터 시작하고 있나요?`의 두 줄로 표시한다. 데스크톱 도입 문구는 유지한다.
- 새 프로젝트 상세페이지도 프로젝트별 정렬 예외 클래스를 만들지 않고 이 공통 content container를 재사용한다.
- 모든 프로젝트의 작업 설명 본문은 하나의 `.detailCopy` 규칙만 사용하며 `width`와 `max-width`를 모두 `var(--project-detail-body-width)`로 지정한다.
- `--project-detail-body-width`의 공통값은 MONEAR에서 사용하는 `100%`이며, 신규 프로젝트는 이 값을 기본으로 사용한다.
- 기본적으로 프로젝트 데이터, 프로젝트명 또는 카테고리를 기준으로 본문 폭을 덮어쓰지 않는다.
- 명시적으로 더 짧은 본문 그리드를 요구한 Tea-ka는 `detailCopyCompact`를 사용하며, 데스크톱 `max-width: 23.90625vw`, 모바일 `max-width: 100%`로 처리한다. 왼쪽 시작선과 공통 본문 스타일은 유지한다.
- Tea-ka 본문은 예외적으로 첫 문장 블록을 “만드는”에서 끝내고, 다음 내용은 새 문장 블록에서 시작한다. `<br>` 대신 description 데이터의 `opening`과 `body` 블록을 사용한다.
- 모바일 Tea-ka 본문은 `opening`과 `body`를 인라인 흐름으로 연결해 “만드는 블렌딩” 사이에 강제 줄바꿈이 생기지 않도록 한다.
- 모바일 Tea-ka 본문은 “블렌딩 티 브랜드입니다.”까지 같은 흐름으로 표시하고, 다음 줄에서 “리추얼 키트와…”가 시작되도록 `mobileBody` 문장 블록을 사용한다.
- Tea-ka의 `라포 형성 카드 등`은 하나의 의미 단위이므로 단어 사이에 non-breaking space(`\u00A0`)를 사용해 줄 중간에서 분리하지 않는다.
- 동일한 화면 크기에서는 모든 프로젝트 본문의 왼쪽 시작점이 같은 content grid를 사용하며, 별도 요청이 없는 본문의 오른쪽 끝점과 좌우 여백도 동일하다.
- Project Detail의 작업 설명 본문은 Category / Type / Date 메타정보 그리드의 DOM 폭이나 내부 정렬에 종속되지 않고, 독립된 `detailBody`에서 공통 본문 폭을 사용한다.
- 메타정보의 폭이나 레이아웃을 변경해도 `detailBody`와 `.detailCopy`의 폭에는 영향을 주지 않아야 한다.
- 세부설명이 도입 문장, 본문, 마무리 문장으로 구성될 때는 각 구간을 의미 있는 문장 블록으로 나누되 모두 동일한 `detailCopy` 텍스트 박스 안에 배치한다.
- 도입 문장과 마무리 문장은 각각 독립된 블록으로 유지하고, 문장의 시각적 흐름이 다음 구간과 섞이지 않도록 한다.
- 문장 블록을 나누기 위해 임의의 `<br>`을 사용하지 않는다. 데이터 구조와 `<span>` 블록을 사용하며 각 블록 내부는 컨테이너 폭에 따라 자연스럽게 reflow한다.
- 프로젝트 설명이 단일 문단이면 문자열 그대로 `detailCopy`에 배치하고, 여러 문장 구간이면 동일한 공통 렌더링 구조를 사용한다.
- 이후 추가되는 모든 프로젝트의 세부설명에는 기본 본문 폭, 왼쪽 시작선, 행간, `word-break: keep-all` 및 문장 블록 규칙을 적용한다.

### 상세페이지 공통 타이포 규칙

MONEAR, Tea-ka, 戀人을 포함한 모든 프로젝트 상세페이지는 아래 규칙과 동일한 CSS 클래스를 사용한다.

- 제목: 데스크톱 32px 상당(`1.66667vw`), 모바일 24px, 굵기 500, 행간 1.35
- 한 줄 소개: 데스크톱 20px 상당(`1.04167vw`), 모바일 16px, 행간 1.7
- 본문: 데스크톱 18px 상당(`0.9375vw`), 모바일 15px, 데스크톱 행간 1.7 / 모바일 행간 1.8
- 제목 → 한 줄 소개 → 구분선 순서의 간격은 공통값을 사용하며 프로젝트별 고정 높이나 예외 클래스를 두지 않는다.
- 한 줄 소개와 본문에는 `word-break: keep-all`을 적용해 한국어가 글자 중간에서 끊기지 않도록 한다.
- 본문은 공통 `--project-detail-body-width: 100%`를 사용해 content grid의 가용 폭을 동일하게 채운다.
- 콘텐츠 안에 줄 배치를 위한 `<br>`을 넣지 않는다. 줄바꿈은 컨테이너 폭과 브라우저 레이아웃에 맡긴다.
- 긴 영문 등 예외적인 문자열만 영역 밖으로 넘치지 않도록 `overflow-wrap: break-word`를 함께 사용한다.

### Project Detail Media / 작업 미디어 영역

- MONEAR 원본: `/public/monear-archiving-hd.png`, 1920 × 3694px
- Tea-ka 원본: `/public/tea-ka-webportfolio.png`, 1566 × 1860px
- 모든 프로젝트 미디어는 동일한 `portfolioViewer`, `portfolioMediaStack`, `portfolioMedia` 공통 스타일을 사용한다.
- 표시 방식: 컨테이너 너비 100%, 높이 자동, `display: block`, `object-fit: contain`
- HTML 이미지의 `width`와 `height`에는 각 파일의 실제 원본 픽셀 크기를 지정한다.
- 원본 가로세로 비율을 유지하며 강제 crop, 고정 높이 변형, 비율과 다른 확대·축소를 적용하지 않는다.
- `portfolioViewer`와 `portfolioMediaStack`의 패딩·마진·gap은 모두 `0`이며, 미디어가 컨테이너 가로 폭을 완전히 채운다.
- 데스크톱과 모바일 모두 미디어 바깥에 프로젝트별 좌우 padding, margin 또는 max-width를 추가하지 않는다.
- 세로 스크롤만 허용하고 가로 넘침은 숨김
- 이미지 드래그는 비활성화
- 아카이빙과 설명 영역 모두 동일한 회색 스크롤바 사용
- 여러 미디어는 프로젝트 데이터의 `media` 배열 순서대로 렌더링한다.
- 연속 미디어 스택은 `display: flex`, `flex-direction: column`, `gap: 0`, `line-height: 0`을 사용하며 각 미디어는 `display: block`, `margin: 0`, `padding: 0`, `border: 0`을 사용한다.
- 검은 미디어 영역은 `portfolioViewerDark`와 `portfolioMediaStackDark`를 함께 적용해 요소 사이와 컨테이너 패딩 영역에 흰색이 비치지 않도록 한다.
- 이미지와 비디오는 동일한 `width: 100%`, `height: auto`, `object-fit: contain`을 사용해 원본 비율을 유지한다.
- 새 프로젝트 미디어는 프로젝트 데이터에 단일 이미지 또는 `media` 배열을 추가하고 공통 레이아웃 CSS를 재사용한다.
- 戀人 미디어 순서: `/public/musicbook_video.mp4` 다음에 `/public/musicbook_image.png`(1920 × 1080px)를 간격 없이 배치한다.
- 이 full-width 미디어 규칙은 Project Detail의 고정 공통 규칙이며 MONEAR, Tea-ka, 戀人과 이후 추가되는 모든 프로젝트에 동일하게 적용한다.

### 모바일 상세 화면

```text
상단바
작업 설명
머니어 아카이빙 이미지
```

- 창 좌우 여백: 16px
- 설명 칸 좌우 padding: 16px. 따라서 작업 설명 본문은 모든 아이폰 폭에서 상세 창과 설명 칸의 공통 여백 안쪽을 `width: 100%`로 사용한다.
- 콘텐츠를 1열로 전환
- 설명칸 내부 스크롤을 제거하고 페이지 전체 스크롤 사용
- 모든 프로젝트의 작업 설명 본문은 강제 `<br>` 없이 `word-break: keep-all` 기준으로 화면 너비에 맞춰 자연스럽게 줄바꿈
- 이미지 영역 내부 스크롤을 제거하고 원본 비율로 전체 표시
- 이미지와 비디오 영역의 좌우 및 상단 여백은 `0`

## 8. Archive 장식 글자

### 데스크톱

- 위치: `top: 64.72svh`, `left: 62.4vw`
- 최대 크기: 246.184px
- 프로젝트 상세 화면에서는 숨김

### 모바일

- 일반 문서 흐름에 배치
- 오른쪽 정렬 효과: `margin-left: auto`
- 상단 16px, 좌우 24px
- 글자 크기 28vw

## 9. 인터랙션과 접근성

- UXUI/INTERACTION 폴더는 전체 카드 크기의 투명 버튼으로 클릭 가능
- 닫기 버튼에는 각 화면에 맞는 `aria-label` 적용
- MONEAR 상세 이미지 영역은 `role="region"`, `tabIndex="0"` 적용
- 키보드 포커스 시 이미지 영역에 1px 검은 outline 표시
- 프로젝트 행은 hover와 keyboard focus 상태가 동일
- 이메일은 `mailto:` 링크로 연결
- 모바일 닫기 버튼은 최소 44px 터치 타깃

## 10. 반응형 체크 기준

현재 검증된 뷰포트:

- iPhone 소형: 320px 너비
- iPhone 일반: 390 × 844px
- 전환 기준: 1024px 이하
- 320px와 390px에서 가로 넘침 없음

새 화면이나 프로젝트를 추가할 때 확인할 항목:

1. 320px에서 가로 스크롤이 생기지 않는가
2. 390px에서 이메일과 프로젝트명이 잘리지 않는가
3. 이미지가 찌그러지지 않고 `height: auto`를 유지하는가
4. 버튼 터치 영역이 최소 44 × 44px인가
5. 데스크톱 1920 × 1080에서 Figma 기준 위치와 크기가 유지되는가
6. 고정 줄바꿈이 모바일에서 문장을 붙이지 않는가

## 11. 재사용 규칙

- 새 폴더 화면은 `projectWindow`, `windowBar`, `sidebar`, `projectContent` 구조를 재사용한다.
- MONEAR, Tea-ka, 戀人 상세 화면은 `detailWindow`, `detailLayout`, `portfolioViewer`, `detailDescription` 구조를 공유한다.
- 작업 이미지는 고해상도 원본을 사용하고 CSS에서 확대하지 않는다.
- 이미지에는 반드시 실제 `width`와 `height`를 지정해 레이아웃 이동을 방지한다.
- 데스크톱 수치는 Figma 1920px 값을 `값 ÷ 1920 × 100vw`로 환산한다.
- 모바일에서는 중요한 텍스트와 터치 영역을 px/clamp 단위로 고정해 가독성을 유지한다.

## 12. 현재 구현 참고 파일

| 파일 | 역할 |
|---|---|
| `app/page.js` | 화면 상태, 화면 흐름, 콘텐츠, 클릭 동작 |
| `app/page.module.css` | 화면별 레이아웃, 크기, 간격, 반응형 규칙 |
| `app/globals.css` | 폰트 선언, 전역 색상, 초기화 |
| `app/layout.js` | 문서 언어와 사이트 메타데이터 |
| `public/folder.png` | 폴더 이미지 |
| `public/monear-archiving-hd.png` | MONEAR 아카이빙 작업 이미지 |
| `public/tea-ka-webportfolio.png` | Tea-ka 브랜드 웹 포트폴리오 이미지 |
| `public/musicbook_video.mp4` | 戀人 뮤직북 작업 영상 |
| `public/musicbook_image.png` | 戀人 뮤직북 작업 이미지 |
