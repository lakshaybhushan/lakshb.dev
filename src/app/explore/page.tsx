import MonthlyTopTracks from "@/components/monthlyTopTracks";

export default function Explore() {
  return (
    <main className="grid grid-cols-1 items-center justify-between">
      <div className="flex flex-col items-start">
        <div className="flex w-2/5 flex-col gap-2 text-left ">
          <h1 className="font-voyage text-title text-primary">Explore</h1>
          <p className="text-lg font-medium text-primary/80">
            Talk to my AI personality and much more...
          </p>
        </div>
        <div className="flex w-2/5 flex-col gap-4 pt-6 text-sm">
          <p>
            I&apos;m always up for trying new stuff, and AI is all over the
            place these days. So, I figured, why not create something cool and
            personal with it?
          </p>
        </div>
        <div className="flex w-2/5 flex-col gap-4 py-6 text-sm">
          <h2 className="text-lg font-medium text-primary">
            About this website
          </h2>
          <p>
            This is the third version of my personal portfolio (V3). Since the
            world is always changing, I like to stay updated with the latest
            technology. I made this website using Figma for design and Next.JS
            14, Tailwind CSS, and TypeScript for development.
          </p>
        </div>
        <div className="flex w-2/5 flex-col gap-5 text-sm">
          <h2 className="text-lg font-medium text-primary">
            My top tracks this month (Spotify)
          </h2>
          <div>
            <MonthlyTopTracks />
          </div>
        </div>
      </div>
      {/* <div className="ml-auto pt-16">
        <div className="w-fit rounded-lg transition-all duration-150 ease-in hover:rotate-3 hover:bg-primary hover:shadow-2xl">
          <p className="py-4 text-center font-medium text-background">
            me irl :D
          </p>
        </div>

       under development

      </div> */}
    </main>
  );
}
