import ContactForm from "@/components/contactForm";
import { Toaster } from "sonner";

export default function Contact() {
  return (
    <main className="grid grid-cols-1 items-start justify-between">
      <div className="flex flex-col items-start">
        <div className="flex flex-col gap-2 text-left w-3/5">
          <h1 className="font-voyage text-title text-primary">Get in touch</h1>
          <p className="text-lg font-medium text-primary/80">
            Have a question or want to say hi to real me?
          </p>
        </div>
        <Toaster richColors position="top-center" />
        <ContactForm />
      </div>

      {/* <div className="ml-auto pt-8">
        <div className="flex flex-col items-center gap-4">
          <Image
            src={logosvg}
            alt="abstract logo"
            width={512}
            height={512}
            priority
            className="animate-spin-slow w-[30rem] h-[30rem]"
          />
          <p>
            It’s <span className="font-medium text-primary"> peaceful </span>
            isn’t?
          </p>
        </div>
      </div> */}
    </main>
  );
}
