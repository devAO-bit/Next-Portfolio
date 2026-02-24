export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto text-center py-4 text-gray-700 dark:text-gray-300">
        © {new Date().getFullYear()} Abhishek Ojha
      </div>
    </footer>
  );
}