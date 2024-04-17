"use client";
import React, { useState, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { toast } from "sonner";

export default function ContactForm() {
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
      toast.success("Message sent successfully!");
    }
  }, [state.succeeded]);

  return (
    <form
      className="flex w-5/6 flex-col gap-1 pt-6 text-sm"
      onSubmit={handleSubmit}>
      <input
        type="text"
        id="NameInputField"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="bg-inputBg placeholder-placeholderText w-full rounded-lg border border-cardBorder p-4 text-dark"
        placeholder="Name"
      />
      <input
        type="email"
        id="EmailInputField"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-inputBg placeholder-placeholderText w-full rounded-lg border border-cardBorder p-4 text-dark"
        placeholder="Email"
      />
      <ValidationError prefix="Email" field="email" errors={state.errors} />

      <textarea
        id="MessageTextArea"
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="bg-inputBg placeholder-placeholderText h-64 max-h-96 min-h-16 w-full rounded-lg border border-cardBorder p-4 text-dark"
        placeholder="Write your thoughts here..."
      />

      <ValidationError prefix="Message" field="message" errors={state.errors} />

      <button
        type="submit"
        disabled={!isFormFilled || state.submitting}
        className={`mt-2.5 w-full rounded-md bg-primary p-2.5 font-medium text-background ${
          isFormFilled
            ? "transition duration-150 ease-linear hover:bg-primary/60"
            : "cursor-not-allowed"
        }`}>
        Send
      </button>
    </form>
  );
}
