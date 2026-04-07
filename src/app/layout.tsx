import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import StatusBar from "@/components/StatusBar";
import "./globals.css";

export const metadata: Metadata = {
  title: "nebnou.com",
  description: "nebnou's corner of the internet",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Sidebar />
        {/* pt-10: clears mobile top bar (h-10); md:pt-0: sidebar is beside content */}
        {/* pb-7: clears status bar (h-7); md:ml-[200px]: offset sidebar width */}
        <div className="md:ml-[200px] pt-10 md:pt-0 pb-7 min-h-screen">
          {children}
        </div>
        <StatusBar />
      </body>
    </html>
  );
}
