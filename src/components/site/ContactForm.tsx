"use client";

import { useRef } from "react";
// import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function ContactForm() {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Hello", e);
    console.log("form", form.current);
    // emailjs
    //   .sendForm(
    //     "service_b87fh3k",
    //     "template_0qb0zsv",
    //     form.current!,
    //     "dMoTGtwUZ_NLU7dKS"
    //   )
    //   .then(
    //     (result) => {
    //       console.log(result.text);
    //       alert("Your message has transfer");
    //     },
    //     (error) => {
    //       console.log(error.text);
    //     }
    //   );
  };

  return (
    <div className="w-full text-white">
      <p className="text-center">Tell me about yourself</p>
      <form ref={form} onSubmit={sendEmail} className="w-full border p-6">
        <Label htmlFor="user_name">Name</Label>
        <Input
          id="user_name"
          type="text"
          name="user_name"
          placeholder="Im Dev"
          className="mt-1 mb-3 w-full bg-white text-black"
        />
        <Label htmlFor="user_email">Email</Label>
        <Input
          id="user_email"
          type="email"
          name="user_email"
          placeholder="example@email.com"
          className="mt-1 mb-3 w-full bg-white text-black"
        />
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          rows={6}
          placeholder="Please type your name and topic you want to discuss and you can also provide your personal email and number"
          className="mt-1 mb-3 w-full bg-white text-black"
        />
        <Button
          type="submit"
          className="h-auto w-full rounded-md bg-[#6c757d] py-1.5 text-white hover:bg-[#5c636a]"
        >
          Send
        </Button>
      </form>
    </div>
  );
}
