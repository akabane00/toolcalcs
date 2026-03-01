// ==========================================================================
//  Powers / Exponents Data for Programmatic SEO Pages
//  Generates 60 pages at /math/{n}-squared/
//  + 25 pages at /math/{n}-cubed/
//  Total: 85 pages
// ==========================================================================

export interface PowerPage {
  slug: string;
  base: number;
  exponent: number;
  result: number;
  resultFormatted: string;
  isPerfectSquare: boolean;   // true if result is a perfect square
  isPerfectCube: boolean;     // true if result is a perfect cube
  squareRoot: number | null;  // sqrt of result, if perfect square
  cubeRoot: number | null;    // cbrt of result, if perfect cube
}

export function getAllSquaredPages(): PowerPage[] {
  const pages: PowerPage[] = [];
  for (let n = 1; n <= 100; n++) {
    const result = n * n;
    const cbrt = Math.round(Math.cbrt(result));
    pages.push({
      slug: String(n),
      base: n,
      exponent: 2,
      result,
      resultFormatted: result.toLocaleString('en-US'),
      isPerfectSquare: true, // n² is always a perfect square
      isPerfectCube: cbrt * cbrt * cbrt === result,
      squareRoot: n,
      cubeRoot: cbrt * cbrt * cbrt === result ? cbrt : null,
    });
  }
  return pages;
}

export function getAllCubedPages(): PowerPage[] {
  const pages: PowerPage[] = [];
  for (let n = 1; n <= 50; n++) {
    const result = n * n * n;
    const sqrt = Math.round(Math.sqrt(result));
    pages.push({
      slug: String(n),
      base: n,
      exponent: 3,
      result,
      resultFormatted: result.toLocaleString('en-US'),
      isPerfectSquare: sqrt * sqrt === result,
      isPerfectCube: true, // n³ is always a perfect cube
      squareRoot: sqrt * sqrt === result ? sqrt : null,
      cubeRoot: n,
    });
  }
  return pages;
}

export function getAllFourthPowerPages(): PowerPage[] {
  const pages: PowerPage[] = [];
  for (let n = 1; n <= 25; n++) {
    const result = n * n * n * n;
    const sqrt = Math.round(Math.sqrt(result));
    const cbrt = Math.round(Math.cbrt(result));
    pages.push({
      slug: String(n),
      base: n,
      exponent: 4,
      result,
      resultFormatted: result.toLocaleString('en-US'),
      isPerfectSquare: sqrt * sqrt === result,
      isPerfectCube: cbrt * cbrt * cbrt === result,
      squareRoot: sqrt * sqrt === result ? sqrt : null,
      cubeRoot: cbrt * cbrt * cbrt === result ? cbrt : null,
    });
  }
  return pages;
}

export function getSquaredBySlug(slug: string): PowerPage | undefined {
  return getAllSquaredPages().find((p) => p.slug === slug);
}

export function getCubedBySlug(slug: string): PowerPage | undefined {
  return getAllCubedPages().find((p) => p.slug === slug);
}

export function getFourthPowerBySlug(slug: string): PowerPage | undefined {
  return getAllFourthPowerPages().find((p) => p.slug === slug);
}
