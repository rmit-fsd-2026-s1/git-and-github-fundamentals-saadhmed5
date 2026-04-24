import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        
        {/* Header Icon */}
        <Image
          className="dark:invert"
          src="/globe.svg" // using existing file so it works
          alt="Rubbish Bin Icon"
          width={100}
          height={40}
          priority
        />

        {/* Main Content */}
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Rubbish Bin Collection Cycles
          </h1>

          {/* ✅ Working Image */}
          <Image
            src="/globe.svg" // change to /recycling-bin.png AFTER you add it
            alt="Recycling bin"
            width={200}
            height={200}
            className="rounded-lg bg-white p-4 shadow-md"
          />

          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Stay on top of your waste management schedule. Find out when your 
            general waste, recycling, and green bins are collected in your area.
          </p>

          <p className="max-w-md text-base leading-7 text-zinc-500 dark:text-zinc-400">
            Enter your suburb or postcode to view your personalised bin collection
            cycle and never miss a pickup again.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-green-600 px-5 text-white transition-colors hover:bg-green-700 md:w-[158px]"
            href="#"
          >
            Check Schedule
          </a>

          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="#"
          >
            Learn More
          </a>
        </div>

      </main>
    </div>
  );
}