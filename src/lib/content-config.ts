import { prisma } from "./prisma";

// Maps the public collection names (used by the client) to their Prisma model
// and the fields that may be written through the content API. This is the
// single source of truth that replaces the former Firestore collections.
export const CONTENT = {
  blogs: {
    model: "blog",
    fields: ["title", "slug", "excerpt", "content", "image", "date", "href"],
  },
  projects: {
    model: "project",
    fields: ["title", "text", "image", "liveUrl", "clientUrl", "serverUrl"],
  },
  testimonials: {
    model: "testimonial",
    fields: ["quote", "name", "role"],
  },
  services: {
    model: "service",
    fields: ["title", "tags"],
  },
} as const;

export type CollectionName = keyof typeof CONTENT;

export function isCollection(name: string): name is CollectionName {
  return name in CONTENT;
}

/** The Prisma delegate (blog/project/…) for a collection. */
export function delegateFor(name: CollectionName) {
  // The model names are validated against CONTENT, so this index is safe.
  return prisma[CONTENT[name].model as keyof typeof prisma] as unknown as {
    findMany: (args: unknown) => Promise<Record<string, unknown>[]>;
    create: (args: unknown) => Promise<Record<string, unknown>>;
    update: (args: unknown) => Promise<Record<string, unknown>>;
    delete: (args: unknown) => Promise<Record<string, unknown>>;
  };
}

/** Keep only writable fields from an incoming request body. */
export function pickFields(
  name: CollectionName,
  body: Record<string, unknown>,
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const f of CONTENT[name].fields) {
    if (body[f] !== undefined) out[f] = body[f];
  }
  return out;
}

/** Serialize a row for the client: Date `createdAt` -> epoch milliseconds. */
export function serializeRow(row: Record<string, unknown>) {
  const createdAt = row.createdAt;
  return {
    ...row,
    createdAt:
      createdAt instanceof Date ? createdAt.getTime() : (createdAt ?? null),
  };
}
