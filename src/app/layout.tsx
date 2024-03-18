import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "qpocker",
  description: "An app for scrumpocker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <div className="-z-10 md:z-10 cursor-none transition fixed bottom-0 right-0 text-right flex flex-col justify-end text-transparent hover:text-gray-800 fade-in  hidden md:block ">
        <div className=" -mb-3 text-center text-sm">
          Powered by <strong>JohnQ</strong>
        </div>
        <img
          className="h-[10vh] "
          src="/images/celerix.png"
          alt="celerix image"
        />
      </div>
    </html>
  );
}
