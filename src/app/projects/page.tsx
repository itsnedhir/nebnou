import { allProjects } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import PostCard from "@/components/PostCard";

export const metadata = { title: "Projects — nebnou.com" };

export default function ProjectsPage() {
  const projects = allProjects.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <div className="px-8 py-10 max-w-2xl">
      <h1 className="text-[#00ff88] text-xs uppercase tracking-widest mb-8">
        ~/projects
      </h1>
      <div className="flex flex-col gap-4">
        {projects.map((p) => (
          <PostCard
            key={p.slug}
            href={`/projects/${p.slug}`}
            title={p.title}
            date={p.date}
            tags={p.tags}
            description={p.description}
            status={p.status}
          />
        ))}
      </div>
    </div>
  );
}
