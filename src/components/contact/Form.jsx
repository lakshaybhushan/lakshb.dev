"use client";
import React from "react";
import { useForm, ValidationError } from "@formspree/react";

const ContactForm = () => {
  const [state, handleSubmit] = useForm("xrgwqeod");
  if (state.succeeded) {
    return (
      <div className="mt-12 flex items-center justify-center">
        Thankyou for reaching out! I'll get back to you asap.
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit} className="mt-12 flex flex-col items-center">
      <input
        type="text"
        placeholder="Name"
        name="name"
        className="h-[3.5rem] w-[80vw] border border-light-main bg-bgblk p-2 lowercase placeholder-light-other outline-none md:h-[50px] md:w-[40vw]"
      />
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        className="mt-3 h-[3.5rem] w-[80vw] border border-light-main bg-bgblk p-2 lowercase placeholder-light-other outline-none md:mt-2 md:h-[50px] md:w-[40vw]"
      />
      <ValidationError prefix="Email" field="email" errors={state.errors} />
      <textarea
        id="message"
        name="message"
        placeholder="Message"
        className="mt-3 h-[30rem] w-[80vw] border border-light-main bg-bgblk p-2
      lowercase placeholder-light-other outline-none md:mt-2 md:h-[300px]
      md:w-[40vw]"
      />
      <ValidationError prefix="Message" field="message" errors={state.errors} />
      <button
        type="submit"
        disabled={state.submitting}
        className="mt-3 h-[3.5rem] w-[80vw] border border-light-main bg-[#00dca1] lowercase text-black transition-all duration-300 ease-linear md:mt-2 md:h-[50px] md:w-[40vw] md:bg-bgblk md:text-light-main md:hover:bg-[#00dca1] md:hover:text-black">
        Send
      </button>
    </form>
  );
};

export default ContactForm;
