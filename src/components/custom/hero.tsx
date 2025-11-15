"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-center px-6 md:px-20 py-12 h-[90vh]">
      <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6 px-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
          Welcome to <br /> <span className="text-emerald-400">JSON</span>ly ❤
        </h1>
        <div className="">
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300">
            Free. Open-source. Ready for every project.
          </p>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300">
            Build smarter, faster, and easier with Jsonly’s APIs.
          </p>
        </div>
        <div className="flex space-x-4 mt-4">
          <button onClick={() => router.push(`/docs`)} className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-lg font-semibold transition-all duration-300">
            Explore APIs
          </button>
          <button onClick={() => router.push(`https://github.com/ayushjslab`)} className="px-6 py-3 border border-emerald-500 hover:bg-emerald-500 hover:text-white rounded-lg font-semibold transition-all duration-300">
            GitHub
          </button>
        </div>
      </div>

      <div className="flex justify-center mb-10 md:mb-0">
        <Image
          src="/image.png"
          alt="JSON illustration"
          width={500}
          height={500}
          className="w-64 sm:w-80 md:w-96 lg:w-[500px] h-auto"
        />
      </div>
    </div>
  );
}
