export interface WebTool {
  title: string;
  slug: string;
  description: string;
  icon: string;
}

export const tools: WebTool[] = [
  {
    title: 'JSON Formatter',
    slug: 'json-formatter',
    description: 'Format, validate, and minify JSON data. Paste your JSON to beautify or compress it instantly.',
    icon: '{ }',
  },
  {
    title: 'Password Generator',
    slug: 'password-generator',
    description: 'Generate strong, secure random passwords. Customize length, character types, and strength.',
    icon: '🔐',
  },
  {
    title: 'Text Case Converter',
    slug: 'text-case-converter',
    description: 'Convert text between uppercase, lowercase, title case, sentence case, camelCase, and more.',
    icon: 'Aa',
  },
  {
    title: 'Base64 Encoder/Decoder',
    slug: 'base64-encoder-decoder',
    description: 'Encode text to Base64 or decode Base64 strings back to plain text. Fast and secure.',
    icon: '🔣',
  },
  {
    title: 'Color Converter',
    slug: 'color-converter',
    description: 'Convert colors between HEX, RGB, and HSL formats with a live color preview.',
    icon: '🎨',
  },
  {
    title: 'Lorem Ipsum Generator',
    slug: 'lorem-ipsum-generator',
    description: 'Generate placeholder text for design and development. Choose paragraphs, sentences, or words.',
    icon: '📄',
  },
  {
    title: 'Hash Generator',
    slug: 'hash-generator',
    description: 'Generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes from any text input instantly.',
    icon: '#️⃣',
  },
  {
    title: 'Regex Tester',
    slug: 'regex-tester',
    description: 'Test and debug regular expressions in real time. See matches highlighted with capture group details.',
    icon: '🔍',
  },
  {
    title: 'QR Code Generator',
    slug: 'qr-code-generator',
    description: 'Generate QR codes for URLs, text, and more. Download as PNG with customizable size and colors.',
    icon: '📱',
  },
  {
    title: 'Image Compressor',
    slug: 'image-compressor',
    description: 'Compress and resize images in your browser. Reduce file size while maintaining quality. No upload needed.',
    icon: '🖼️',
  },
  {
    title: 'Word Counter',
    slug: 'word-counter',
    description: 'Count words, characters, sentences, and paragraphs in your text instantly. See reading time and keyword density.',
    icon: '📝',
  },
  {
    title: 'Random Number Generator',
    slug: 'random-number-generator',
    description: 'Generate random numbers, pick from ranges, roll dice, or shuffle lists. Cryptographically secure randomness.',
    icon: '🎲',
  },
  {
    title: 'Pomodoro Timer',
    slug: 'pomodoro-timer',
    description: 'Focus timer using the Pomodoro Technique. Work 25 min, break 5 min. Track your productivity sessions.',
    icon: '🍅',
  },
  {
    title: 'URL Encoder/Decoder',
    slug: 'url-encoder-decoder',
    description: 'Encode or decode URL components. Handle special characters for safe URLs. Supports full Unicode.',
    icon: '🔗',
  },
  {
    title: 'UUID Generator',
    slug: 'uuid-generator',
    description: 'Generate UUID v4 identifiers. Create single or bulk unique IDs instantly with copy support.',
    icon: '🆔',
  },
  {
    title: 'Unix Timestamp Converter',
    slug: 'unix-timestamp-converter',
    description: 'Convert between Unix timestamps and human-readable dates. Live clock with seconds and milliseconds.',
    icon: '🕐',
  },
  {
    title: 'JWT Decoder',
    slug: 'jwt-decoder',
    description: 'Decode and inspect JSON Web Tokens. View header, payload, expiration status, and claim details.',
    icon: '🔓',
  },
  {
    title: 'Diff Checker',
    slug: 'diff-checker',
    description: 'Compare two texts side by side and highlight the differences line by line. See additions, deletions, and changes.',
    icon: '🔀',
  },
  {
    title: 'Markdown Preview',
    slug: 'markdown-preview',
    description: 'Write Markdown and see the rendered HTML preview in real time. Supports headings, lists, code, tables, and more.',
    icon: '📑',
  },
  {
    title: 'CSS Minifier',
    slug: 'css-minifier',
    description: 'Minify CSS code by removing whitespace, comments, and redundant rules. See compression ratio instantly.',
    icon: '🎯',
  },
  {
    title: 'JavaScript Minifier',
    slug: 'javascript-minifier',
    description: 'Minify JavaScript by removing whitespace, comments, and unnecessary characters. Compare file sizes.',
    icon: '⚡',
  },
  {
    title: 'HTML Entity Encoder/Decoder',
    slug: 'html-entity-encoder',
    description: 'Encode special characters to HTML entities or decode them back to text. Supports named and numeric references.',
    icon: '🏷️',
  },
  {
    title: 'Cron Expression Generator',
    slug: 'cron-expression-generator',
    description: 'Build and validate cron expressions with a visual editor. See human-readable descriptions and next run times.',
    icon: '⏰',
  },
  {
    title: 'Slug Generator',
    slug: 'slug-generator',
    description: 'Convert text to URL-friendly slugs. Remove accents, special characters, and spaces automatically.',
    icon: '🔤',
  },
  {
    title: 'Meta Tag Generator',
    slug: 'meta-tag-generator',
    description: 'Generate HTML meta tags for SEO, Open Graph, and Twitter Cards. Preview how your page looks in search results.',
    icon: '🏗️',
  },
];

export function getToolBySlug(slug: string): WebTool | undefined {
  return tools.find(t => t.slug === slug);
}
