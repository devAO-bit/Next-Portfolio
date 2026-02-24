import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center text-center mt-10">
      
      <Image
        src="/profile.jpg"
        width={150}
        height={150}
        alt="Profile"
        className="rounded-full"
      />

      <h1 className="text-4xl font-bold mt-4">
        Hi, I am Abhishek 👋
      </h1>

      <p className="mt-4 text-lg text-gray-600 max-w-xl">
        MERN Stack Developer passionate about building scalable web applications and AI-powered tools.
      </p>

    </div>
  );
}