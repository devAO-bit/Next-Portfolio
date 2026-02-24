import "./globals.css";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Abhishek Ojha | Developer",
  description: "Full Stack MERN Developer Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <div className="p-6">{children}</div>

        {/* Footer */}
        <footer className="bg-white shadow-inner p-4 text-center mt-10 text-black">
          © 2026 Abhishek Ojha
        </footer>

      </body>
    </html>
  );
}