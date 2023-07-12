import Appbar from "@/components/appbar";
import "./globals.css";
import { Roboto } from "next/font/google";
import { Providers } from "./providers";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: `Sulfurbottom's Lair`,
  description: "Frontend Developer's Blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className + ` min-h-screen flex flex-col`}>
        <Providers>
          <Appbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
