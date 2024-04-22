import Image from "next/image";
import notFound from "../../public/404.png";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center">
      <Image
        src={notFound}
        alt="not found illustration"
        width={1200}
        height={1200}
        className="h-auto w-[32rem] object-contain"
      />
      <h1 className="pb-4 font-voyage text-title leading-tight text-primary">
        404
      </h1>
      <p className="text-center text-sm pb-2">
        Sorry, the page you are looking for does not exist. <br />
        Please check the URL and try again.
      </p>

      <Link href={"/"} className="text-primary">Get back to home</Link>
    </main>
  );
}
