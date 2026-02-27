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
];

export function getToolBySlug(slug: string): WebTool | undefined {
  return tools.find(t => t.slug === slug);
}
