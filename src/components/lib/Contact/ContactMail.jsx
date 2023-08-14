import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
export default function ContactMail() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    console.log("Hello", e);
    console.log("form", form.current);
    // emailjs
    //   .sendForm(
    //     "service_b87fh3k",
    //     "template_0qb0zsv",
    //     form.current,
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
    <div className="text-white w-100">
      <p className="text-center">Tell me about yourself</p>
      <form ref={form} onSubmit={sendEmail} className="form w-100 border p-5">
        <label>Name</label>
        <br />
        <input type="text" name="user_name" className="form w-100 border p-2"  placeholder="Im Dev"/>
        <br />
        <label>Email</label>
        <br />
        <input type="email" name="user_email" className="form w-100 border p-2" placeholder="example@email.com" />
        <br />
        <label>Message</label>
        <br />
        <textarea
          name="message"
          className="form w-100 border"
          rows={6}
          placeholder="Please type your name and topic you want to discuss and you can also provide your personal email and number"
        />
        <br />
        <input type="submit" value="Send" className="btn btn-secondary w-100" />
      </form>
    </div>
  );
}
