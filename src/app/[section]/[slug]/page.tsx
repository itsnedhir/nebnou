import { notFound } from "next/navigation";
import Link from "next/link";
import {
  allProjects,
  allDevlogs,
  allThoughts,
  allLives,
  allNows,
  allAbouts,
} from "contentlayer/generated";
import MDXContent from "@/components/MDXContent";

// Minimal shape shared by all document types
type DocBase = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  description?: string;
  body: { code: string };
};

const COLLECTIONS: Record<string, DocBase[]> = {
  projects: allProjects as unknown as DocBase[],
  devlog: allDevlogs as unknown as DocBase[],
  thoughts: allThoughts as unknown as DocBase[],
  life: allLives as unknown as DocBase[],
  now: allNows as unknown as DocBase[],
  about: allAbouts as unknown as DocBase[],
};

function findDoc(section: string, slug: string): DocBase | undefined {
  return COLLECTIONS[section]?.find((d) => d.slug === slug);
}

export function generateStaticParams() {
  return [
    ...allProjects.map((d) => ({ section: "projects", slug: d.slug })),
    ...allDevlogs.map((d) => ({ section: "devlog", slug: d.slug })),
    ...allThoughts.map((d) => ({ section: "thoughts", slug: d.slug })),
    ...allLives.map((d) => ({ section: "life", slug: d.slug })),
    ...allNows.map((d) => ({ section: "now", slug: d.slug })),
    ...allAbouts.map((d) => ({ section: "about", slug: d.slug })),
  ];
}

export function generateMetadata({
  params,
}: {
  params: { section: string; slug: string };
}) {
  const doc = findDoc(params.section, params.slug);
  if (!doc) return {};
  return { title: `${doc.title} — nebnou.com` };
}

export default function EntryPage({
  params,
}: {
  params: { section: string; slug: string };
}) {
  const { section, slug } = params;
  const doc = findDoc(section, slug);

  if (!doc) notFound();

  const formattedDate = new Date(doc.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="px-8 py-10 max-w-2xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-[#444] mb-10">
        <Link href="/" className="hover:text-[#00ff88] transition-colors">
          ~
        </Link>
        <span>/</span>
        <Link
          href={`/${section}`}
          className="hover:text-[#00ff88] transition-colors"
        >
          {section}
        </Link>
        <span>/</span>
        <span className="text-[#777]">{slug}</span>
      </nav>

      {/* Header */}
      <h1 className="text-[#e0e0e0] text-xl font-bold mb-2 leading-snug">
        {doc.title}
      </h1>
      <p className="text-[#444] text-[11px] mb-10">{formattedDate}</p>

      {/* MDX body */}
      <MDXContent code={doc.body.code} />

      {/* Back link */}
      <div className="mt-14 pt-6 border-t border-[#1e1e1e]">
        <Link
          href={`/${section}`}
          className="text-xs text-[#555] hover:text-[#00ff88] transition-colors"
        >
          ← ~/{section}
        </Link>
      </div>
    </div>
  );
}
