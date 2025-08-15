'use client'
import { X } from "lucide-react";
import Link from "next/link";

const SearchBarReset = () => {
     const reset = () => {
        const form = document.querySelector(".search-bar") as HTMLFormElement;

        if(form) form.reset();
    }

  return (
  <button type="reset" onClick={reset}>
    <Link href={"/"} className="search-btn text-white"><X className="size-5"/></Link>
  </button>
)
};

export default SearchBarReset;
