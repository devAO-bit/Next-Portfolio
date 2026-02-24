import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Abhishek Ojha | Developer",
  description: "Full Stack Developer Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="grow container mx-auto p-6">
          {children}
        </main>

        {/* Footer */}
        <Footer />

      </body>
    </html>
  );
}