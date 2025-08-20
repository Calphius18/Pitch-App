import { auth, signIn, signOut } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex items-center justify-between">
        <Link href="/">
          <Image src={"/logo.png"} alt="logo" width={144} height={30} />
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link
                href={"/startup/create"}
                className="flex items-center gap-1"
              >
                <span className="max-sm:hidden flex items-center gap-1">Create <BadgePlus className="size-6 hover:text-green-500"/></span>
                <BadgePlus className="size-6 text-green-500 sm:hidden" />
              </Link>

              <form
                className="max-sm:hidden"
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit" className="cursor-pointer max-sm:hidden">
                  <span className="max-sm:hidden flex items-center gap-1">LogOut <LogOut className="size-6 hover:text-red-500"/></span>
                </button>
              </form>

              <form
                className="size-6 sm:hidden"
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="sm:hidden
                "
                >
                  <LogOut className="size-6 text-red-500" />
                </button>
              </form>

              <Link href={`/user/${session?.id}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>
                    {session?.user?.name?.[0] ?? "?"}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit">
                <span>Login</span>
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
