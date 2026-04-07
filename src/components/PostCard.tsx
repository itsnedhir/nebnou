import Link from "next/link";

const TAG_PALETTE = [
  { bg: "#0d2d1a", text: "#00ff88" },
  { bg: "#0d1f2d", text: "#38bdf8" },
  { bg: "#2d1a0d", text: "#fb923c" },
  { bg: "#2d0d1a", text: "#f472b6" },
  { bg: "#1a0d2d", text: "#c084fc" },
  { bg: "#2d2a0d", text: "#facc15" },
];

function tagColor(tag: string) {
  let h = 0;
  for (let i = 0; i < tag.length; i++) {
    h = (h * 31 + tag.charCodeAt(i)) & 0xffffffff;
  }
  return TAG_PALETTE[Math.abs(h) % TAG_PALETTE.length];
}

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  active:  { bg: "#0d2d1a", text: "#00ff88", label: "active" },
  shipped: { bg: "#0d1f2d", text: "#38bdf8", label: "shipped" },
  paused:  { bg: "#2a2a1a", text: "#888",    label: "paused" },
};

interface PostCardProps {
  href: string;
  title: string;
  date: string;
  tags: string[];
  description?: string;
  status?: "active" | "shipped" | "paused";
}

export default function PostCard({
  href,
  title,
  date,
  tags,
  description,
  status,
}: PostCardProps) {
  const s = status ? STATUS_STYLES[status] : null;

  return (
    <Link
      href={href}
      className="block bg-[#111] border border-[#1e1e1e] rounded-sm p-5 hover:border-[#333] transition-colors group"
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <h2 className="text-[#e0e0e0] text-sm font-bold group-hover:text-[#00ff88] transition-colors leading-snug">
          {title}
        </h2>
        {s && (
          <span
            className="shrink-0 text-[10px] px-2 py-[2px] rounded-sm"
            style={{ background: s.bg, color: s.text }}
          >
            {s.label}
          </span>
        )}
      </div>

      {/* Date */}
      <p className="text-[#444] text-[11px] mb-3">
        {new Date(date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </p>

      {/* Description */}
      {description && (
        <p className="text-[#777] text-xs leading-relaxed mb-4">{description}</p>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const c = tagColor(tag);
          return (
            <span
              key={tag}
              className="text-[10px] px-2 py-[2px] rounded-sm"
              style={{ background: c.bg, color: c.text }}
            >
              {tag}
            </span>
          );
        })}
      </div>
    </Link>
  );
}
