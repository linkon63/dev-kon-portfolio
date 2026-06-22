import type { ReactNode } from "react";
import Link from "next/link";
import { FaLinkedinIn, FaGit, FaEnvelope, FaCopyright } from "react-icons/fa";
import TopNavbar from "./TopNavbar";

const exploreLinks = [
  { href: "/", label: "/ skills ▚" },
  { href: "/about", label: "/ know about me ☀" },
  { href: "/projects", label: "/ Interesting projects I have worked ⛈ " },
  { href: "/resume", label: "/ resume ▋" },
  { href: "/blogs", label: "/ watch blogs \u{1F5A5}" },
  { href: "/contact", label: "/ do you have ideas? ✉ " },
];

const SiteLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <TopNavbar />
      <div className="flex h-screen w-full flex-wrap bg-black">
        <div className="h-full w-full md:w-1/2">
          <div className="flex h-full items-center justify-center">
            <div className="text-white">
              <h1 className="text-white">Hello Welcome to the code world</h1>
              <p>Explore me </p>
              {exploreLinks.map((link) => (
                <Link key={link.label} href={link.href} className="text-white">
                  <h4>{link.label}</h4>
                </Link>
              ))}
              <div>
                <p>Find me here &#128640;</p>
                <Link
                  href="/resume"
                  className="inline-block bg-white px-6 py-1.5 font-bold text-black"
                >
                  Resume &#128376;
                </Link>
                <div className="flex">
                  <a
                    className="social-icon m-2 text-white"
                    href="https://www.linkedin.com/in/md-abdul-ahad-linkon/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedinIn />
                  </a>
                  <a
                    className="social-icon m-2 text-white"
                    href="https://github.com/linkon63"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <FaGit />
                  </a>
                  <a
                    className="social-icon m-2 text-white"
                    href="mailto: m.alinkon10@gamil.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Email"
                  >
                    <FaEnvelope />
                  </a>
                </div>
                <div className="pt-5">
                  <span className="social-icon">
                    Site design / logo <FaCopyright className="inline" /> -
                    {new Date().getFullYear()} dev|kon; user contributions
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center md:w-1/2">{children}</div>
      </div>
    </div>
  );
};

export default SiteLayout;
