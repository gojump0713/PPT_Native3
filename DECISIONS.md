# DECISIONS.md

자율 실행 규칙에 따라 PRD/명세에 없거나 모호한 사항을 아래와 같이 결정하고 진행했습니다.

## D-01. 기준 문서 우선순위
- **결정**: PRD.docx(ScrollDeck Pro, 다중 슬라이드 시스템)와 UI 기능명세서.pdf(1페이지 랜딩 허브)가 상충하는 부분은 **UI 기능명세서를 우선** 적용.
- **이유**: UI 기능명세서가 본 프로젝트(PPT_Native3) 전용 최신 명세이며, 문서 스스로 "기존 슬라이드형 구조를 단일 랜딩 허브로 재구성한 명세"라고 선언함. Overview Mode·슬라이드 전환 등 PRD의 슬라이드 엔진 기능은 명세서 §13에서 명시적으로 제외됨.

## D-02. WebM 변환 및 포스터 생성
- **결정**: 로컬에 ffmpeg가 없어 winget으로 설치 후, source/brand-city.mp4(H.264, 1920×1080, 24fps, 15s, 37MB)를 VP9 WebM(CRF 33, 21MB)으로 변환하고 0.5초 지점 프레임을 WebP 포스터(305KB)로 추출.
- **이유**: 명세 §6.1이 WebM 우선 + MP4 폴백 + Poster WebP 구조를 요구. source 폴더에 webm/mov/poster가 없어 직접 생성.

## D-03. TILON CI
- **결정**: source 폴더에 CI 파일이 없어 임시 TILON 워드마크 SVG(`assets/images/tilon-logo.svg`, 흰색 + TILON Green 포인트)를 제작해 사용. SVG 로드 실패 시 텍스트 "TILON" 폴백도 유지.
- **이유**: 명세 §8.1 "CI 이미지가 없는 경우 임시 텍스트 사용". 텍스트 대신 SVG 워드마크를 만들어 두면 공식 CI 수령 시 파일 교체만으로 반영 가능하고, 404 콘솔 에러(품질 기준: Console Error 0건)도 방지됨.

## D-04. 폰트
- **결정**: Pretendard 웹폰트 파일을 번들하지 않고 `"Pretendard", "Noto Sans KR", "Malgun Gothic", Arial, sans-serif` 로컬 폰트 스택 사용.
- **이유**: 외부 Font CDN 금지 + 리포지토리에 폰트 파일 미제공. 시스템에 Pretendard가 설치돼 있으면 자동 적용되고, 없으면 Windows(맑은 고딕)/macOS에서 유사한 Sans로 렌더링됨. 라이선스 확인된 Pretendard woff2를 받으면 `assets/fonts/`에 넣고 `@font-face`만 추가하면 됨.

## D-05. Hero 텍스트 위치
- **결정**: 명세 기본값(X 120 / Y 230, 좌측 배치) 유지.
- **이유**: brand-city 영상 포스터 프레임 확인 결과 도시 스카이라인 원경 중심으로 특정 피사체가 좌측에 치우치지 않아, 좌측 텍스트가 주요 장면을 가리지 않음.

## D-06. 숫자 키(1/2/3)의 새 탭 실행 방식
- **결정**: 키보드 실행은 `window.open(url, "_blank", "noopener,noreferrer")` 사용, 클릭은 `<a target="_blank" rel="noopener noreferrer">` 사용. 팝업이 차단되면 해당 버튼에 포커스를 이동시켜 Enter로 실행 가능하게 함.
- **이유**: 명세 §12.4는 `<a>` 우선을 요구(클릭 경로에 적용). 키 입력에는 anchor가 없으므로 window.open이 유일한 수단이며, 사용자 제스처(keydown) 내 호출이라 일반적으로 차단되지 않음.

## D-07. 진입 모션 구현 방식
- **결정**: GSAP 등 라이브러리 없이 CSS transition-delay 타임라인(0.25/0.5/0.75/1.0/1.1/1.2s) + `is-entered` 클래스 1회 토글로 구현.
- **이유**: 명세 §20 "GSAP 필수 아님, transform/opacity/filter만 사용". 단일 진입 시퀀스에는 CSS만으로 충분하고 번들 의존성이 없어짐.

## D-08. Space 키 링크 실행
- **결정**: 포커스된 CTA(`<a>`)에서 Space 입력 시 preventDefault 후 click()을 호출.
- **이유**: 명세 §13이 Space 실행을 요구하지만 HTML 링크는 기본적으로 Enter만 지원하므로 JS 보강 필요.

## D-09. 원본 mp4의 리포지토리 포함
- **결정**: Source/brand-city.mp4(37MB)를 리포지토리에 그대로 유지.
- **이유**: 명세 §19 파일 구조에 source 폴더가 포함되어 있고, GitHub 파일 한도(100MB) 이내. 배포 페이지가 실제 로드하는 것은 assets/ 쪽 파일임.
