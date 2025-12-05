import Link from "next/link";
import { Button } from "../ui/button";

export default function NavAuthButton({
  isMobile = false,
}: {
  isMobile?: boolean;
}) {
  return (
    <div
      className={
        isMobile
          ? "flex flex-col items-center gap-2 w-full mt-6"
          : `hidden md:flex items-center gap-2`
      }
    >
      <Link href="/login" className="w-full">
        <Button className="w-full cursor-pointer">Login</Button>
      </Link>
      <Link href="/register" className="w-full">
        <Button
          variant="outline"
          className="w-full border border-primary text-primary cursor-pointer"
        >
          Register
        </Button>
      </Link>
    </div>
  );
}
