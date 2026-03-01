// ==========================================================================
//  Times Tables Data for Programmatic SEO Pages
//  Generates 12 table pages at /times-tables/{n}/
//  + 144 fact pages at /times-tables/{a}-times-{b}/
//  Total: 156 pages
// ==========================================================================

export interface TimesTablePage {
  slug: string;           // "7"
  type: 'table';
  multiplier: number;
  products: { factor: number; result: number }[];
}

export interface TimesFactPage {
  slug: string;           // "6-times-7"
  type: 'fact';
  factorA: number;
  factorB: number;
  product: number;
  commutativeSlug: string;
  isCommutative: boolean; // true if A !== B
  divisionFacts: string[];
  relatedFacts: { slug: string; label: string }[];
}

export type TimesPage = TimesTablePage | TimesFactPage;

export function getAllTimesTablePages(): TimesTablePage[] {
  const pages: TimesTablePage[] = [];
  for (let m = 1; m <= 12; m++) {
    pages.push({
      slug: String(m),
      type: 'table',
      multiplier: m,
      products: Array.from({ length: 12 }, (_, i) => ({
        factor: i + 1,
        result: m * (i + 1),
      })),
    });
  }
  return pages;
}

export function getAllTimesFactPages(): TimesFactPage[] {
  const pages: TimesFactPage[] = [];
  for (let a = 1; a <= 12; a++) {
    for (let b = 1; b <= 12; b++) {
      const product = a * b;
      const related: { slug: string; label: string }[] = [];

      // Same row/column facts
      if (a > 1) related.push({ slug: `${a - 1}-times-${b}`, label: `${a - 1} × ${b} = ${(a - 1) * b}` });
      if (a < 12) related.push({ slug: `${a + 1}-times-${b}`, label: `${a + 1} × ${b} = ${(a + 1) * b}` });
      if (b > 1) related.push({ slug: `${a}-times-${b - 1}`, label: `${a} × ${b - 1} = ${a * (b - 1)}` });
      if (b < 12) related.push({ slug: `${a}-times-${b + 1}`, label: `${a} × ${b + 1} = ${a * (b + 1)}` });

      const divFacts: string[] = [];
      divFacts.push(`${product} ÷ ${a} = ${b}`);
      if (a !== b) divFacts.push(`${product} ÷ ${b} = ${a}`);

      pages.push({
        slug: `${a}-times-${b}`,
        type: 'fact',
        factorA: a,
        factorB: b,
        product,
        commutativeSlug: `${b}-times-${a}`,
        isCommutative: a !== b,
        divisionFacts: divFacts,
        relatedFacts: related,
      });
    }
  }
  return pages;
}

export function getAllTimesPages(): TimesPage[] {
  return [...getAllTimesTablePages(), ...getAllTimesFactPages()];
}

export function getTimesPageBySlug(slug: string): TimesPage | undefined {
  return getAllTimesPages().find((p) => p.slug === slug);
}
