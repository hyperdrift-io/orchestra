/** Canonical source: Hyperdrift packages/article-experience. Sync; do not edit app copies. */
export interface ArticleEntry { id: string; title: string; depth?: number }
export interface SourceNote { title: string; by: string; preview?: 'page' | 'pdf' | 'unavailable'; content?: string }
export interface ArticleLabels {
  contents: string; preview: string; close: string; openOriginal: string;
  frameHint: string; paragraphLink: string; sectionLink: string;
  copied: string; manualCopy: string; linkField: string;
}
export type AnchorOverrides = Record<string, string>;
interface MarkdownNode {
  type: string; value?: string; alt?: string; depth?: number;
  children?: MarkdownNode[]; data?: { hProperties?: Record<string, unknown> };
}
export function plainText(value: string): string {
  return value.replace(/!?\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/<[^>]+>/g, '').replace(/[*_`~]/g, '').replace(/\s+/g, ' ').trim();
}
export function headingId(text: string): string {
  return plainText(text).normalize('NFKD').replace(new RegExp('\\p{M}', 'gu'), '').toLowerCase().replace(new RegExp('[^\\p{L}\\p{N}]+', 'gu'), '-').replace(/^-|-$/g, '') || 'section';
}
function textHash(text: string): string {
  let hash = 2166136261;
  for (const char of plainText(text)) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
  return (hash >>> 0).toString(36);
}
/** Explicit overrides preserve published links when their own wording changes. */
export function createAnchorIds(overrides: AnchorOverrides = {}, reservedIds: string[] = []) {
  const used = new Map(reservedIds.map(id => [id, 1]));
  return (text: string, kind: 'heading' | 'paragraph', existing?: string): string => {
    const base = existing || overrides[plainText(text)] || (kind === 'heading' ? headingId(text) : `p-${textHash(text)}`);
    const count = (used.get(base) || 0) + 1;
    used.set(base, count);
    return count === 1 ? base : `${base}-${count}`;
  };
}
function nodeText(node: MarkdownNode): string {
  return node.value ?? node.alt ?? node.children?.map(nodeText).join('') ?? '';
}
/** Remark plugin: native, server-rendered fragment targets, including without JavaScript. */
export function remarkArticleAnchors({ overrides = {}, reservedIds = [] }: { overrides?: AnchorOverrides; reservedIds?: string[] } = {}) {
  return (tree: MarkdownNode) => {
    const idFor = createAnchorIds(overrides, reservedIds);
    const walk = (node: MarkdownNode, parent?: MarkdownNode) => {
      if (node.type === 'heading' || (node.type === 'paragraph' && parent?.type === 'root')) {
        const text = nodeText(node);
        if (text.trim() && !node.children?.every(child => child.type === 'image')) {
          const properties = node.data?.hProperties || {};
          node.data = { ...node.data, hProperties: { ...properties,
            id: idFor(text, node.type === 'heading' ? 'heading' : 'paragraph', typeof properties.id === 'string' ? properties.id : undefined),
            tabIndex: -1,
          } };
        }
      }
      node.children?.forEach(child => walk(child, node));
    };
    walk(tree);
  };
}
/** ATX/setext headings in the supported editorial Markdown; fenced examples are excluded. */
export function articleOutline(markdown: string, overrides: AnchorOverrides = {}, reservedIds: string[] = []): ArticleEntry[] {
  const idFor = createAnchorIds(overrides, reservedIds);
  const entries: ArticleEntry[] = [];
  let fence = '';
  const lines = markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '').split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const boundary = line.match(/^\s{0,3}(`{3,}|~{3,})/);
    if (boundary) { if (!fence) fence = boundary[1]; else if (boundary[1][0] === fence[0] && boundary[1].length >= fence.length) fence = ''; continue; }
    if (fence) continue;
    const heading = line.match(/^ {0,3}(#{1,6})\s+(.+?)\s*#*\s*$/);
    const setext = !heading && line.trim() && /^ {0,3}(?:=+|-+)\s*$/.test(lines[i + 1] || '');
    if (!heading && !setext) continue;
    const depth = heading ? heading[1].length : lines[++i].trim()[0] === '=' ? 1 : 2;
    const title = plainText(heading ? heading[2] : line);
    const id = idFor(title, 'heading');
    if (depth <= 3) entries.push({ id, title, depth: Math.max(2, depth) });
  }
  return entries;
}
export function articleLink(canonical: string, fragment?: string): string {
  const url = new URL(canonical);
  url.hash = fragment || '';
  return url.href;
}
