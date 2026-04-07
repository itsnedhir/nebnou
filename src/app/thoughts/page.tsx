import { allThoughts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import PostCard from "@/components/PostCard";

export const metadata = { title: "Thoughts — nebnou.com" };

export default function ThoughtsPage() {
  const entries = allThoughts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <div className="px-8 py-10 max-w-2xl">
      <h1 className="text-[#00ff88] text-xs uppercase tracking-widest mb-8">
        ~/thoughts
      </h1>
      <div className="flex flex-col gap-4">
        {entries.map((e) => (
          <PostCard
            key={e.slug}
            href={`/thoughts/${e.slug}`}
            title={e.title}
            date={e.date}
            tags={e.tags}
            description={e.description}
          />
        ))}
      </div>
    </div>
  );
}
