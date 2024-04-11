import Image from "next/image";
import logosvg from "../../public/logo.svg";

export default function Navbar() {
  return (
    <nav className="mx-16 my-6">
      <div>
        <Image src={logosvg} alt="abstract logo" width={32} height={32} />
      </div>
    </nav>
  );
}
