export default function Contact() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Contact Me</h1>

      <form className="max-w-md space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />

        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />

        <textarea
          placeholder="Your Message"
          className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          rows="4"
        />

        <button className="bg-black text-white px-4 py-2 rounded border dark:bg-white dark:text-black">
          Send Message
        </button>
      </form>
    </div>
  );
}