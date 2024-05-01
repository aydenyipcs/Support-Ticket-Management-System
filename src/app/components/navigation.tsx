"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navigation = () => {
  return (
    <nav className="flex min-w-screen flex-row justify-center my-20 space-x-10 text-xl font-semibold">
        <CustomLink href="/" name="Client"/>
        <CustomLink href="/admin" name="Admin Panel"/>
    </nav>
  );
};

const CustomLink = ({ href, name }: LinkProps) => {
    const pathname = usePathname();
    const isActive = pathname === href;
  
    return (
      <Link
        href={href}
        className={`italic hover:cursor-pointer hover:text-opacity-70 ${isActive ? "text-blue-800 underline" : ""}`}
      >
        {name}
      </Link>
    );
  };

export default Navigation;
