import Image from "next/image";
import me from "../../public/me.jpg";
import logosvg from "../../public/logo.svg";
import Link from "next/link";
import CardLayout from "@/components/cardLayout";
import MonthlyTopTracks from "@/components/monthlyTopTracks";

export default function Home() {
  return (
    // <main className="grid grid-cols-2 items-start justify-between">
    //   <div className="flex flex-col items-start">
    //     <div className="flex flex-col gap-2">
    //       <h1 className="font-voyage text-title text-primary">
    //         Lakshay Bhushan
    //       </h1>
    //       <p className="text-lg font-medium text-primary/80">
    //         Creative Developer | Designer | Researcher
    //       </p>
    //     </div>
    //     <div className="flex w-5/6 flex-col gap-4 py-6 text-sm">
    //       <p>
    //         Hey! I&apos;m Lakshay, a 20 yr old cs + social sciences student at
    //         IIIT Delhi (India). Who is passionate about designing user
    //         experiences through{" "}
    //         <span className="font-medium text-primary/90"> web </span> and{" "}
    //         <span className="font-medium text-primary/90"> XR </span>{" "}
    //         development, focusing on minimalist aesthetics and
    //         user-friendliness.
    //       </p>
    //       <p>
    //         I&apos;m always interested in collaborating on innovative projects.
    //         Feel free to{" "}
    //         <Link
    //           href="/contact"
    //           className="font-medium text-primary underline underline-offset-4 transition duration-150 ease-in hover:text-primary/60">
    //           reach out
    //         </Link>{" "}
    //         to discuss potential opportunities or exciting hackathons!
    //       </p>
    //     </div>
    //     <div className="w-5/6 pt-4">
    //       <CardLayout />
    //     </div>
    //   </div>
    //   <div className="ml-auto pt-16">
    //     <div className="w-fit rounded-lg transition-all duration-150 ease-in hover:rotate-3 hover:bg-primary hover:shadow-2xl">
    //       <Image
    //         src={me}
    //         alt="lakshay bhushan's photo"
    //         width={385}
    //         height={532}
    //         placeholder="blur"
    //         priority={true}
    //         className="h-fit w-fit rounded-t-lg"
    //       />
    //       <p className="py-4 text-center font-medium text-background">
    //         that&apos;s me!
    //       </p>
    //     </div>
    //   </div>
    // </main>

    <main className="flex min-h-screen flex-col items-center justify-center gap-2">
      <Image
        src={logosvg}
        alt="lakshay bhushan's photo"
        width={45}
        height={45}
        priority={true}
        className="animate-spin-slow mb-4"
      />
      <p className="text-center">
        Hey! this website is under{" "}
        <span className="font-medium underline underline-offset-4">
          {" "}
          complete redesign.{" "}
        </span>
      </p>
      <p>Please check back later!</p>
      <span className="font-medium text-primary">Thanks for visiting!</span>
    </main>
  );
}
