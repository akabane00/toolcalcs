#!/bin/bash
# Post-build safety checks — prevents accidental SEO damage
# Run after `npm run build` to verify critical SEO invariants

set -e
DIST="dist"
ERRORS=0

echo "=== Post-Build SEO Safety Check ==="

# 1. Count noindex pages (should be minimal — only 404, zodiac/*, angel-number/*)
NOINDEX_COUNT=$(grep -rl 'noindex' "$DIST" --include="*.html" | wc -l)
NOINDEX_LIMIT=650  # ~12 zodiac + ~600 angel-number + 404 + small buffer

echo "[1] noindex pages: $NOINDEX_COUNT (limit: $NOINDEX_LIMIT)"
if [ "$NOINDEX_COUNT" -gt "$NOINDEX_LIMIT" ]; then
  echo "  FAIL: Too many noindex pages! Check for accidental noindex."
  grep -rl 'noindex' "$DIST" --include="*.html" | head -20
  ERRORS=$((ERRORS + 1))
fi

# 2. Check total page count (should be 14,000+)
PAGE_COUNT=$(find "$DIST" -name "*.html" | wc -l)
echo "[2] Total HTML pages: $PAGE_COUNT"
if [ "$PAGE_COUNT" -lt 14000 ]; then
  echo "  FAIL: Page count dropped below 14,000. Missing pages?"
  ERRORS=$((ERRORS + 1))
fi

# 3. Check dist file count (Cloudflare 20,000 limit)
FILE_COUNT=$(find "$DIST" -type f | wc -l)
echo "[3] Total dist files: $FILE_COUNT (limit: 20,000)"
if [ "$FILE_COUNT" -gt 19500 ]; then
  echo "  WARN: Approaching Cloudflare 20,000 file limit!"
  ERRORS=$((ERRORS + 1))
fi

# 4. Verify sitemap exists and has entries
if [ -f "$DIST/sitemap-index.xml" ]; then
  SITEMAP_REFS=$(grep -c 'sitemap' "$DIST/sitemap-index.xml" || true)
  echo "[4] Sitemap index exists with $SITEMAP_REFS references"
else
  echo "  FAIL: sitemap-index.xml missing!"
  ERRORS=$((ERRORS + 1))
fi

# 5. Verify robots.txt exists and doesn't block everything
if [ -f "$DIST/robots.txt" ]; then
  if grep -qP "^Disallow: /\s*$" "$DIST/robots.txt"; then
    echo "  FAIL: robots.txt blocks entire site!"
    ERRORS=$((ERRORS + 1))
  else
    echo "[5] robots.txt OK"
  fi
else
  echo "  FAIL: robots.txt missing!"
  ERRORS=$((ERRORS + 1))
fi

# 6. Verify key pages exist
KEY_PAGES=("index.html" "about/index.html" "financial-calculators/index.html" "health-calculators/index.html" "worksheets/index.html" "test/index.html" "tools/index.html" "blog/index.html")
MISSING=0
for page in "${KEY_PAGES[@]}"; do
  if [ ! -f "$DIST/$page" ]; then
    echo "  FAIL: Missing key page: $page"
    MISSING=$((MISSING + 1))
  fi
done
echo "[6] Key pages: $((${#KEY_PAGES[@]} - MISSING))/${#KEY_PAGES[@]} present"
if [ "$MISSING" -gt 0 ]; then
  ERRORS=$((ERRORS + MISSING))
fi

# Summary
echo ""
if [ "$ERRORS" -gt 0 ]; then
  echo "FAILED: $ERRORS issue(s) found. Review before deploying."
  exit 1
else
  echo "PASSED: All checks OK."
fi
