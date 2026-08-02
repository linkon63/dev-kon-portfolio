/**
 * Blog content helpers.
 *
 * Historically a blog's `content` column stored a JSON-stringified array of
 * sections (`[{ id, heading, image, text }]`). The Medium-style editor stores
 * the whole post as a single HTML string instead. These helpers bridge the two:
 * legacy posts are converted to HTML when opened in the editor, and the public
 * renderer keeps understanding both shapes.
 */

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

type LegacySection = {
  id?: string;
  heading?: string;
  image?: string;
  text?: string;
};

/**
 * Normalise stored `content` into a single HTML string suitable for the
 * WYSIWYG editor. Content that is already HTML is returned untouched; a legacy
 * JSON sections array is flattened into `<h2>` / `<img>` / rich-text blocks.
 */
export function contentToHtml(content: string | null | undefined): string {
  const raw = (content || "").trim();
  if (!raw) return "";
  if (!raw.startsWith("[")) return raw; // already HTML (or legacy plain text)

  try {
    const sections = JSON.parse(raw) as LegacySection[];
    if (!Array.isArray(sections)) return raw;
    return sections
      .map((s) => {
        const parts: string[] = [];
        if (s.heading?.trim()) parts.push(`<h2>${escapeHtml(s.heading)}</h2>`);
        if (s.image?.trim())
          parts.push(`<img src="${escapeHtml(s.image)}" alt="" />`);
        if (s.text?.trim()) parts.push(s.text);
        return parts.join("");
      })
      .join("");
  } catch {
    return raw;
  }
}

/** Strip HTML tags to plain text (reading-time estimates, excerpts, etc.). */
export function stripHtml(html: string | null | undefined): string {
  return (html || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

/** Word count of an HTML body, used for reading-time estimates. */
export function wordCount(html: string | null | undefined): number {
  const text = stripHtml(html);
  return text ? text.split(/\s+/).filter(Boolean).length : 0;
}
