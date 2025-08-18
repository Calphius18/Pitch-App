import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "easymde/dist/easymde.min.css";

const workSans = localFont({
  src: [
    { path: "./fonts/WorkSans-Black.ttf", weight: "900" },
    { path: "./fonts/WorkSans-ExtraBold.ttf", weight: "800" },
    { path: "./fonts/WorkSans-Bold.ttf", weight: "700" },
    { path: "./fonts/WorkSans-SemiBold.ttf", weight: "600" },
    { path: "./fonts/WorkSans-Medium.ttf", weight: "500" },
    { path: "./fonts/WorkSans-Regular.ttf", weight: "400" },
    { path: "./fonts/WorkSans-Light.ttf", weight: "300" },
    { path: "./fonts/WorkSans-Thin.ttf", weight: "200" },
    { path: "./fonts/WorkSans-ExtraLight.ttf", weight: "100" },
  ],
  variable: "--font-work-sans-local", // ← different from Tailwind's variable
});


export const metadata: Metadata = {
  title: "Caliphus Pitch",
  description: "Pitch, Vote, Learn and Grow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={workSans.variable}
      >
        {children}
      </body>
    </html>
  );
}
