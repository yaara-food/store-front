import Link from "next/link";
import Search from "./search";
import CartModal from "components/cart/modal";
import LogoSquare from "components/shared/logo-square";
import { API_URL } from "../../../lib/const";

export default function NavbarClient() {
  return (
    <nav className="sticky top-0 z-50 flex flex-col items-center p-4 lg:px-6 bg-theme dark:bg-theme-dark backdrop-blur">
      <div className="flex w-full items-center justify-between">
        <Link href="/" prefetch={true} className="flex items-center">
          <LogoSquare />
        </Link>
        {!API_URL.includes("server") && <h2 style={{ color: "red" }}>DEMO</h2>}
        <div className="flex w-full md:w-1/3 justify-center px-2">
          <Search />
        </div>
        <div className="flex justify-end w-auto md:w-1/3">
          <CartModal />
        </div>
      </div>
    </nav>
  );
}
