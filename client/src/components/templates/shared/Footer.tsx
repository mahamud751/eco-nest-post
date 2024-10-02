import { Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer
      className="text-white"
      style={{ background: "linear-gradient(to right, #020304, #071e37)" }}
    >
      <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-8 lg:col-span-3 sm:grid-cols-4">
          <div>
            <Link href="/" className="flex">
              <div>
                <Image
                  src={"https://i.ibb.co/CMkLbff/Icon.png"}
                  width={30}
                  height={20}
                  alt="icon"
                  className="ml-2"
                />
              </div>
              <Typography
                variant="h6"
                component="div"
                className="font-semibold mb-2 mt-1 ms-1 text-2xl"
              >
                KorboJoy
              </Typography>
            </Link>

            <p className="max-w-xs mt-4 text-sm font-bold">Dhaka 1216</p>
          </div>

          <div className="grid grid-cols-3 gap-8 lg:col-span-3 sm:grid-cols-4">
            <div>
              <p className="font-extrabold text-2xl">Information</p>
              <nav className="flex flex-col mt-4 space-y-5 text-sm font-bold">
                <Link href="about" className="hover:opacity-75">
                  About Us
                </Link>
                <Link href="contact" className="hover:opacity-75">
                  Contact Us
                </Link>
                <Link href="blog" className="hover:opacity-75">
                  Blogs
                </Link>
                <Link href="terms" className="hover:opacity-75">
                  Terms of Use
                </Link>
                <Link href="privacy" className="hover:opacity-75">
                  Privacy Policies
                </Link>
              </nav>
            </div>

            <div>
              <p className="font-extrabold text-2xl">Account</p>
              <nav className="flex flex-col mt-4 space-y-5 text-sm font-bold">
                <Link href="account" className="hover:opacity-75">
                  Dashboard
                </Link>
                <Link href="account" className="hover:opacity-75">
                  Orders
                </Link>
                <Link href="account" className="hover:opacity-75">
                  WishLists
                </Link>
                <Link href="login" className="hover:opacity-75">
                  Login
                </Link>
              </nav>
            </div>

            <div>
              <p className="font-extrabold text-2xl">Contact</p>
              <div className="flex mt-8 space-x-6">
                <Link href="#" className="hover:opacity-75">
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link href="#" className="hover:opacity-75">
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.069a1.256 1.256 0 11-2.512 0 1.256 1.256 0 012.512 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link href="#" className="hover:opacity-75">
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.29 20.251c7.547 0 11.675-6.155 11.675-11.497 0-.175 0-.349-.012-.523A8.18 8.18 0 0022 5.92a8.19 8.19 0 01-2.357.636A4.08 4.08 0 0021.448 4.1a8.227 8.227 0 01-2.605.98A4.106 4.106 0 0015.448 3a4.08 4.08 0 00-3.946 5.006 11.651 11.651 0 01-8.457-4.287 4.067 4.067 0 001.27 5.457A4.092 4.092 0 012.8 8.86v.051a4.078 4.078 0 003.277 3.995 4.073 4.073 0 01-1.803.068 4.084 4.084 0 003.815 2.834A8.233 8.233 0 012 18.407a11.615 11.615 0 006.29 1.818"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link href="#" className="hover:opacity-75">
                  <span className="sr-only">GitHub</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.683-.217.683-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.342-3.369-1.342-.454-1.145-1.11-1.45-1.11-1.45-.908-.62.069-.607.069-.607 1.003.07 1.53 1.03 1.53 1.03.892 1.528 2.341 1.087 2.91.832.091-.647.349-1.087.635-1.338-2.22-.253-4.555-1.112-4.555-4.95 0-1.093.39-1.987 1.029-2.687-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.805c.85.004 1.705.115 2.504.337 1.909-1.294 2.748-1.025 2.748-1.025.546 1.377.203 2.394.1 2.647.64.7 1.028 1.594 1.028 2.687 0 3.847-2.337 4.694-4.565 4.942.358.308.678.92.678 1.855 0 1.34-.012 2.42-.012 2.748 0 .268.18.58.688.48A10.013 10.013 0 0022 12c0-5.523-4.477-10-10-10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-20 text-center text-sm font-extrabold ">
          © 2024 KorboJoy. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
