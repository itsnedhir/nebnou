import { defineDocumentType, makeSource } from "contentlayer2/source-files";

const commonFields = {
  title: { type: "string", required: true },
  date: { type: "date", required: true },
  tags: { type: "list", of: { type: "string" }, required: true },
  description: { type: "string", required: false },
} as const;

const slugField = (prefix: string) => ({
  slug: {
    type: "string" as const,
    resolve: (doc: { _raw: { flattenedPath: string } }) =>
      doc._raw.flattenedPath.replace(`${prefix}/`, ""),
  },
});

export const Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: "projects/**/*.mdx",
  contentType: "mdx",
  fields: {
    ...commonFields,
    status: {
      type: "enum",
      options: ["active", "shipped", "paused"],
      required: true,
    },
  },
  computedFields: slugField("projects"),
}));

export const Devlog = defineDocumentType(() => ({
  name: "Devlog",
  filePathPattern: "devlog/**/*.mdx",
  contentType: "mdx",
  fields: commonFields,
  computedFields: slugField("devlog"),
}));

export const Thought = defineDocumentType(() => ({
  name: "Thought",
  filePathPattern: "thoughts/**/*.mdx",
  contentType: "mdx",
  fields: commonFields,
  computedFields: slugField("thoughts"),
}));

export const Life = defineDocumentType(() => ({
  name: "Life",
  filePathPattern: "life/**/*.mdx",
  contentType: "mdx",
  fields: commonFields,
  computedFields: slugField("life"),
}));

export const Now = defineDocumentType(() => ({
  name: "Now",
  filePathPattern: "now/**/*.mdx",
  contentType: "mdx",
  fields: commonFields,
  computedFields: slugField("now"),
}));

export const About = defineDocumentType(() => ({
  name: "About",
  filePathPattern: "about/**/*.mdx",
  contentType: "mdx",
  fields: commonFields,
  computedFields: slugField("about"),
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Project, Devlog, Thought, Life, Now, About],
});
