import Link from "next/link";
import { redirect } from "next/navigation";

export default function HomePage() {
  return (
    <div className="">
      <button className="bg-black px-2 py-3" onClick={redirect("/signin")}>
        Sign In
      </button>
      Landing Page
    </div>
  );
}
