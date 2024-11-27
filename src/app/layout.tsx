/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Author } from "next/dist/lib/metadata/types/metadata-types";
import ThemeToggle from "@/components/ThemeToggle";

const inter = Inter({ subsets: ["latin"] });
const author: Author = {
  name: "John Alexander Quintero Berrío",
};

export const metadata: Metadata = {
  title: "IA Planning Poker",
  description:
    "qpocker revoluciona el planning poker con inteligencia artificial avanzada. Nuestra IA analiza en tiempo real los resultados de las votaciones, identifica patrones, sugiere puntajes óptimos basados en el consenso del equipo y facilita las discusiones mediante preguntas inteligentes a los participantes. La IA actúa como un facilitador virtual que ayuda a alcanzar estimaciones más precisas y objetivas. Además, ofrece todas las funcionalidades tradicionales de una herramienta de planning poker para Scrum. ¡Potencia tus sesiones de estimación con el poder de la inteligencia artificial!",
  keywords: [
    "qpocker",
    "poker planning con IA",
    "estimación ágil inteligente",
    "análisis IA de votaciones",
    "facilitador virtual scrum",
    "IA para planning poker",
    "estimación automatizada",
    "sugerencias IA planning",
    "scrum master virtual",
    "análisis predictivo ágil",
    "planning poker inteligente",
    "asistente IA para scrum",
    "votación ágil asistida",
    "estimación con machine learning",
    "facilitación ágil IA"
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
      <body className={`${inter.className} bg-[#e5e5e5] dark:bg-slate-900`}>
        {children}
      </body>
      <div className="fixed top-10 right-3">
        <ThemeToggle />
      </div>
      <div className="select-none -z-10 md:z-10 cursor-none transition fixed bottom-0 right-0 text-right  flex flex-col justify-end text-transparent hover:text-gray-800 dark:hover:text-gray-600 fade-in  hidden md:block ">
        <div className=" -mb-3 text-center text-sm">
          Powered by <strong>JohnQ</strong>
        </div>
        <div className="logos-container ">
          <img
            className="h-[70px] dark:filter dark:contrast-0 "
            src="/images/celerix.png"
            alt="celerix image"
          />
          <img
            className=" dark:filter dark:contrast-0 h-[20px]"
            src="/images/galgo.png"
            alt="galgo image"
          />
          <img
            className=" dark:filter dark:contrast-0 h-[57px] -mt-[8px]"
            src="/images/perficient.png"
            alt="perficient image"
          />
        </div>
      </div>
    </html>
  );
}
