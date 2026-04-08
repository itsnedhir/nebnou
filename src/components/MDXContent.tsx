"use client";

import { useMDXComponent } from "next-contentlayer2/hooks";

export default function MDXContent({ code }: { code: string }) {
  const MDX = useMDXComponent(code);
  return (
    <div className="mdx-content">
      <MDX />
    </div>
  );
}
