import Link from "next/link";

const ownResume = "/files/Resume-V12.pdf";

export default function ResumePage() {
  return (
    <div className="bg-[#212529]">
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/6">
          <div className="mt-5 pt-5 text-center">
            <p>Welcome to me</p>
            <Link href="/home" className="text-[2.5em] text-white">
              /home
            </Link>
          </div>
        </div>
        <div className="w-full md:w-5/6">
          <object
            data={ownResume}
            type="application/pdf"
            width="100%"
            height="1000px"
          >
            <p>
              Unable to display PDF file. <a href={ownResume}>Download</a>{" "}
              instead.
            </p>
          </object>
        </div>
      </div>
    </div>
  );
}
