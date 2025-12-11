import { Inter } from "next/font/google";
import "./globals.css"; // <--- INI YANG TADI KETINGGALAN, MAAF!

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Portal Berita Modern",
  description: "Aman & Cepat",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
