# TODO.md

## M1 — 베이스 환경 & 에셋
- [x] GitHub 리포지토리 클론 및 로컬 git 연결 (origin/main)
- [x] PRD.docx · UI 기능명세서.pdf 분석
- [x] source 폴더 확인 (brand-city.mp4 1920×1080 / 24fps / 15s)
- [x] 폴더 구조 생성 (assets/css/js)
- [x] brand-city.mp4 → assets/videos 배치
- [x] WebM(VP9) 변환 (ffmpeg 설치 후 생성)
- [x] Poster WebP 추출
- [x] 임시 TILON 워드마크 SVG 제작 (공식 CI 수령 시 교체)

## M2 — 고정 스테이지 & Hero
- [x] 1920×1080 고정 스테이지 + transform: scale() 레터박스 피팅
- [x] Layer 0 Poster/Animated Gradient 폴백
- [x] Layer 1 Hero 영상 (autoplay/muted/loop/playsinline, WebM→MP4→Poster 폴백)
- [x] 부분 Bottom Gradient 오버레이 (전체 Dark Overlay 금지)
- [x] Layer 2 타이틀 "AI NATIVE CAMPUS" + 서브 카피
- [x] Layer 4 TILON CI + Full Screen 버튼

## M3 — CTA & 인터랙션
- [x] Glass UI 버튼 3개 (500×108, gap 30, X180/Y870)
- [x] Hover 모션 (-7px, scale 1.015, TILON Green border, Glow, 화살표 8px)
- [x] Magnetic Hover (버튼 ±3px / 텍스트 ±6px)
- [x] 클릭 상태 (scale 0.985, 100ms) + 새 탭 `<a target="_blank">`
- [x] 키보드: Tab/Shift+Tab/Enter/Space/1/2/3/F/ESC
- [x] 진입 모션 타임라인 (0~1.2s, 1회 실행)
- [x] visibilitychange 영상 일시정지/재개
- [x] prefers-reduced-motion 축소 모션

## M4 — 예외 처리 & 문서 & QA
- [x] 모바일/협소 뷰포트 PC 안내 화면 (UA·1024px·세로)
- [x] backdrop-filter 미지원 폴백
- [x] README / DECISIONS / KNOWN_ISSUES 작성
- [x] 로컬 서버 QA (1366×768 / 1920×1080 / 2560×1440 / 3840×2160)
- [x] 콘솔 에러 0건 확인
- [x] git 커밋 체크포인트

## M5 — 공유 메타데이터
- [x] Open Graph 태그 (og:title/description/image/url/locale 등) + twitter:card
- [x] OG 공유 이미지 제작 ("AI Native Campus 제안", 다크블루, 1200×630 PNG)
- [x] 파비콘 제작 (32/180/512px PNG)

## 후속 (에셋 수령 대기)
- [ ] 공식 TILON CI 파일로 tilon-logo.svg 교체
- [ ] Pretendard woff2 라이선스 확인 후 assets/fonts 번들 + @font-face
