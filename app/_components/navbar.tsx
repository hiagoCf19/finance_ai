"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/app/_components/ui/drawer";
import { Button } from "./ui/button";
import { ArrowRightLeftIcon, ChartLineIcon, MenuIcon } from "lucide-react";

const NavBAr = () => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <nav className="flex justify-between border-b border-solid px-4 py-4 md:px-8">
      <div className="hidden items-center gap-10 md:flex">
        <Image src={"/logo.svg"} width={133} height={39} alt="finance Ai" />
        <Link
          href={"/"}
          className={
            pathname === "/"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          }
        >
          Dashboard
        </Link>
        <Link
          href={"/transactions"}
          className={
            pathname === "/transactions"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          }
        >
          Transações
        </Link>
      </div>
      <Drawer>
        <DrawerTrigger className="md:hidden">
          <MenuIcon />
        </DrawerTrigger>
        <DrawerContent className="pb-32">
          <DrawerHeader>
            <DrawerTitle>Menu</DrawerTitle>
          </DrawerHeader>
          <div className="m-4 flex gap-4">
            <Button
              className="flex aspect-square h-1/3 w-1/3 items-center justify-center"
              disabled={pathname === "/"}
              variant={"outline"}
            >
              <Link href={"/"}>
                <div className="flex flex-col items-center justify-center space-y-4">
                  <ChartLineIcon size={32} className="mt-2 text-primary" />
                  <div className="flex flex-col items-center justify-center text-center">
                    <span className="text-sm">Meu</span>
                    <p className="text-base font-bold">Dashboard</p>
                  </div>
                </div>
              </Link>
            </Button>
            <Button
              className="flex aspect-square h-1/3 w-1/3 items-center justify-center"
              variant={"outline"}
              disabled={pathname === "/transactions"}
            >
              <Link href={"/transactions"}>
                <div className="flex flex-col items-center justify-center space-y-4">
                  <ArrowRightLeftIcon size={23} className="text-primary" />
                  <div className="flex flex-col items-center justify-center text-center">
                    <span className="text-sm">Minhas</span>
                    <p className="text-base font-bold">Transações</p>
                  </div>
                </div>
              </Link>
            </Button>
          </div>
        </DrawerContent>
      </Drawer>

      <UserButton showName />
    </nav>
  );
};

export default NavBAr;
