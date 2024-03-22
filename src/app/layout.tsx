import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Author } from "next/dist/lib/metadata/types/metadata-types";

const inter = Inter({ subsets: ["latin"] });
const author: Author = {
  name: "John Alexander Quintero Berrío",
};

export const metadata: Metadata = {
  title: "Planing Pocker",
  description:
    "qpocker es tu herramienta de planificación de póquer ágil para Scrum. Organiza y estima tus historias de usuario con eficiencia, juega con tu equipo y gestiona tus sesiones de planificación de manera efectiva. ¡Regístrate ahora y lleva tus reuniones de planificación de Scrum al siguiente nivel!",
  keywords: [
    "qpocker",
    "poker planning",
    "poker game planning",
    "free poker planning tool",
    "poker session planning",
    "online poker planning",
    "poker event planning",
    "poker strategy planning",
    "poker session organizer",
    "poker game organizer",
    "virtual poker planning tool",
  ],
  authors: [author],
  applicationName: "qpocker",
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
