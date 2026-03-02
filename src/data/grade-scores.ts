// ==========================================================================
//  Grade/Score Data for Programmatic SEO Pages
//  Generates ~1,080 pages at /grade/{score}-out-of-{total}/
// ==========================================================================

export interface GradeScorePage {
  slug: string;         // "18-out-of-20"
  score: number;        // 18
  total: number;        // 20
  percentage: number;   // 90
  percentStr: string;   // "90%"
  letterGrade: string;  // "A-"
  gpa: string;          // "3.7"
  passFail: string;     // "Pass"
}

export const GRADE_TOTALS = [5, 8, 10, 12, 15, 20, 25, 30, 35, 40, 45, 50, 60, 75, 80, 100, 120, 150, 200];

const letterGradeScale = [
  { min: 97, grade: 'A+', gpa: '4.0' },
  { min: 93, grade: 'A',  gpa: '4.0' },
  { min: 90, grade: 'A-', gpa: '3.7' },
  { min: 87, grade: 'B+', gpa: '3.3' },
  { min: 83, grade: 'B',  gpa: '3.0' },
  { min: 80, grade: 'B-', gpa: '2.7' },
  { min: 77, grade: 'C+', gpa: '2.3' },
  { min: 73, grade: 'C',  gpa: '2.0' },
  { min: 70, grade: 'C-', gpa: '1.7' },
  { min: 67, grade: 'D+', gpa: '1.3' },
  { min: 63, grade: 'D',  gpa: '1.0' },
  { min: 60, grade: 'D-', gpa: '0.7' },
  { min: 0,  grade: 'F',  gpa: '0.0' },
];

function getLetterGrade(pct: number): { grade: string; gpa: string } {
  for (const entry of letterGradeScale) {
    if (pct >= entry.min) return entry;
  }
  return { grade: 'F', gpa: '0.0' };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

let _cache: GradeScorePage[] | null = null;

export function getAllGradeScorePages(): GradeScorePage[] {
  if (_cache) return _cache;
  const pages: GradeScorePage[] = [];
  for (const total of GRADE_TOTALS) {
    for (var score = 1; score <= total; score++) {
      const pct = round2((score / total) * 100);
      const { grade, gpa } = getLetterGrade(pct);
      pages.push({
        slug: `${score}-out-of-${total}`,
        score,
        total,
        percentage: pct,
        percentStr: pct % 1 === 0 ? `${pct}%` : `${pct.toFixed(2)}%`,
        letterGrade: grade,
        gpa,
        passFail: pct >= 60 ? 'Pass' : 'Fail',
      });
    }
  }
  _cache = pages;
  return pages;
}

export function getGradeScoreBySlug(slug: string): GradeScorePage | undefined {
  return getAllGradeScorePages().find(p => p.slug === slug);
}
