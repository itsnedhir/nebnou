"use client";

import { usePathname } from "next/navigation";

function currentSection(pathname: string): string {
  const segment = pathname.split("/")[1];
  return segment || "home";
}

export default function StatusBar() {
  const pathname = usePathname();
  const section = currentSection(pathname);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-7 bg-[#111] border-t border-[#222] flex items-center px-4 gap-2 text-[11px] text-[#555]">
      <span className="w-[7px] h-[7px] rounded-full bg-[#00ff88] shrink-0" />
      <span>vercel</span>
      <Dot />
      <span>prod</span>
      <Dot />
      <span className="text-[#e0e0e0]">{section}</span>
      <Dot />
      <span>nebnou.com</span>
    </div>
  );
}

function Dot() {
  return <span className="text-[#333]">·</span>;
}
