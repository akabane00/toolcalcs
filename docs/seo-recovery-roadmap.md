# toolcalcs.com 색인 회복 마스터플랜

> **미션**: 사이트 노출 정상화 = 색인 회복. 콘텐츠는 충분하므로 신규 콘텐츠 생산 중지.
> **운영 모델**: Claude Code가 직접 운영. 사용자는 검토자/결정자.
> **현재 baseline (2026-05-15)**: 28일 클릭 **2회**, sitemap 688제출/0색인, 모든 hub `Crawled - currently not indexed`.

---

## 1. 진단 요약

### 무엇이 정상인가
- 기술 SEO: robots/meta/canonical/redirect 모두 깨끗
- 사이트맵 + 우선순위/lastmod 정상 작동
- 301 redirect 매핑 30+ 개 정리됨
- 사이트 규모: 549+ 실제 색인 대상 페이지 (157 calc + 225 blog + 98 worksheet + 26 tool + 43 test)
- 인프라: Astro 정적 빌드 + Cloudflare Pages = 캐시/속도 최적

### 무엇이 문제인가
모든 카테고리 hub와 flagship 계산기, 블로그가 동일한 패턴 — `INDEXING_ALLOWED` + `robots ALLOWED` + `fetch SUCCESSFUL` + `userCanonical === googleCanonical` + 풍부한 구조화 데이터인데도 **수동으로 색인 거부**.

→ **단일 페이지 문제가 아니라 도메인 차원의 신뢰도 평가 결과**.

Google이 무엇을 보고 평가 절하 중인지 후보:
- 도메인 권위 부족 (백링크, 브랜드 검색, 외부 언급 부족)
- 사용자 신호 부재 (CTR/체류시간/return visits 데이터 부족 — 트래픽이 거의 없으므로)
- 사이트 응집성 신호 약함 (내부 링크 hub-spoke 구조, 주제 클러스터링)
- E-E-A-T 누적 부족 (운영자 신호, 외부 출처 인용, 갱신 빈도)
- 과거 노이즈 잔재 (이전 AI 패턴 흔적이 도메인 트러스트 점수에 남음)
- Core Web Vitals 측정 안 됨 (실 사용자 데이터 없음)

---

## 2. 4주 마스터플랜

각 Phase는 가설 + 자동화 행동 + 측정 가능한 KPI로 구성. Claude가 자율 수행 가능한 작업과 사용자 결정 필요 작업을 구분.

### Phase 3 — 색인 1차 부활 캠페인 (Week 1)

**가설**: 200/day Indexing API quota를 체계적으로 활용하면 일부 페이지는 신호만으로 색인됨. 효력의 임계점이 어디인지 데이터로 측정.

**자동화 작업** (Claude):
- [ ] `/about/` 강화본 main 머지 + 배포 ⚠️ 사용자 결정
- [ ] Task Scheduler `ToolCalcs-Daily-Reindex` 09:00 등록 (배포 후)
- [ ] 일일 캠페인 로그 자동 수집 (logs/seo/reindex-*.json)
- [ ] 주간 색인 상태 변화 자동 리포트 작성

**우선순위 큐 설계**:
```
P1 — 매일 (20 URLs/day):   홈 + 15 카테고리 hub + blog/worksheets/tools/test 인덱스
P2 — 매일 (40 URLs/day):   상위 40 flagship 계산기 (impression 기준)
P3 — 매일 (50 URLs/day):   상위 50 블로그 (impression 기준)
P4 — 매일 (90 URLs/day):   sitemap 회전 (offset 매일 +90)
                          ─────────
                          200 URLs/day = quota 한도
```

**KPI (1주 후 측정)**:
| 지표 | 현재 | 1주 목표 | 측정 방법 |
|---|---:|---:|---|
| Sitemap indexed 수 | 0 | ≥ 20 | GSC API sitemaps.list |
| `Crawled - not indexed` → `Indexed` 전환 | - | ≥ 10페이지 | URL Inspection 일일 비교 |
| 28일 노출 | 417 | ≥ 600 | gsc-fetch 일일 |
| 28일 클릭 | 2 | ≥ 10 | gsc-fetch 일일 |

**자동 리포트**: 매주 월요일 09:30 Task Scheduler가 `scripts/seo/weekly-report.js` 실행 → logs/seo/weekly-YYYY-Www.md 생성.

### Phase 4 — Core Web Vitals + 모바일 진단 (Week 1 후반, 3일)

**가설**: PSI 점수가 낮으면 모바일-우선 인덱스에서 신뢰도 감점. Cloudflare Pages는 일반적으로 좋은 점수이지만 검증 필요.

**자동화 작업**:
- [ ] `scripts/seo/cwv-fetch.js` 작성 — PageSpeed Insights API (무료, 키 불필요)
- [ ] sample 20 페이지 모바일/데스크 점수 자동 수집
- [ ] CrUX 데이터 (실 사용자 메트릭) 확인 — 데이터 있으면 활용
- [ ] LCP > 4s, CLS > 0.25, FID > 300ms 페이지 자동 식별
- [ ] critical 이슈만 자동 수정 (예: 이미지 크기 누락, 폰트 preload)

**KPI**:
- 95% 페이지 PSI 모바일 ≥ 90
- LCP 평균 < 2.5s
- CLS 평균 < 0.1

### Phase 5 — 내부 링크 그래프 진단 + 보강 (Week 2)

**가설**: Google이 사이트를 "주제 응집된 권위 사이트"로 인식하려면 hub-spoke 내부 링크가 견고해야 함. 고아 페이지가 많으면 도메인 평가 하락.

**자동화 작업**:
- [ ] `scripts/seo/link-graph.js` 작성 — 모든 `.astro`/HTML 파싱
  - 출력: 내부 링크 그래프 (node = URL, edge = link)
  - 식별: 고아 페이지 (incoming = 0), dead-end (outgoing = 0), 약한 클러스터
- [ ] 카테고리 hub → 자식 계산기 링크 누락 자동 검출
- [ ] 계산기 ↔ 관련 블로그 cross-link 누락 자동 검출
- [ ] 자동 보강 PR 제안 (사용자 검토 후 머지)

**KPI**:
- 고아 페이지 수 (목표: 0)
- 카테고리 hub → 각 자식에 incoming link ≥ 1 (100% 커버)
- 평균 내부 incoming link per page ≥ 3
- 블로그 → 관련 계산기 링크 평균 ≥ 2

### Phase 6 — 외부 트래픽 + 사용자 신호 가속 (Week 2~3, 계속)

**가설**: 실 사용자 신호 (CTR, 체류시간, return visits)가 도메인 트러스트의 핵심 입력. Pinterest/외부 채널로 트래픽 가속.

**자동화 작업**:
- [ ] 기존 `pinterest-phase2.md` 전략 자동화 검토
- [ ] Pinterest API로 자동 핀 생성/게시 가능 여부 조사
- [ ] 카테고리별 핀 템플릿 (canvas-design skill) 자동 생성
- [ ] 자동 게시 스케줄 Task Scheduler 등록

**KPI**:
- 외부 referral 클릭 수 (현재 측정 안 됨)
- Pinterest impression/click (Pinterest Analytics)
- Direct + organic + referral 비율 변화

### Phase 7 — 저품질 페이지 정리 (Week 3, 결단 필요)

**가설**: 도메인 평균 품질 ↑ = 색인율 ↑. 36+ programmatic prefix가 noindex 상태이지만 그 페이지들의 존재 자체가 사이트 "총 가치"를 희석시킬 수 있음.

**자동화 작업** (진단):
- [ ] `scripts/seo/programmatic-audit.js` 작성
- [ ] 각 36 prefix별 GSC 노출/클릭 수집
- [ ] 90일 클릭 0건, 노출 < 5인 prefix 식별
- [ ] 후보 prefix별 페이지 수 + URL 패턴 정리

**자동화 작업** (실행 ⚠️ 사용자 결정 필요):
- [ ] 폐기 후보 prefix를 .htaccess 410 처리 or robots.txt Disallow
- [ ] sitemap에서 완전 제외 보장 (이미 그런 상태)
- [ ] 내부 링크에서 폐기 prefix 모두 제거 (검색하면 자동 가능)

**KPI**:
- 6,191 빌드 페이지 중 noindex 페이지 비율 ↓
- 도메인 indexed 비율 (indexed / submitted) ↑

---

## 3. Week 1 실행 가능한 자동화 작업 (즉시 시작)

### 작업 A: Indexing API 캠페인 자동화 (Day 1~7)
**자율성**: 100% Claude  
**전제**: /about/ 머지 + 배포 완료 → 사용자 결정 필요
- 일일 Task Scheduler 등록
- 200 URL/day 자동 처리
- 우선순위 큐 4-tier 구현 (P1~P4)
- 주간 자동 리포트
- 7일 후 효력 검증

### 작업 B: CWV 자동 측정 (Day 2)
**자율성**: 100% Claude  
**전제**: 없음
- `scripts/seo/cwv-fetch.js` 작성
- 20 sample 페이지 일일 측정
- 기준 미달 페이지 자동 식별
- 일일 로그 + 주간 트렌드

### 작업 C: 내부 링크 그래프 분석 (Day 3)
**자율성**: 진단 100% Claude, 보강은 사용자 검토 후  
**전제**: 없음
- `scripts/seo/link-graph.js` 작성
- 고아 페이지 / dead-end 식별
- 보강 후보 자동 제안
- 카테고리 hub-spoke 누락 자동 보강 PR

### 작업 D: Programmatic 페이지 트래픽 진단 (Day 4)
**자율성**: 진단 100% Claude, 폐기는 사용자 결정  
**전제**: 없음
- `scripts/seo/programmatic-audit.js` 작성
- 36 prefix별 GSC 노출/클릭 수집
- 0 트래픽 prefix 폐기 후보 정리
- 사용자 결정용 보고서 출력

### 작업 E: 주간 자동 리포트 시스템 (Day 5)
**자율성**: 100% Claude  
**전제**: A~D 완료
- `scripts/seo/weekly-report.js` 작성
- 매주 월요일 09:30 자동 실행
- Output: logs/seo/weekly-YYYY-Www.md
  - 색인 상태 변화 (전주 대비)
  - 노출/클릭/CTR/순위 변화
  - Indexing API quota 사용 효율
  - CWV 트렌드
  - 새로 발견된 이슈
- README에 자동 링크

---

## 4. 자율성 매트릭스

| 영역 | Claude 자율 | 사용자 결정 필요 |
|---|---|---|
| Indexing API 호출 | ✅ 모든 호출 | - |
| GSC 데이터 수집/분석 | ✅ 모든 query | - |
| 진단 스크립트 작성/실행 | ✅ 자유 | - |
| 빌드/로컬 검증 | ✅ 자유 | - |
| 코드 작성 (스크립트, 컴포넌트) | ✅ 자유 | - |
| /about/ 같은 단일 페이지 강화 | ✅ 자유 | - |
| 내부 링크 자동 보강 | ⚠️ PR로 제안 | 머지 결정 |
| 새 콘텐츠 발행 | ❌ STOP (사용자 지시) | - |
| 페이지 영구 삭제 | ❌ | 결정 필요 |
| robots.txt 수정 | ⚠️ PR로 제안 | 머지 결정 |
| git commit | ✅ worktree 안에서 자유 | main 머지는 사용자 |
| git push to main | ❌ | 사용자만 |
| Cloudflare Pages 배포 트리거 | ❌ (push가 트리거) | 사용자 push |
| Pinterest 자동 게시 | ⚠️ 조사 후 결정 | API 키 필요 |
| 외부 도메인 백링크 작업 | ❌ | 사용자 직접 |

---

## 5. 측정 + 알림 시스템

### 일일 (자동, Task Scheduler 09:00)
- `npm run seo:reindex` — 200 URLs Indexing API
- 로그: `logs/seo/reindex-YYYY-MM-DD.json`
- 변화 큼 (≥10페이지 상태 전환)이면 사용자에게 알림 메모

### 주간 (자동, Task Scheduler 월 09:30)
- `npm run seo:fetch` — 28일 GSC Performance
- `npm run seo:report` — 종합 리포트
- 출력: `logs/seo/weekly-YYYY-Www.md`
- 핵심 변화 (예: 첫 indexed 페이지 + 후속 indexed 가속) 시 사용자 알림

### 월간 (자동, 매월 1일 09:30)
- 카테고리별 indexed 비율
- "Crawled - not indexed" 잔여 페이지 분포
- CWV 트렌드
- Phase 진행 상황

---

## 6. 사용자 결정이 필요한 즉시 사항

다음 세션 시작 시 결정 받을 사항:

### A. /about/ 강화본 배포
- 옵션 1: commit + main 머지 + push (자동 Cloudflare 배포)
- 옵션 2: PR 생성 후 리뷰
- 옵션 3: 다른 작업 묶어서 일괄 머지

### B. Task Scheduler 자율 등록 권한
- 매일 09:00 자동 실행을 Claude가 schtasks로 등록해도 되는지
- 또는 사용자가 직접 등록

### C. Cloudflare Pages 빌드 트리거
- 현재 main push가 자동 배포 트리거인지 확인 필요
- 아니면 별도 수동 트리거 필요

### D. Pinterest 자동화 범위
- Pinterest API 키 발급/위임 가능한지
- 아니면 사용자가 수동 운영 유지

### E. Programmatic prefix 폐기 결정 범위
- 0 트래픽 prefix를 Claude가 자동 폐기해도 되는지
- 사용자 일일 검토 후 결단

---

## 6.4. /born-in/ noindex 전환 실험 (2026-05-17 시작)

GSC 90일 audit (logs/seo/programmatic-audit-2026-05-15.json) 데이터 기반의 8개 high-traffic noindex prefix 중 **TOP 1: `/born-in/`** 단독 전환. May 1 commit `200c741`의 4개 일괄 전환 패턴 연장.

**왜 단독 시작**:
- `/born-in/` 단독 90일 28,595 imp / 69 click / avg pos 7.4 — 나머지 7개 합친 것의 ~2배
- 5/1 batch 효력이 GSC에 아직 명확히 안 나타남 (사이트 전체 0/688 indexed). 추가로 한꺼번에 풀면 신호 섞임 → 분리 측정 불가
- 102개 페이지로 적절한 실험 크기

**Day 7 체크포인트 (~2026-05-24)** — `npm run seo:efficacy -- --days=7`:
- ≥50% pages indexed → TOP 5 (`/fraction/`, `/salary/`, `/percentage/`, `/tip/`) 확장 GO
- 10~50% indexed → 1주 추가 관찰 (5/31)
- &lt;10% indexed → /born-in/ 전환 효과 없음, 다른 회복 전략으로 pivot
- 도메인 평균 품질 신호 하락 (사이트 전체 indexed 비율 ↓) → 즉시 롤백

**롤백 절차**:
1. astro.config.mjs programmaticPrefixes 배열에 `/born-in/` 다시 추가
2. src/pages/born-in/[slug].astro에 `noindex={true}` 부활
3. src/pages/born-in/index.astro에 cross-canonical 부활
4. 빌드 + 배포

---

## 6.5. AdSense 적용 절차 (사이트 정상화 후)

**현재 상태 (2026-05-17)**: AdSense **미승인**. 자동 광고(Auto Ads) 계획.

사이트에 남아 있는 AdSense 관련 코드:

| 위치 | 내용 | 상태 |
|---|---|---|
| `BaseLayout.astro` | `<meta name="google-adsense-account" content="ca-pub-1658942662433818">` | ✅ 그대로 유지 (승인 신청 시 사이트 검증에 필요) |
| `public/ads.txt` | `google.com, pub-1658942662433818, DIRECT, ...` | ✅ 그대로 유지 (AdSense 필수) |
| `BaseLayout.astro` `<script>` | `adsbygoogle.js` 로드 | ⏸ **주석 처리됨** — 승인 신청 시 부활 |
| `src/components/AdUnit.astro` | `isAdSenseActive = false` | ⏸ no-op 상태. 250+ 페이지에서 사용 중이지만 렌더 안 함 |

**왜 스크립트를 비활성화했나**:
- 광고 슬롯이 없는 상태에서 `adsbygoogle.js`를 로드해도 광고가 표시되지 않음
- TBT(Total Blocking Time) 신호에 노이즈만 추가
- 자동 광고 계획이라 manual ad slot은 어차피 불필요

### 승인 신청 시점 체크리스트

사이트 normalization (28일 클릭 100+, 사이트맵 indexed 비율 5%+ 정도)이 확인되면:

1. **BaseLayout.astro 스크립트 재활성화**
   - `// AdSense — disabled until approval` 블록의 주석 제거
   - 그대로 `loadAdSense()` 함수와 user-interaction listeners를 부활
   - PSI 점수 hit 감수 (대신 AdSense 크롤러가 스크립트 감지 가능)
2. **빌드 + 배포** (`npm run build`, commit + push → Cloudflare 자동 배포)
3. **AdSense 신청**: https://www.google.com/adsense/start/ → toolcalcs.com 등록
4. **사이트 검증 대기** (며칠~몇 주)
5. **승인 후**:
   - AdSense 대시보드에서 **"자동 광고"** 활성화
   - 자동 광고는 manual `<AdUnit>` 슬롯 없이 Google이 페이지 분석해 자동 배치
   - 옵션: manual placement도 원하면 `AdUnit.astro`의 `isAdSenseActive = true`로 변경

### 자동 광고 vs Manual 슬롯 비교

| 옵션 | 장점 | 단점 |
|---|---|---|
| **자동 광고** (계획) | 코드 변경 없음, Google이 최적 위치 자동 결정, 운영 부담 0 | 광고 위치 제어 약함 |
| Manual `<AdUnit>` 슬롯 | 위치 정확히 제어, RPM 최적화 가능 | 250+ 페이지에 slot ID 입력 필요, 운영 부담 |
| 두 가지 병행 | 위 두 가지 동시 효과 | 가장 복잡 |

운영자 메모: **자동 광고 단독 사용 권장** — 운영 부담 0, 사용자 명시 계획 일치.

---

## 7. 이번 세션까지 완성된 자산

### 코드 (worktree 안, uncommitted)
- [scripts/seo/gsc-batch-reindex.js](../scripts/seo/gsc-batch-reindex.js)
- [scripts/seo/gsc-fetch.js](../scripts/seo/gsc-fetch.js)
- [scripts/seo/diagnose-not-indexed.js](../scripts/seo/diagnose-not-indexed.js)
- [data/reindex-queue.example.txt](../data/reindex-queue.example.txt)
- [package.json](../package.json) — `seo:reindex`, `seo:fetch` scripts
- [src/pages/about.astro](../src/pages/about.astro) — 1,721 단어 강화본

### 인프라
- ✅ GSC `toolcalcs.com` 속성에 service account 소유자 권한 (Chrome MCP로 추가됨)
- ✅ Indexing API 활성화 확인 (river-overview-384807)
- ✅ Smoke test 통과 (1112 URLs sitemap, 5 inspections 정상)

### 데이터
- [logs/seo/reindex-2026-05-15.json](../logs/seo/reindex-2026-05-15.json) — 최초 inspect 결과
- [logs/seo/gsc-fetch-2026-05-15.json](../logs/seo/gsc-fetch-2026-05-15.json) — 28일 baseline
- [logs/seo/diagnose-2026-05-15.json](../logs/seo/diagnose-2026-05-15.json) — 10 URL 깊이 진단

---

## 8. 다음 세션 시작 프롬프트 양식

> toolcalcs 색인 회복 마스터플랜 진행. [`docs/seo-recovery-roadmap.md`](docs/seo-recovery-roadmap.md) 참조.
> 
> 현재 위치: Week 1 — Phase 3 (Indexing API 캠페인) 시작 직전.
> 
> 결정 필요:
> 1. /about/ 강화본 배포 방식 (commit + 머지 + push, 또는 PR)
> 2. Task Scheduler 등록 권한 위임 여부
> 3. 작업 B (CWV), C (link graph), D (programmatic audit) 동시 시작 여부
> 
> 결정되면 즉시 Week 1 시작.

---

**마지막 갱신**: 2026-05-15  
**작성자**: Claude Code (toolcalcs 운영 위임 세션)  
**다음 갱신 예정**: Week 1 종료 (2026-05-22)
