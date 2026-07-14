# TILON AI Native Campus — Interactive Hub

틸론 대학 솔루션(AI Native Campus)을 안내하는 **PC 전용 HTML 인터랙티브 랜딩 허브**입니다.
시네마틱 brand-city 영상 위에 3개의 Glass UI 버튼으로 솔루션 소개 · 구축 사례 · 도입 효과 콘텐츠로 연결합니다.

- 배포 주소: https://gojump0713.github.io/PPT_Native3/
- 리포지토리: https://github.com/gojump0713/PPT_Native3.git

## 실행 방법

빌드 과정이 없는 순수 HTML/CSS/Vanilla JS입니다.

```bash
# 로컬 서버 실행 (아무 정적 서버나 가능)
python -m http.server 8000
# 또는
npx serve .
```

브라우저(Chrome/Edge)에서 `http://localhost:8000` 접속.
`index.html`을 파일로 직접 열어도 동작합니다(로컬 에셋만 사용).

## GitHub Pages 배포 방법

1. `main` 브랜치에 커밋 & 푸시
2. GitHub 리포지토리 → Settings → Pages → Source: `Deploy from a branch`, Branch: `main` / `(root)`
3. 1~2분 후 https://gojump0713.github.io/PPT_Native3/ 에 반영

모든 에셋은 상대 경로(`./assets/...`)를 사용하므로 하위 경로 배포에서 404가 발생하지 않습니다.

## 파일 구조

```
/PPT_Native3
├─ index.html            # 단일 진입점 (1페이지 Hub)
├─ README.md / TODO.md / DECISIONS.md / KNOWN_ISSUES.md
├─ Source/               # 원본 에셋 (brand-city.mp4)
├─ assets
│  ├─ videos/  brand-city.webm(우선) · brand-city.mp4(폴백)
│  ├─ images/  brand-city-poster.webp · tilon-logo.svg
│  ├─ fonts/   (로컬 폰트 배치용 — 현재 시스템 폰트 스택 사용)
│  └─ icons/
├─ css
│  ├─ reset.css          # 최소 리셋
│  ├─ tokens.css         # 디자인 토큰 (컬러·모션·폰트)
│  ├─ layout.css         # 고정 스테이지·레이어 배치
│  ├─ components.css     # Glass CTA 버튼·전체화면 버튼·PC 안내 화면
│  ├─ animations.css     # 진입 모션 타임라인
│  └─ fallback.css       # 영상 실패·backdrop-filter 미지원·no-js 폴백
└─ js
   ├─ config.js          # 버튼 URL·스테이지·게이트 설정 (여기만 수정하면 됨)
   ├─ env-gate.js        # 모바일/협소 뷰포트 안내 화면
   ├─ stage.js           # 1920×1080 레터박스 스케일링
   ├─ video-controller.js# 영상 재생·폴백·탭 이탈 일시정지
   ├─ fullscreen.js      # F 키·버튼 전체화면
   ├─ interactions.js    # 키보드 맵·Magnetic Hover
   └─ main.js            # 부트스트랩·진입 모션 트리거
```

## 조작법

| 입력 | 기능 |
|---|---|
| 마우스 클릭 | 각 콘텐츠 새 탭 실행 |
| Tab / Shift+Tab | 버튼 포커스 이동 |
| Enter / Space | 포커스된 콘텐츠 실행 |
| 1 / 2 / 3 | 솔루션 소개 / 구축 사례 / 도입 효과 실행 |
| F | 전체 화면 토글 |
| ESC | 전체 화면 해제 |

## 영상 교체 방법

1. 새 영상을 `assets/videos/brand-city.mp4` (H.264) 로 교체
2. 가능하면 WebM(VP9)도 함께 교체: `assets/videos/brand-city.webm`
   ```bash
   ffmpeg -i new-video.mp4 -c:v libvpx-vp9 -crf 33 -b:v 0 -row-mt 1 -an assets/videos/brand-city.webm
   ```
3. 포스터 프레임 갱신:
   ```bash
   ffmpeg -ss 0.5 -i new-video.mp4 -frames:v 1 -c:v libwebp assets/images/brand-city-poster.webp
   ```
4. 16:9(1920×1080) 영상 권장 — 다른 비율도 `object-fit: cover`로 채워지지만 가장자리가 잘립니다.
   주요 피사체가 잘리면 `css/layout.css`의 `.hero-video`에서 `object-position` 조정.

## 버튼 URL 수정 방법

- 연결 주소는 `index.html`의 각 `<a class="cta-btn">` `href`와
  `js/config.js`의 `contents[].url` (숫자 키 1/2/3용) **두 곳**을 함께 수정합니다.
- 버튼 텍스트는 `index.html`의 `.cta-label`에서 수정합니다.

## PC 전용 정책

- 지원: Windows/macOS · Chrome/Edge 최신 · 1366×768 ~ 3840×2160 · 마우스/키보드/터치패드
- 1920×1080 논리 좌표계를 `transform: scale()`로 레터박스 피팅 — 요소 재배치(리플로우) 없음
- 모바일 UA, 가로 1024px 미만, 세로 화면 접근 시 PC 이용 안내 화면만 표시
- 모바일 미디어쿼리·터치 이벤트·모바일 UI 패턴은 의도적으로 구현하지 않음

## 발표(공유) 전 QA 체크리스트

- [ ] 1366×768 / 1920×1080 / 2560×1440 / 3840×2160 창 크기에서 잘림 없이 레터박스 표시
- [ ] 영상 자동 재생·무음·무한 반복
- [ ] WebM 재생 (개발자도구 Network에서 brand-city.webm 확인)
- [ ] 영상 파일 제거 시 Poster + Gradient 폴백 표시
- [ ] 다른 탭 이동 시 영상 일시정지, 복귀 시 재생
- [ ] 버튼 3개 순서·URL 정확, 새 탭 실행
- [ ] Hover 모션(-7px·확대·Green Border·Glow·화살표 이동) 동작
- [ ] Tab 포커스 표시, Enter/Space/1/2/3/F/ESC 동작
- [ ] Chrome 콘솔 Error 0건 · 외부 네트워크 요청 0건
