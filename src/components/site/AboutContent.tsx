import Link from "next/link";

export default function AboutContent() {
  return (
    <div className="flex w-full flex-wrap items-start">
      <div className="w-full text-center text-[1.25rem] md:w-[58.333%]">
        Experienced with{" "}
        <span className="bg-white p-1 font-bold text-black">
          Software Engineering
        </span>
        , Skilled in {" < --"}Web Applications {" -- >"}, Front-End Development,
        Back-End Development, and Database(SQL, NoSQL) Specialize in{" "}
        <span className="bg-white p-1 font-bold text-black">MERN &amp; LAMP</span>{" "}
        Stack and Web Security. Strong engineering professional, focused on
        Computer Science. - Quick Learner, proactive, and has strong work ethics
        Group Management and Problem-Solver with problem-solving skills.
        <br />
        <a
          href="https://github.com/linkon63"
          className="bg-white p-1 font-bold text-black"
        >
          GitHub: https://github.com/linkon63
        </a>
        <br />
        <Link
          href="/contact"
          className="mt-5 inline-block bg-white px-6 py-1.5 font-bold text-black"
        >
          Email Me &#128397;
        </Link>
      </div>
      <div className="w-full md:w-1/3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/profileimage.jpg" alt="profile" width="100%" />
      </div>
    </div>
  );
}
