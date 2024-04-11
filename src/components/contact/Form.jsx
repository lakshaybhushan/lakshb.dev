"use client";
import React, { useState, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { toast } from "sonner";

const ContactForm = () => {
  const [state, handleSubmit] = useForm("xrgwqeod");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const isFormFilled = name && email && message;

  useEffect(() => {
    if (state.succeeded) {
      setName("");
      setEmail("");
      setMessage("");
      toast.success("Thank you for reaching out! I'll get back to you asap.", {
        unstyled: true,
        classNames: {
          toast:
            "bg-bgblk border border-light-other text-[#00dca1] px-6 py-4 rounded-md flex items-center justify-between gap-3",
        },
      });
    }
  }, [state.succeeded]);

  if (state.errors && state.errors.length > 0) {
    toast.error("Oops! Something went wrong. Please try again.", {
      unstyled: true,
      classNames: {
        toast:
          "bg-bgblk border border-light-other text-red-500 rounded-md px-6 py-4 rounded-md flex items-center justify-between gap-3",
      },
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col items-center">
      <div className="mb-3 flex flex-col items-start">
        <label htmlFor="Name" className="mb-0.5 font-medium md:mb-2">
          Name
        </label>
        <input
          type="text"
          placeholder="A name would be nice!"
          name="name"
          id="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-[3.5rem] w-[80vw] rounded-md border border-light-other bg-bgblk p-4 text-[#00dca1] placeholder-light-other outline-none md:h-[50px] md:w-[40vw]"
        />
      </div>
      <div className="mb-3 flex flex-col items-start">
        <label htmlFor="Email" className="mb-0.5 font-medium md:mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="This is where I'll reply to you!"
          className="h-[3.5rem] w-[80vw] rounded-md border border-light-other bg-bgblk p-4 text-[#00dca1] placeholder-light-other outline-none md:h-[50px] md:w-[40vw]"
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </div>
      <div className="flex flex-col items-start">
        <label htmlFor="Message" className="mb-0.5 font-medium md:mb-2">
          Message
        </label>
        <textarea
          id="Message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What's on your mind?"
          className="h-[30rem] max-h-52 min-h-32 w-[80vw] rounded-md border border-light-other bg-bgblk p-4 text-[#00dca1] placeholder-light-other outline-none md:h-[300px] md:max-h-52 md:min-h-32 md:w-[40vw]"
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />
      </div>
      <button
        type="submit"
        disabled={!isFormFilled || state.submitting}
        className={`mt-4 h-[3.5rem] w-[80vw] rounded-md border border-light-other bg-[#00dca1] text-base text-black transition-all duration-300 ease-linear hover:font-medium md:mt-2 md:h-[50px] md:w-[40vw] ${
          isFormFilled
            ? "md:bg-bgblk md:text-light-other md:hover:bg-[#00dca1] md:hover:text-black"
            : "cursor-not-allowed bg-bgblk text-light-other"
        }`}>
        Send
      </button>
    </form>
  );
};

export default ContactForm;
