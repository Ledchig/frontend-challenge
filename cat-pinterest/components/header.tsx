"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className='bg-blue-500 shadow-xl'>
      <div className='container mx-auto'>
        <ul className='flex'>
          <li className='flex'>
            <Link
              className={`px-8 py-5 link ${pathname === "/" ? "text-white bg-blue-600" : "text-white/70"} hover:text-white/85`}
              href='/'
            >
              Все коты
            </Link>
          </li>
          <li className='flex'>
            <Link
              className={`px-8 py-5 link ${pathname === "/liked-cats" ? "text-white bg-blue-600" : "text-white/70"} hover:text-white/85`}
              href='/liked-cats'
            >
              Любимые коты
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
