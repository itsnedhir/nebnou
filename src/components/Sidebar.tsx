"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_GROUPS = [
  {
    label: "work",
    links: [
      { href: "/projects", label: "projects" },
      { href: "/devlog", label: "devlog" },
    ],
  },
  {
    label: "writing",
    links: [
      { href: "/thoughts", label: "thoughts" },
      { href: "/life", label: "life" },
    ],
  },
  {
    label: "me",
    links: [
      { href: "/now", label: "now" },
      { href: "/about", label: "about" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 h-10 bg-[#111] border-b border-[#222] flex items-center px-4 gap-3">
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="text-[#e0e0e0] text-lg leading-none"
        >
          {open ? "✕" : "☰"}
        </button>
        <span className="text-[#00ff88] text-sm">
          nebnou.com<span className="blinking-cursor">▋</span>
        </span>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/60"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={[
          "fixed top-0 left-0 h-full w-[200px] z-40",
          "bg-[#111] border-r border-[#222]",
          "flex flex-col",
          "transition-transform duration-200 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0",
        ].join(" ")}
      >
        {/* Title */}
        <div className="px-4 py-5 hidden md:block">
          <span className="text-[#00ff88] text-sm font-bold">
            nebnou.com<span className="blinking-cursor">▋</span>
          </span>
        </div>

        {/* Nav groups */}
        <nav className="flex-1 px-3 pb-6 space-y-5 mt-4 md:mt-0 pt-4 md:pt-0">
          {NAV_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="text-[#444] text-[10px] uppercase tracking-widest mb-1 px-2">
                {group.label}
              </p>
              {group.links.map((link) => {
                const isActive =
                  pathname === link.href ||
                  pathname.startsWith(link.href + "/");
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={[
                      "block px-2 py-[5px] text-sm border-l-2 transition-colors",
                      isActive
                        ? "text-[#00ff88] border-[#00ff88]"
                        : "text-[#999] border-transparent hover:text-[#e0e0e0] hover:border-[#444]",
                    ].join(" ")}
                  >
                    ~/{link.label}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
