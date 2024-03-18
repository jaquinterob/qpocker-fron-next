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
      <div className="-z-10 md:z-10 cursor-none transition fixed bottom-0 align-bottom fade-in m-auto w-full text-center flex justify-center flex-col text-transparent hover:text-gray-800">
        <div className=" -mb-3 ">Powered by <strong>JohnQ</strong> from:</div>
        <img className="h-[10vh] m-auto" src="/images/celerix.png" alt="celerix image" />
      </div>
    </html>
  );
}
