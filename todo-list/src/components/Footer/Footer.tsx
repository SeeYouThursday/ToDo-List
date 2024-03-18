'use client';
import { Link, Divider } from '@nextui-org/react';

export default function Footer() {
  return (
    <footer className="me-auto ms-auto">
      <ul className="bg-slate-700 space-x-4 flex flex-row justify-center m-5">
        <li>
          <img
            src="/logos/seeyouthursday.png"
            alt="SeeYouThursday Logo"
            className="w-10"
          />
        </li>
        <li>
          <Link
            as="a"
            href="https://www.linkedin.com/in/brian-galyen-85aa06aa/"
            // color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            LinkedIn
          </Link>
        </li>
        <Divider orientation="vertical" />
        <li>
          <Link
            as="a"
            href="#"
            // color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            Contact
          </Link>
        </li>
        <Divider orientation="vertical" />
        <li>
          <Link
            as="a"
            href="https://github.com/SeeYouThursday/"
            // color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            Projects
          </Link>
        </li>
      </ul>
    </footer>
  );
}
