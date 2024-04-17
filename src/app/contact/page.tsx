import Image from "next/image";
import logosvg from "../../../public/logo.svg";
import ContactForm from "@/components/contactForm";
import { Toaster } from "sonner";

export default function Contact() {
  return (
    <main className="grid grid-cols-2 items-start justify-between">
      <div className="flex flex-col items-start">
        <div className="flex flex-col gap-2">
          <h1 className="font-voyage text-title text-primary">Contact</h1>
          <p className="text-lg font-medium text-primary/80">
            Let's have a little chat, shall we?
          </p>
        </div>
        <Toaster richColors position="top-center"/>
        <ContactForm />
      </div>
      <div className="ml-auto pt-8">
        <div className="flex flex-col items-center gap-4">
          <Image
            src={logosvg}
            alt="abstract logo"
            width={512}
            height={512}
            priority
            className="animate-spin-slow"
          />
          <p>
            It’s <span className="font-medium text-primary"> peaceful </span>
            isn’t?
          </p>
        </div>
      </div>
    </main>
  );
}
