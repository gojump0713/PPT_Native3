# KNOWN_ISSUES.md

## K-01. 공식 TILON CI 미수령
- source 폴더에 CI 파일이 없어 임시 워드마크 SVG를 사용 중.
- 영향: 브랜드 정확도. 공식 CI(SVG/PNG) 수령 시 `assets/images/tilon-logo.svg` 교체 필요.

## K-02. Pretendard 폰트 미번들
- 외부 Font CDN 금지 정책 + 폰트 파일 미제공으로 시스템 폰트 스택으로 렌더링.
- 영향: Pretendard 미설치 PC에서는 맑은 고딕 등으로 표시되어 자간·굵기 인상이 다소 달라짐.
- 조치 예정: 라이선스 확인된 woff2 수령 시 `assets/fonts/` 번들 + `@font-face` 추가.

## K-03. WebM 용량 (21MB)
- VP9 CRF 33 기준 21MB. GitHub Pages 첫 로드 시 네트워크 속도에 따라 영상 시작까지 수 초 걸릴 수 있음.
- 완화: Poster WebP(305KB)가 먼저 표시되고 canplay 시점에 영상이 페이드 인하므로 빈 화면은 없음.
- 필요 시 CRF를 36~38로 올려 용량을 더 줄일 수 있음(화질 트레이드오프).

## K-04. file:// 직접 실행 시 backdrop-filter 제한 가능성
- 일부 환경에서 로컬 파일 직접 실행 시 GPU 가속이 제한되어 Glass blur가 약하게 보일 수 있음.
- 로컬 서버(`python -m http.server`) 실행을 권장. 미지원 환경은 fallback.css가 반투명 배경으로 대체.
