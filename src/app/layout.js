import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import Link from "next/link";
const jontserrat = Montserrat({ subsets: ["latin"], weight: "100" });

export const metadata = {
  title: "My Message Board",
  description: "A Message Board using Postgress in Vercel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jontserrat.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
