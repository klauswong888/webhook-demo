"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent mb-6">
          Klaus&apos;s LiveBoard
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          A Real-time Message Board
        </h2>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
          This is a real-time message board built with Next.js and Firebase. Share your thoughts instantly with everyone online. Experience seamless, concurrent collaboration and see messages appear live as they are posted.
        </p>
        <Link href="/dashboard">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-full text-lg shadow transition">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}
