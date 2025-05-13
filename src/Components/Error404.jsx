import React from "react";
import { Typography, Button } from "@material-tailwind/react";
import { FlagIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

export function Error404() {
  const Navigate = useNavigate();
  return (
    <div className="h-screen mx-auto grid place-items-center text-center px-8">
      <div>
        <FlagIcon className="w-20 h-20 mx-auto" />
        <Typography
          variant="h1"
          color="blue-gray"
          className="mt-10 !text-3xl !leading-snug md:!text-4xl"
        >
          Error 404 <br /> It looks like You Are On The Wrong Page.
        </Typography>
        <Typography className="mt-8 mb-14 text-[18px] font-normal text-gray-500 mx-auto md:max-w-sm">
          Don&apos;t worry, Scan The NFC Again To Find The Contact if not{" "}
          <a href="https://t.me/Hlacaso" className="text-[#1a237e]">
            Contact Us
          </a>
        </Typography>
        <Button
          color="gray"
          className="w-full px-4 md:w-[8rem]"
          onClick={() => Navigate("/")}
        >
          back home
        </Button>
      </div>
    </div>
  );
}

export default Error404;
